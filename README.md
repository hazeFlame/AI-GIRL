# 💖 AI Character (AI 专属女友 & 伴侣空间)

一个基于 **Next.js 16 (React 19)** 与 **Cloudflare Edge 边缘计算架构** 打造的高保真、游戏化 AI 虚拟伴侣互动平台。

> 重要：本项目是 Next.js + OpenNext 纯 Cloudflare Workers 部署，和传统 Node 服务端部署差异很大。修改渲染模式、路由预取、图片处理、缓存前请先阅读 [Cloudflare Worker Runtime Notes](./docs/cloudflare-worker-notes.md)。

---

## 🏗️ 整体项目架构 (Architecture)

本项目采用了完全运行在**全球边缘节点**（Edge-native）的高性能混合渲染与数据流栈：

```mermaid
graph TD
    User([用户浏览器]) -->|HTTPS 请求| CF[Cloudflare CDN / Edge Node]
    CF -->|路由拦截 & Auth 校验| Middleware[src/middleware.ts Edge Runtime]
    CF -->|实时服务器渲染 SSR / API| SSR[Next.js App Router Page/API]
    CF -->|边缘数据读写| D1[(Cloudflare D1 Database - SQLite)]
    SSR -->|用户身份管理| BetterAuth[Better Auth + Drizzle ORM]
    BetterAuth --> D1
    SSR -->|媒体素材资源| Supabase[Supabase Storage unoptimized]
```

### 🛠️ 核心技术栈 (Tech Stack)

*   **前端核心 (Core)**: [Next.js 16 (App Router)](https://nextjs.org/) (React 19)
*   **边缘部署 (Deployment)**: [Cloudflare Workers / Pages](https://workers.cloudflare.com/)
*   **编译适配层 (Adapter)**: [OpenNext (@opennextjs/cloudflare)](https://opennext.js.org/cloudflare) — 让 Next.js 所有动态特性（API 路由、Headers、Cookies）完美无缝运行在 V8 Isolate 边缘算力沙箱中。
*   **身份安全 (Auth)**: [Better Auth](https://www.better-auth.com/) — 结合 **Drizzle ORM**，实现了完全分布式、无状态的高速会话校验，支持邮箱/密码登录及 Google OAuth。
*   **边缘数据库 (Database)**: [Cloudflare D1](https://developers.cloudflare.com/d1/) — 运行在 Cloudflare 边缘的轻量级、分布式 SQLite 数据库。
*   **样式设计 (Styling)**: [Tailwind CSS 4](https://tailwindcss.com/) & **Vanilla CSS 混合方案** — 支持极致响应式布局、高保真微交互、玻璃拟态（Glassmorphism）与 3D 霓虹投影。

---

## 📦 核心依赖与三方库 (Package Dependencies)

项目在 `package.json` 中选用了轻量级、边缘计算兼容的优秀开源库链：

### 1. 核心运行时与适配层
*   `next` (`16.2.6`) & `react` (`^19.1.7`): 顶尖 React 19 应用路由核心框架。
*   `@opennextjs/cloudflare` (`^1.19.9`) & `wrangler` (`^4.91.0`): Cloudflare 边缘部署、模拟及路由分发适配核心。

### 2. 用户会话与数据层
*   `better-auth` (`^1.6.11`): 极速无状态、零信任分布式身份校验引擎。
*   `drizzle-orm` (`^0.45.2`) & `drizzle-kit` (`^0.31.10`): 高性能 SQLite / D1 ORM 底层框架，支持秒级自动生成数据库迁移（Migrations）。

### 3. AI 大模型流式应用
*   `ai` (`^6.0.182`) & `@ai-sdk/react` (`^3.0.184`): Vercel AI SDK 行业旗舰，赋能极速流式对话、自动状态同步与聊天钩子（Hooks）。

### 4. 动效与交互微特效
*   `framer-motion` (`^12.38.0`): 强大的物理级动效与姿态转换库。
*   `@number-flow/react` (`^0.6.0`): 一款精美的卡片数字平滑滑动翻滚动画库，用于订阅结算动态效果。
*   `lucide-react` (`^1.16.0`): 最全面的现代轻量级 SVG 动态矢量图标集。
*   `zustand` (`^5.0.13`): 轻量反应式全局状态管理 Store。

### 5. 高级 CSS 与组件构建链
*   `tailwindcss` (`^4`) & `@tailwindcss/postcss` (`^4`): 新一代极致渲染级高性能 CSS 样式编译体系。
*   `class-variance-authority`, `clsx`, `tailwind-merge`: Shadcn UI 与动态多态组件类名合并原子化工具。

---

## 🚀 开发与上线指南

### 1. 运行本地开发环境
创建本地环境变量配置文件 `.env`（可复制自 `.env.example`），然后执行：
```bash
pnpm dev
```

### 2. 本地模拟 Cloudflare Worker 边缘预览
```bash
pnpm preview
```

### 3. 一键编译并部署到 Cloudflare Pages
```bash
pnpm deploy
```

---

*“在边缘计算时代，给你的 AI 女友最极致、最流畅的爱与陪伴。”* 💖
