# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

站主需要在手机和电脑上随时访问研究工具与报告。

## Product Purpose

把截图中的内容与商业研究工具集中到一个工作台，直接阅读 TrendRadar 和 GitHub 日报，其他工具提供真实入口，逐步接入功能。

## Capabilities and Constraints

- 第一版采用用户确认的统一工作台范围，不在浏览器内复刻所有第三方应用。
- 热点发现：已部署的 TrendRadar 网页报告。
- 开源项目研究：GitHub Research 热门项目日报；用户没有指定关键词。
- 国内内容监测：用户确认 https://github.com/3441293738/creatorhub 。
- 同类账号研究：用户确认 https://github.com/JuneYaooo/social-account-doctor 。
- 海外内容监测：SocialEcho 和 TikTok 官方趋势工具。
- 商业化验证：蝉妈妈、千瓜、Kalodata。
- 入口不能宣称已完成抓取、登录或商业分析；不得显示虚构报告与指标。
- 公共网页不保存账号 Cookie、密钥或第三方付费数据。
- 用户选择阅读优先与工具优先结合：深色工具导航配浅色报告阅读区。
- 已授权公开 GitHub 仓库与在线访问。工作台继续使用 GitHub Pages；静态 HTML/CSS/JavaScript 是部署约束下的实现假设。
- 后续用户明确要求移除报告右侧研究路径和常用入口栏，阅读区占满主区。

- 用户撤销网页 DeepSeek 与 Agent 接入：删除统一设置、连接表单、在线分析与相关后台代码。两个项目保留入口，改为本机应用与 Agent 技能使用。
- 用户明确不需要报告同步。不新增同步功能或定时任务。

## Success Criteria

网页可公开访问；两份真实报告可在工作台内阅读；其他工具按用户截图的用途分类，入口有效、状态清晰；手机无横向溢出，操作支持键盘。
