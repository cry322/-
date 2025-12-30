# 项目运行指南

## 项目简介

这是一个基于 React + TypeScript + Vite 的选课宝典网站项目，提供课程评价、测评库、帮助中心等功能。项目使用现代前端技术栈，包含响应式设计和丰富的交互组件。

## 系统要求

- Node.js 版本 16.0.0 或更高（推荐使用 LTS 版本）
- npm 或 yarn 包管理器（项目默认使用 npm）
- 现代浏览器（Chrome、Firefox、Safari 等）

## 安装步骤

1. 下载或克隆项目代码到本地文件夹。
2. 打开命令行工具（Windows 使用 PowerShell 或命令提示符，macOS/Linux 使用终端）。
3. 进入项目根目录（包含 `package.json` 的文件夹）。
4. 运行以下命令安装项目依赖：
   ```
   npm install
   ```
   （如果使用 yarn，请运行 `yarn install`）

## 运行开发版本

安装完成后，运行以下命令启动开发服务器：

```
npm run dev
```

- 服务器启动后，会显示本地访问地址（通常是 `http://localhost:5173` ）。
- 在浏览器中打开该地址即可查看和使用网站。
- 开发模式支持热重载，修改代码后页面会自动刷新。

## 构建生产版本（可选）

如果需要部署到服务器或生成静态文件，运行以下命令：

```
npm run build
```

- 构建完成后，会在 `dist` 文件夹生成优化后的静态文件。
- 可以使用任何静态文件服务器（如 Nginx、Apache）部署 `dist` 文件夹的内容。
- 或者使用 `npm run preview` 在本地预览构建结果。

## 常见问题

- 如果遇到端口占用问题，可以在 `npm run dev` 后添加 `--port 3000` 指定其他端口。
- 如果安装依赖时出错，请确保 Node.js 版本正确，并尝试删除 `node_modules` 文件夹后重新安装。
- 项目使用了 Tailwind CSS 和 Lucide React 图标库，这些依赖会在安装时自动下载。

## 技术栈

- 前端框架：React 18
- 构建工具：Vite
- 样式：Tailwind CSS
- 路由：React Router
- 图标：Lucide React
- 类型检查：TypeScript

如果在运行过程中遇到问题，请检查控制台错误信息，或参考项目中的其他文档。
