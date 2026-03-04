# THU NMRC Reports (AIGC 发展研究系列报告)

清华大学新闻与新媒体研究中心 - AIGC 发展研究系列报告官方文库源码仓库。

🔥 **[点击这里访问在线展示与下载网站](https://thu-nmrc.github.io/THU-NMRC-Reports/)** 🔥

## 简介

本仓库收录了清华大学新闻与新媒体研究中心（沈阳教授团队）公开发布的所有 AIGC 研究成果与完整报告，并提供了一个基于 React 的极简高端展示前端网页，供全球研究者免费沉浸式阅览与一键下载。

## 💡 给团队成员：如何更新/新增报告？

本网站采用**配置驱动 (Configuration-driven)** 设计，非技术团队成员也可以免代码极速发布新报告：

1. **上传原件**: 直接在 GitHub 网页端本仓库里新建一个文件夹（例如命名为 `第四版`），将完整的 PDF 报告和一张好看的封面配图传进去。
2. **修改配置**: 打开并编辑 [`public/reports_config.json`](public/reports_config.json) 文件。
3. **添加记录**: 在文件的最前面，模仿现有的记录，写入新报告的标题、摘要、以及刚刚上传的图片和PDF路径。例如：
   ```json
   {
     "id": "v4",
     "title": "AIGC发展研究4.0版",
     "version": "4.0",
     "date": "2025",
     "abstract": "这是最新的4.0报告绪论...",
     "coverUrl": "./第四版/cover.png",
     "pdfUrl": "./第四版/AIGC研究4.0版.pdf"
   }
   ```
4. **保存完成**: 点击 `Commit changes` 保存修改。GitHub 的自动化机器人（Actions）会在 1~2 分钟内自动把最新的卡片推送到[线上展示网站](https://thu-nmrc.github.io/THU-NMRC-Reports/)！

---

### 技术栈与开发说明
- **Framework**: Vite + React (TypeScript)
- **Styling**: Tailwind CSS v3
- **Deployment**: 纯静态构建，GitHub Actions 自动化发布至 GitHub Pages
- **Developer**: 开源社区贡献

*如果你需要本地二次开发，请克隆本仓库后执行 `npm install` 与 `npm run dev` 即可。*
