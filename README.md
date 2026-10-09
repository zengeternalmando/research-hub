# 研究工作台

公开网址：https://zengeternalmando.github.io/research-hub/

- 今日报告：在工作台内阅读 TrendRadar 和 GitHub Research，支持切换、刷新和单独打开。
- 工具目录：搜索工具或平台，按研究模块筛选，提供开源项目与外部服务入口。
- CreatorHub 在本机运行；social-account-doctor 在 Agent 中作为技能使用。工作台不运行这两个工具，也不自动读取其账号数据。

按用户最新要求，已移除 DeepSeek 设置、私人后台连接、在线分析及 SocialEcho API 授权界面和相关后台代码。SocialEcho 保留原站入口。原分析服务停用；已有云端存储保留，未删除历史数据。

采集、诊断和同步链路尚未实现。平台登录与 Doctor 对标样本选择可能需要人工介入，因此当前不新增报告同步或定时任务。

无需安装依赖；静态 HTML/CSS/JavaScript，通过 GitHub Pages 发布。`npm run check` 检查脚本语法与工具搜索规则，提交 main 后自动发布。

报告来自已有公开网页。TrendRadar 按原项目规则每 7 天需要签到；GitHub 日报每天北京时间 08:07 定时生成，可能有排队延迟。报告右侧研究路径与常用入口已移除。
