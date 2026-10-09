# 研究工作台

统一查看热点与 GitHub 日报，按用途进入内容监测、账号研究和商业验证工具。

## 在线使用

公开网址：https://zengeternalmando.github.io/research-hub/

- 今日报告：在工作台内阅读 TrendRadar 和 GitHub Research，支持切换、刷新和单独打开。
- 工具目录：搜索工具或平台，按研究模块筛选。
- 商业分析 Agent：目前为接入说明，未配置模型与商业报告任务。

CreatorHub 和 social-account-doctor 链接经用户确认。项目入口与第三方服务未被当成已部署功能。
公共工作台不保存平台账号、Cookie、模型密钥或第三方付费数据。

## 实现与验证

无需安装依赖；静态 HTML/CSS/JavaScript，通过 GitHub Pages 发布。

`npm run check` 检查脚本语法和工具搜索规则。提交 main 后自动发布。

报告来自已有公开网页，打开工作台时读取最新成功的报告。如果读取失败，会显示重试与单独打开入口。
TrendRadar 按原项目规则每 7 天需要签到；GitHub 日报每天北京时间 08:07 定时生成，可能有排队延迟。
商业分析 Agent 接入后需要服务端模型 API 和证据资料，模型密钥不可放在浏览器代码中。
