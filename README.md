# 个人博客网站（试验版）

一个使用 React + TypeScript + Vite + Tailwind CSS + shadcn/ui 构建的现代个人博客网站。

## 功能特性

- 📝 博客文章展示和阅读
- 🔍 文章搜索和分类过滤
- 🌓 支持亮色/暗色主题切换
- 📱 完全响应式设计，支持移动端
- ⚡ 快速的页面加载和流畅的用户体验
- 🎨 现代化的 UI 设计

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式**: Tailwind CSS 3.4
- **路由**: React Router 6
- **图标**: Lucide React
- **UI 组件**: shadcn/ui

## 安装依赖

```bash
cd blog
npm install
```

## 启动开发服务器

```bash
npm run dev
```


## 构建生产版本

```bash
npm run build
```

## 预览生产构建

```bash
npm run preview
```

## 项目结构

```
blog/
├── src/
│   ├── components/       # 组件
│   │   ├── ui/          # UI 基础组件
│   │   ├── Header.tsx   # 导航栏
│   │   ├── Footer.tsx   # 页脚
│   │   └── PostCard.tsx # 文章卡片
│   ├── pages/           # 页面
│   │   ├── Home.tsx     # 首页
│   │   ├── PostList.tsx # 文章列表
│   │   ├── PostDetail.tsx # 文章详情
│   │   └── About.tsx    # 关于页面
│   ├── data/            # 数据
│   │   ├── posts.ts     # 文章数据
│   │   └── author.ts    # 作者信息
│   ├── lib/             # 工具函数
│   ├── App.tsx          # 根组件
│   └── main.tsx         # 入口文件
├── public/              # 静态资源
└── package.json
```

## 自定义配置

### 修改文章数据

编辑 `src/data/posts.ts` 文件可以添加或修改博客文章。

### 修改作者信息

编辑 `src/data/author.ts` 文件可以更新个人信息。

### 自定义样式

- 全局样式: `src/index.css`
- Tailwind 配置: `tailwind.config.js`

## 部署

可以部署到任何静态网站托管服务，如:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## 许可证

MIT License
