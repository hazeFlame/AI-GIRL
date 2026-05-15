# AI Girl

一个基于 Next.js 16 和 Cloudflare 边缘计算架构的 AI 应用。

## 🏗️ 项目架构

本项目采用了高性能、边缘原生的技术栈：

- **前端框架**: [Next.js 16](https://nextjs.org/) (React 19)
- **部署平台**: [Cloudflare Workers / Pages](https://workers.cloudflare.com/)
- **适配层**: [OpenNext (@opennextjs/cloudflare)](https://opennext.js.org/cloudflare) - 让 Next.js 能够全功能运行在 Cloudflare Workers 运行时。
- **样式方案**: [Tailwind CSS 4](https://tailwindcss.com/) - 最新的高性能 CSS 框架。
- **包管理器**: [pnpm](https://pnpm.io/)

## 🚀 核心优势

- **边缘运行**: 整个应用部署在 Cloudflare 的边缘节点，全球低延迟响应。
- **无服务器**: 无需维护传统服务器，根据流量自动伸缩。
- **混合渲染**: 支持服务端渲染 (SSR)、静态生成 (SSG) 以及客户端渲染 (CSR)。

## 🛠️ 开发指南

### 运行开发服务器

```bash
pnpm dev
```

### 在 Cloudflare 运行时预览

```bash
pnpm preview
```

### 部署到 Cloudflare

```bash
pnpm deploy
```

## 📂 项目结构

- `src/app/`: Next.js App Router 目录，包含页面和 API 路由。
- `wrangler.jsonc`: Cloudflare Workers 的配置文件。
- `open-next.config.ts`: OpenNext 适配器配置。
- `public/`: 静态资源文件。
