# Eat What Lunch

一个纯前端 React 转盘页面：自定义午餐词条、保存在浏览器本地、点击转盘随机抽取。

## 本地运行

```bash
npm install
npm run dev
```

## Cloudflare Pages 部署

1. 将仓库推到 GitHub。
2. 在 Cloudflare Pages 新建项目并连接仓库。
3. 构建配置：
   - Build command: `npm run build`
   - Build output directory: `dist`
4. 部署完成后即可访问。

## 技术结构

- `src/components`：UI 组件（转盘、词条管理）
- `src/hooks`：状态与本地存储逻辑
- `src/utils`：转盘计算与样式算法
- `src/constants`：默认数据与 key
