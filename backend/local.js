import {createServer} from "node:http";
import {Readable} from "node:stream";
import {readFile,writeFile,mkdir} from "node:fs/promises";
import {homedir} from "node:os";
import {join} from "node:path";
import {randomBytes} from "node:crypto";
import {handle} from "./worker.js";

const directory=join(homedir(),".codex","private","research-hub");
await mkdir(directory,{recursive:true});
const credentialPath=join(directory,"access.json");
let credentials;
try {credentials=JSON.parse(await readFile(credentialPath,"utf8"));}
catch(error) {
  if (error.code!=="ENOENT") throw error;
  credentials={ADMIN_TOKEN:randomBytes(32).toString("hex"),ENCRYPTION_KEY:randomBytes(32).toString("base64")};
  await writeFile(credentialPath,JSON.stringify(credentials,null,2),{mode:0o600,flag:"wx"});
}
const env={...credentials,STATE:{
  async get(name) {try {return await readFile(join(directory,`${name}.json`),"utf8");}catch(error) {if(error.code==="ENOENT") return null;throw error;}},
  async put(name,value) {await writeFile(join(directory,`${name}.json`),value,{mode:0o600});},
  async list({prefix,limit}) {const {readdir}=await import("node:fs/promises");const names=(await readdir(directory)).filter(name=>name.startsWith(prefix) && name.endsWith(".json")).sort();return {keys:names.slice(0,limit).map(name=>({name:name.slice(0,-5)}))};},
}};
createServer(async(incoming,outgoing)=>{
  try {
    const request=new Request(`http://127.0.0.1:8787${incoming.url}`,{method:incoming.method,headers:incoming.headers,...(!["GET","HEAD"].includes(incoming.method) ? {body:Readable.toWeb(incoming),duplex:"half"} : {})});
    const response=await handle(request,env);
    outgoing.writeHead(response.status,Object.fromEntries(response.headers));
    outgoing.end(Buffer.from(await response.arrayBuffer()));
  }catch {outgoing.writeHead(500);outgoing.end("Local backend error");}
}).listen(8787,"127.0.0.1",()=>console.log(`Local backend ready at http://127.0.0.1:8787; private access file: ${credentialPath}`));
