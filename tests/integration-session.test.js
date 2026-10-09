import test from "node:test";
import assert from "node:assert/strict";
import {initializeIntegrations} from "../integrations.js";

test("late connection and analysis responses cannot restore a logged-out session",async()=>{
  const previous={document:globalThis.document,sessionStorage:globalThis.sessionStorage,fetch:globalThis.fetch};
  const elements=new Map();const storage=new Map();const pending=[];
  const element=id=>{
    if(!elements.has(id)) elements.set(id,{value:"",textContent:"",hidden:false,disabled:false,handlers:{},children:[],addEventListener(name,handler){this.handlers[name]=handler;},querySelectorAll(){return this.children;},replaceChildren(){this.textContent="";}});
    return elements.get(id);
  };
  const settingsButton={disabled:false};const analysisButton={disabled:false};
  element("#api-settings-form").children=[settingsButton];element("#analysis-form").children=[analysisButton];
  globalThis.document={querySelector:element,addEventListener(){}};
  globalThis.sessionStorage={getItem:key=>storage.get(key) || null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)};
  globalThis.fetch=()=>new Promise(resolve=>pending.push(resolve));
  const tick=()=>new Promise(resolve=>setImmediate(resolve));
  const submit=id=>element(id).handlers.submit({preventDefault(){},submitter:id==="#analysis-form" ? analysisButton:settingsButton});
  const config={model:"deepseek-flash",deepseekConfigured:true,socialEchoConfigured:false};
  try {
    initializeIntegrations(()=>{});
    element("#backend-url").value="https://backend.test";element("#access-token").value="test-token";
    submit("#access-form");element("#disconnect-backend").handlers.click();
    pending.shift()(Response.json(config));await tick();
    assert.equal(analysisButton.disabled,true);assert.equal(storage.size,0);assert.equal(element("#connection-status").textContent,"已退出私人后台。");
    submit("#access-form");pending.shift()(Response.json(config));await tick();
    assert.equal(analysisButton.disabled,false);
    element("#analysis-question").value="test";element("#analysis-evidence").value="source";
    submit("#analysis-form");element("#disconnect-backend").handlers.click();
    pending.shift()(Response.json({question:"private",content:"private report",createdAt:new Date().toISOString(),model:"deepseek-flash",saved:true}));await tick();
    assert.equal(element("#analysis-result").hidden,true);assert.notEqual(element("#analysis-result-content").textContent,"private report");assert.equal(analysisButton.disabled,true);
    assert.equal(storage.size,0);
  }finally {Object.assign(globalThis,previous);}
});
