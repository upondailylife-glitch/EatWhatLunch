# Eat What Lunch

一个纯前端 React 转盘页面：自定义午餐词条、保存在浏览器本地、点击转盘随机抽取。

## 本地运行

```bash
npm install
npm run dev
```

## Cloudflare Wrangler 部署

1. 登录 Cloudflare：

```bash
npx wrangler login
```

2. 构建并部署：

```bash
npm run cf:deploy
```

3. 首次部署后，Cloudflare 会自动创建 Worker 与 `*.workers.dev` 访问地址。

### 可用命令

- `npm run cf:build`：构建静态资源到 `dist/`
- `npm run cf:dev`：用 Wrangler 本地预览（基于 `dist/`）
- `npm run cf:deploy`：构建并发布到 Cloudflare

### 部署配置

- Wrangler 配置文件：`wrangler.toml`
- 静态资源目录：`dist`
- SPA 刷新回退：`not_found_handling = "single-page-application"`

## 技术结构

- `src/components`：UI 组件（转盘、词条管理）
- `src/hooks`：状态与本地存储逻辑
- `src/utils`：转盘计算与样式算法
- `src/constants`：默认数据与 key
