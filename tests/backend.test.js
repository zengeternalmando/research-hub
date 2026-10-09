import test from "node:test";
import assert from "node:assert/strict";
import {handle} from "../backend/worker.js";
import {validBackend} from "../integrations.js";

function environment() {
  const values = new Map();
  return {ADMIN_TOKEN:"test-access",ENCRYPTION_KEY:Buffer.alloc(32,4).toString("base64"),STATE:{get:async k=>values.get(k),put:async(k,v)=>values.set(k,v),list:async({prefix,limit})=>({keys:[...values.keys()].filter(k=>k.startsWith(prefix)).sort().slice(0,limit).map(name=>({name}))})},values};
}
function request(path,body,token="test-access",origin="https://zengeternalmando.github.io") {
  return new Request(`https://backend.test${path}`,{method:body ? "POST":"GET",headers:{Authorization:`Bearer ${token}`,Origin:origin,"Content-Type":"application/json"},...(body ? {body:JSON.stringify(body)} : {})});
}
test("authentication and allowed origin protect configuration",async()=>{
  const env=environment();
  assert.equal((await handle(request("/config",null,"wrong"),env)).status,401);
  assert.equal((await handle(request("/config",null,"test-access","https://other.test"),env)).status,403);
  const response=await handle(request("/config"),env);
  const data=await response.json();
  assert.equal(data.deepseekConfigured,false);assert.equal(data.model,"deepseek-flash");assert.equal("deepseekKey" in data,false);
  assert.equal(response.headers.get("Cache-Control"),"no-store");
});
test("missing model configuration never calls a provider",async()=>{
  assert.equal((await handle(request("/analyze",{mode:"doctor",question:"test",evidence:"test"}),environment())).status,409);
});
test("rejects unsafe backend addresses",()=>{
  assert.equal(validBackend("http://127.0.0.1:8787"),"http://127.0.0.1:8787");
  assert.throws(()=>validBackend("http://remote.test"));assert.throws(()=>validBackend("https://user:pass@remote.test"));
});
test("validated configuration is encrypted and never returned as a secret",async()=>{
  const original=globalThis.fetch;const env=environment();
  globalThis.fetch=async()=>Response.json({data:[{id:"deepseek-flash"}]});
  try {
    const req=new Request("https://backend.test/config",{method:"PUT",headers:{Authorization:"Bearer test-access"},body:JSON.stringify({model:"deepseek-flash",deepseekKey:"sk-test-private-value"})});
    const response=await handle(req,env);assert.equal(response.status,200);
    assert.ok(!env.values.get("config").includes("sk-test-private-value"));
    const data=await(await handle(request("/config"),env)).json();assert.equal(data.deepseekConfigured,true);assert.equal("deepseekKey" in data,false);
    const invalid=await handle(request("/analyze",{mode:"doctor",question:"",evidence:""}),env);assert.equal(invalid.status,400);
    globalThis.fetch=async()=>Response.json({choices:[{message:{content:"证据不完整。仅根据已提供的文字分析。"}}]});
    const report=await(await handle(request("/analyze",{mode:"doctor",question:"定位",evidence:"作品和公开数据"}),env)).json();assert.equal(report.saved,true);
    assert.ok(![...env.values.values()].some(value=>value.includes(report.content)));
    const history=await(await handle(request("/reports"),env)).json();assert.equal(history[0].id,report.id);
    const concurrent=await Promise.all([handle(request("/analyze",{mode:"doctor",question:"并发A",evidence:"真实资料"}),env),handle(request("/analyze",{mode:"doctor",question:"并发B",evidence:"真实资料"}),env)]);
    const ids=await Promise.all(concurrent.map(async response=>(await response.json()).id));
    const after=await(await handle(request("/reports"),env)).json();
    assert.ok(ids.every(id=>after.some(saved=>saved.id===id)));
  } finally {globalThis.fetch=original;}
});
