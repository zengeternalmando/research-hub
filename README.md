# 研究工作台

统一查看热点与 GitHub 日报，按用途进入内容监测、账号研究和商业验证工具。

## 在线使用

公开网址：https://zengeternalmando.github.io/research-hub/

- 今日报告：在工作台内阅读 TrendRadar 和 GitHub Research，支持切换、刷新和单独打开。
- 工具目录：搜索工具或平台，按研究模块筛选。
- 商业分析 Agent：提供文字分析表单，共用已部署的 DeepSeek 后台。填写密钥后可生成报告。
- 统一 API 设置：提供 DeepSeek 一次配置表单；必须先连接受保护后台才能验证与保存密钥。

CreatorHub 和 social-account-doctor 链接经用户确认。项目入口与第三方服务未被当成已部署功能。
公共工作台不保存平台账号、Cookie、模型密钥或第三方付费数据。

## 实现与验证

无需安装依赖；静态 HTML/CSS/JavaScript，通过 GitHub Pages 发布。

`npm run check` 检查脚本语法和工具搜索规则。提交 main 后自动发布。

报告来自已有公开网页，打开工作台时读取最新成功的报告。如果读取失败，会显示重试与单独打开入口。
TrendRadar 按原项目规则每 7 天需要签到；GitHub 日报每天北京时间 08:07 定时生成，可能有排队延迟。
已移除报告右侧研究路径与常用入口。后台实现与本地验证方式见 backend/README.md。
受保护后台已发布并验证访问权限与报告读取；真实模型调用需要站主填写 DeepSeek 密钥。CreatorHub 运行地点与平台登录尚未完成；Doctor 是文字分析适配，不能宣称三个原工具已全部接入。
