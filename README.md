# THU NMRC Reports

清新研究团队·清华大学前沿研究报告文库源码仓库。

🔥 **[点击这里访问在线展示与下载网站](https://thu-nmrc.github.io/THU-ZeeLin-Reports/)** 🔥

## 简介

本站收录清新研究团队公开发布的各类别深度研究成果，供全球研究者免费沉浸式阅览与下载。

## 💡 给团队非技术成员：如何更新/新增报告？

本网站采用**配置驱动 (Configuration-driven)** 设计，非技术团队成员也可以免写代码，极速发布新的研究报告并自动生成精美网页：

1. **上传原件**: 直接在 GitHub 网页端**进入 `public` 文件夹**，在里面新建一个文件夹（例如命名为 `第四版` 或 `元宇宙系列1`），将完整的 PDF 报告传进去。（如有现成的封面图，也可一并传入）。
2. **修改配置**: 打开并编辑本目录下的 [`public/reports_config.json`](public/reports_config.json) 文件。
3. **添加记录**: 在文件的数组最前面，模仿现有的记录写入新报告的信息：
   ```json
   {
     "id": "v4",
     "title": "AIGC发展研究4.0版",
     "version": "4.0",
     "date": "2025",
     "category": "AIGC发展",
     "abstract": "这是最新的4.0报告前言摘要...",
     "coverUrl": "./第四版/设计好的封面配图.png",
     "pdfUrl": "./第四版/AIGC研究4.0版.pdf"
   }
   ```
   > **⚠️ 新增特性的进阶说明：**
   > - **关于分类（`category` 必填）**：如填写 `AIGC发展`、`元宇宙`、`社会治理`。网站的 Tabs 导航条会**自动识别新分类**并长出高亮的滑动按钮，方便访客筛选。
   > - **关于封面（`coverUrl` 非必填）**：如果你手头**没有合适的封面图**，无需烦恼！就算直接乱填或者放空，网站也会非常智能地兜底：自动生成一张带有「AIGC 4.0」等版本字眼、充满学术紫高级感的极简占位图，排版依然完美统一！
   
4. **保存完成**: 点击页面底部的 `Commit changes` 保存修改。GitHub 会在 1~2 分钟内全自动分发，[线上展示网站](https://thu-nmrc.github.io/THU-ZeeLin-Reports/) 就会立刻多出一张新鲜出炉的下载卡片！

---

### 技术栈与本地开发
- **Framework**: Vite + React (TypeScript)
- **Styling**: Tailwind CSS v3
- **Deployment**: Github Actions -> GitHub Pages
- **Development**: 克隆仓库后，执行 `npm install` 与 `npm run dev` 即可二次开发。
