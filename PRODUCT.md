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
- AI 研究：商业分析文字流程通过统一 DeepSeek 后台运行；未配置密钥时展示连接与配置提示。
- 入口不能宣称已完成抓取、登录或商业分析；不得显示虚构报告与指标。
- 公共网页不保存账号 Cookie、密钥或第三方付费数据。
- 用户选择阅读优先与工具优先结合：深色工具导航配浅色报告阅读区。
- 已授权公开 GitHub 仓库与在线访问。工作台继续使用 GitHub Pages；静态 HTML/CSS/JavaScript 是部署约束下的实现假设。
- 后续用户明确要求移除报告右侧研究路径和常用入口栏，阅读区占满主区。
- 新增统一 API 配置入口，只支持 DeepSeek；已适配的文字分析共享后台配置。密钥在受保护后台保存。
- CreatorHub 原版采集必须有浏览器主机及平台登录，部署地点等待用户选择。Doctor 先适配文字分析，不宣称接入原版视觉、视频或自动对标搜索。
- SocialEcho 通过独立团队密钥只读账号与贴文数据；DeepSeek 不能代替数据授权。
- Cloudflare 后台已发布，已验证健康状态、授权配置与报告读取，以及未授权和非允许来源请求拒绝。真实 DeepSeek 与 SocialEcho 调用等待站主填写密钥。

## Success Criteria

网页可公开访问；两份真实报告可在工作台内阅读；其他工具按用户截图的用途分类，入口有效、状态清晰；手机无横向溢出，操作支持键盘。
