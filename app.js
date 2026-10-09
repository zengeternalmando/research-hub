export const tools = [
  {
    name: "TrendRadar",
    category: "reports",
    module: "热点发现",
    purpose: "捕捉国内多平台新闻与热点变化，阅读已部署的热点报告。",
    status: "报告已接入",
    note: "每小时更新 / 每 7 天签到",
    report: "trend",
    url: "https://zengeternalmando.github.io/TrendRadar/",
  },
  {
    name: "GitHub Research",
    category: "reports",
    module: "开源项目研究",
    purpose: "阅读 GitHub 热门项目日报，查看项目简介、语言和 Star 数据。",
    status: "报告已接入",
    note: "每日更新 / 暂无 AI 分析",
    report: "github",
    url: "https://zengeternalmando.github.io/github-research/",
  },
  {
    name: "CreatorHub",
    category: "domestic",
    module: "国内内容监测",
    purpose:
      "抖音、小红书、快手与视频号的内容管理和监测项目。实际采集需部署并登录。",
    status: "项目入口",
    note: "尚未部署接入",
    url: "https://github.com/3441293738/creatorhub",
  },
  {
    name: "social-account-doctor",
    category: "accounts",
    module: "同类账号研究",
    purpose: "小红书、抖音等平台的账号诊断、爆款拆解与同赛道对标研究工具。",
    status: "项目入口",
    note: "尚未接入账号数据",
    url: "https://github.com/JuneYaooo/social-account-doctor",
  },
  {
    name: "SocialEcho",
    category: "overseas",
    module: "海外内容监测",
    purpose: "进入海外社交媒体内容管理与监测服务，使用自己的账号连接平台。",
    status: "外部服务",
    note: "按原站账号与套餐使用",
    url: "https://www.socialecho.cn/",
  },
  {
    name: "TikTok 官方趋势工具",
    category: "overseas",
    module: "海外内容监测",
    purpose: "查看官方创意中心的热门标签与视频，为海外内容研究寻找线索。",
    status: "官方入口",
    note: "在 TikTok 创意中心查看",
    url: "https://ads.tiktok.com/creative/creativeCenter/trends?LanguageId=1",
  },
  {
    name: "蝉妈妈",
    category: "commerce",
    module: "商业化验证",
    purpose: "查看抖音短视频与直播电商的商品、达人和内容数据。",
    status: "外部服务",
    note: "按原站账号与套餐使用",
    url: "https://www.chanmama.com/",
  },
  {
    name: "千瓜数据",
    category: "commerce",
    module: "商业化验证",
    purpose: "查看小红书达人、笔记和品牌投放线索，核对商业与营销证据。",
    status: "外部服务",
    note: "按原站账号与套餐使用",
    url: "https://www.qian-gua.com/",
  },
  {
    name: "Kalodata",
    category: "commerce",
    module: "商业化验证",
    purpose: "查看 TikTok Shop 商品、店铺、达人与视频数据，研究海外电商机会。",
    status: "外部服务",
    note: "按原站账号与套餐使用",
    url: "https://www.kalodata.com/",
  },
];

const reports = {
  trend: {
    title: "TrendRadar 热点报告",
    url: tools[0].url,
    description: "国内多平台热点与新闻筛选",
    cadence: "约每小时更新 · TrendRadar 每 7 天需在 Actions 签到续期。",
    marker: "news-link",
  },
  github: {
    title: "GitHub 热门项目日报",
    url: tools[1].url,
    description: "热门开源项目与公开榜单数据",
    cadence: "每天北京时间早上 8 点左右更新 · 数据摘要，不含 AI 分析。",
    marker: "GitHub 热门项目日报",
  },
};

export function filterTools(query, category) {
  const normalized = query.trim().toLocaleLowerCase();
  return tools.filter(
    (tool) =>
      (category === "all" || tool.category === category) &&
      `${tool.name} ${tool.module} ${tool.purpose}`
        .toLocaleLowerCase()
        .includes(normalized),
  );
}

function initializeDesk() {
  const $ = (selector) => document.querySelector(selector);
  const frame = $("#report-frame");
  const panel = $("#report-panel");
  let selectedReport = "trend";
  let controller;
  let frameTimeout;

  function showView(view, category = "all", resetSearch = true) {
    const changedView = $(`#${view}-view`).hidden;
    for (const name of ["reports", "tools", "agent"])
      $(`#${name}-view`).hidden = name !== view;
    const names = {
      reports: "今日报告",
      tools: "工具目录",
      agent: "商业分析 Agent",
    };
    $("#breadcrumb").textContent = `工作台 / ${names[view]}`;
    for (const button of document.querySelectorAll(".nav-item")) {
      const active =
        button.dataset.view === view &&
        (view !== "tools" || button.dataset.category === category);
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    }
    if (view === "tools") {
      $("#category-select").value = category;
      if (resetSearch) $("#tool-search").value = "";
      renderTools();
    }
    if (changedView) {
      const heading = $(`#${view}-heading`);
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      $("#main").scrollIntoView({ block: "start" });
    }
  }

  function renderTools() {
    const matching = filterTools(
      $("#tool-search").value,
      $("#category-select").value,
    );
    const list = $("#tool-list");
    list.replaceChildren();
    $("#tool-count").textContent = `${matching.length} 个工具 · 按研究用途整理`;
    $("#tools-empty").hidden = matching.length !== 0;
    for (const tool of matching) {
      const row = document.createElement("article");
      row.className = "tool-row";
      // Tool definitions are authored constants; all displayed content uses textContent.
      row.innerHTML =
        '<div class="tool-information"><div class="tool-title"><h2></h2><span class="tool-category"></span></div><p class="tool-purpose"></p></div><div class="tool-state"><span class="state-tag"></span><small class="tool-note"></small></div>';
      row.querySelector("h2").textContent = tool.name;
      row.querySelector(".tool-category").textContent = tool.module;
      row.querySelector(".tool-purpose").textContent = tool.purpose;
      row.querySelector(".state-tag").textContent = tool.status;
      row
        .querySelector(".state-tag")
        .classList.toggle("integrated", Boolean(tool.report));
      row.querySelector(".tool-note").textContent = tool.note;
      const action = document.createElement(tool.report ? "button" : "a");
      action.className = "tool-action";
      action.textContent = tool.report
        ? "在此阅读"
        : tool.status === "项目入口"
          ? "查看项目"
          : "打开工具";
      action.setAttribute("aria-label", `${action.textContent}：${tool.name}`);
      if (tool.report) {
        action.addEventListener("click", () => {
          showView("reports");
          loadReport(tool.report);
        });
      } else {
        action.href = tool.url;
        action.target = "_blank";
        action.rel = "noopener noreferrer";
      }
      row.append(action);
      list.append(row);
    }
  }

  function showReportError(message) {
    frame.hidden = true;
    panel.setAttribute("aria-busy", "false");
    $("#report-status").textContent = "";
    $("#report-error").hidden = false;
    $("#report-error-message").textContent =
      `${message} 可重新加载，或用上方“单独打开”查看原页面。`;
  }

  async function loadReport(key) {
    if (!Object.hasOwn(reports, key)) return;
    controller?.abort();
    clearTimeout(frameTimeout);
    controller = new AbortController();
    const currentController = controller;
    const report = reports[key];
    selectedReport = key;
    frame.hidden = true;
    frame.removeAttribute("src");
    frame.onload = null;
    frame.title = report.title;
    $("#report-error").hidden = true;
    $("#report-status").textContent = `正在读取${report.title}…`;
    panel.setAttribute("aria-busy", "true");
    panel.setAttribute("aria-labelledby", `${key}-tab`);
    $("#report-description").textContent = report.description;
    $("#report-cadence").textContent = report.cadence;
    $("#open-report").href = report.url;
    for (const tab of document.querySelectorAll("[data-report]")) {
      const active = tab.dataset.report === key;
      tab.classList.toggle("selected", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    }
    try {
      const response = await fetch(report.url, {
        cache: "no-store",
        signal: AbortSignal.any([
          currentController.signal,
          AbortSignal.timeout(25_000),
        ]),
      });
      if (!response.ok) throw new Error(`源页面返回 HTTP ${response.status}。`);
      const html = await response.text();
      if (!html.includes(report.marker))
        throw new Error("源页面尚未生成有效报告。");
      if (currentController.signal.aborted) return;
      frame.onload = () => {
        if (currentController.signal.aborted) return;
        clearTimeout(frameTimeout);
        $("#report-status").textContent = "";
        panel.setAttribute("aria-busy", "false");
      };
      frameTimeout = setTimeout(
        () => showReportError("报告页面加载超时。"),
        30_000,
      );
      frame.src = report.url;
      frame.hidden = false;
    } catch (error) {
      if (currentController.signal.aborted) return;
      showReportError(
        error instanceof Error ? error.message : "读取报告失败。",
      );
    }
  }

  for (const button of document.querySelectorAll("[data-view]"))
    button.addEventListener("click", () =>
      showView(button.dataset.view, button.dataset.category),
    );
  for (const tab of document.querySelectorAll("[data-report]")) {
    tab.addEventListener("click", () => loadReport(tab.dataset.report));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
        return;
      event.preventDefault();
      const next =
        event.key === "Home"
          ? "trend"
          : event.key === "End"
            ? "github"
            : selectedReport === "trend"
              ? "github"
              : "trend";
      $(`#${next}-tab`).focus();
      loadReport(next);
    });
  }
  $("#tool-search").addEventListener("input", renderTools);
  $("#category-select").addEventListener("change", () => {
    showView("tools", $("#category-select").value, false);
  });
  $("#clear-filters").addEventListener("click", () => showView("tools"));
  $("#refresh-report").addEventListener("click", () =>
    loadReport(selectedReport),
  );
  $("#retry-report").addEventListener("click", () =>
    loadReport(selectedReport),
  );
  renderTools();
  loadReport(selectedReport);
}

if (typeof document !== "undefined") initializeDesk();
