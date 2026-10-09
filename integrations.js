export function validBackend(value) {
  const url = new URL(value);
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/") throw new Error("请填写后台的根地址。");
  if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost","127.0.0.1"].includes(url.hostname))) throw new Error("后台地址必须使用 HTTPS。");
  return url.origin;
}
export function initializeIntegrations(showView) {
  const $ = selector => document.querySelector(selector);
  let access;
  let connected = false;
  let accessAbort = new AbortController();
  let currentReport;
  const status = (id,message) => $(id).textContent = message;
  async function api(path, body, method = "GET") {
    if (!access) throw new Error("请先在统一 API 设置中连接私人后台。");
    const activeAccess = access;
    const activeSignal = accessAbort.signal;
    try {
    const response = await fetch(`${access.url}${path}`,{
      method,headers:{Authorization:`Bearer ${access.token}`,...(body ? {"Content-Type":"application/json"} : {})},
      ...(body ? {body:JSON.stringify(body)} : {}),signal:AbortSignal.any([accessAbort.signal,AbortSignal.timeout(110000)]),cache:"no-store",
    });
    const data = await response.json();
    if (access !== activeAccess) throw new DOMException("连接已更改", "AbortError");
    if (!response.ok) throw new Error(data.error || "后台请求失败。");
    return data;
    } catch(error) {
      if (access !== activeAccess || activeSignal.aborted) throw new DOMException("连接已更改", "AbortError");
      throw error;
    }
  }
  function connectionState(value) {
    connected = value;
    for (const form of ["#api-settings-form","#analysis-form"]) for (const button of $(form).querySelectorAll('button[type="submit"]')) button.disabled = !connected;
    $("#fetch-socialecho").disabled = !connected;
    $("#load-history").disabled = !connected;
    status("#agent-connection", connected ? "已连接私人后台" : "等待连接后台");
  }
  function displayConfig(config) {
    $("#deepseek-model").value = config.model;
    status("#saved-config-status",`DeepSeek：${config.deepseekConfigured ? "已配置，所有文字分析共用" : "尚未配置"}；SocialEcho：${config.socialEchoConfigured ? "已配置数据密钥" : "尚未配置数据密钥"}。`);
  }
  function showReport(report) {
    currentReport = report;
    $("#analysis-result").hidden = false;
    status("#analysis-result-title",report.question);
    status("#analysis-result-meta",`${new Date(report.createdAt).toLocaleString("zh-CN",{timeZone:"Asia/Shanghai"})} · 北京时间 · ${report.model}`);
    status("#analysis-result-content",report.content);
  }
  async function withStatus(id, action) {
    try { await action(); }
    catch(error) { if (error.name !== "AbortError") status(id,error instanceof TypeError ? "无法连接后台，请检查地址和后台发布状态。" : error.message); }
  }
  $("#access-form").addEventListener("submit",event=>{
    event.preventDefault();
    withStatus("#connection-status",async()=>{
      const next={url:validBackend($("#backend-url").value.trim()),token:$("#access-token").value.trim()};
      if (!next.token) throw new Error("请输入访问口令。");
      accessAbort.abort(); accessAbort=new AbortController();
      access=next; connectionState(false);sessionStorage.removeItem("research-desk-access");status("#connection-status","正在连接私人后台…");
      try {
        const config=await api("/config"); displayConfig(config); connectionState(true);
        sessionStorage.setItem("research-desk-access",JSON.stringify(access));
        $("#access-token").value=""; status("#connection-status","已连接。现在可以统一配置 DeepSeek。");
      } catch(error) { if (access===next) {access=undefined;sessionStorage.removeItem("research-desk-access");connectionState(false);} throw error; }
    });
  });
  $("#disconnect-backend").addEventListener("click",()=>{
    accessAbort.abort();accessAbort=new AbortController();access=undefined;currentReport=undefined;sessionStorage.removeItem("research-desk-access");connectionState(false);
    $("#analysis-result").hidden=true;$("#analysis-history").replaceChildren();$("#socialecho-data").hidden=true;
    $("#deepseek-key").value="";$("#socialecho-key").value="";status("#connection-status","已退出私人后台。");
  });
  $("#api-settings-form").addEventListener("submit",event=>{
    event.preventDefault();
    const button=event.submitter; const submittingAccess=access; button.disabled=true;
    withStatus("#settings-status",async()=>{
      status("#settings-status","正在验证密钥并保存统一配置…");
      const result=await api("/config",{deepseekKey:$("#deepseek-key").value.trim(),model:$("#deepseek-model").value,socialEchoKey:$("#socialecho-key").value.trim()},"PUT");
      $("#deepseek-key").value="";$("#socialecho-key").value="";displayConfig(result);
      status("#settings-status","已保存。所有已接入的文字分析工具现在共用这份 DeepSeek 配置。");
    }).finally(()=>{if(access===submittingAccess) button.disabled=!connected;});
  });
  $("#analysis-form").addEventListener("submit",event=>{
    event.preventDefault();const button=event.submitter;const submittingAccess=access;button.disabled=true;
    withStatus("#analysis-status",async()=>{
      status("#analysis-status","正在分析资料，请稍候…");
      const report=await api("/analyze",{mode:$("#analysis-mode").value,question:$("#analysis-question").value,evidence:$("#analysis-evidence").value},"POST");
      showReport(report);status("#analysis-status",report.saved ? "报告已生成并保存在私人后台。" : "报告已生成，但保存失败，请下载留存。");
    }).finally(()=>{if(access===submittingAccess) button.disabled=!connected;});
  });
  $("#fetch-socialecho").addEventListener("click",()=>withStatus("#settings-status",async()=>{
    status("#settings-status","正在读取 SocialEcho 账号…");const data=await api("/socialecho/accounts");
    $("#socialecho-data").hidden=false;status("#socialecho-data",JSON.stringify(data.data,null,2));
    $("#analysis-mode").value="overseas";$("#analysis-evidence").value=`来源：SocialEcho 官方账号接口，读取时间：${new Date().toISOString()}\n${JSON.stringify(data.data,null,2)}
范围：${data.scope}`;
    status("#settings-status","已读取账号与贴文第一页并填入海外内容分析。可在商业分析页补充问题后生成报告。");
  }));
  $("#load-history").addEventListener("click",()=>withStatus("#analysis-status",async()=>{
    const reports=await api("/reports");const container=$("#analysis-history");container.replaceChildren();
    if (!reports.length) {container.textContent="还没有保存的报告。";return;}
    for (const report of reports) {const button=document.createElement("button");button.className="small-button";button.textContent=report.question;button.addEventListener("click",()=>showReport(report));container.append(button);}
  }));
  $("#download-analysis").addEventListener("click",()=>{
    if (!currentReport) return;
    const url=URL.createObjectURL(new Blob([`# ${currentReport.question}\n\n${currentReport.content}`],{type:"text/markdown;charset=utf-8"}));
    const anchor=document.createElement("a");anchor.href=url;anchor.download="研究分析报告.md";anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  document.addEventListener("open-tool-analysis",event=>{
    $("#analysis-mode").value=event.detail;showView("agent");
  });
  connectionState(false);
  try {
    const saved=JSON.parse(sessionStorage.getItem("research-desk-access") || "null");
    if (saved) {access={url:validBackend(saved.url),token:saved.token};$("#backend-url").value=access.url;
      const restoring=access;
      withStatus("#connection-status",async()=>{try {const config=await api("/config");displayConfig(config);connectionState(true);status("#connection-status","已恢复当前标签页的后台连接。");}catch(error){if(access===restoring){access=undefined;sessionStorage.removeItem("research-desk-access");connectionState(false);}throw error;}});}
  } catch {sessionStorage.removeItem("research-desk-access");}
}
