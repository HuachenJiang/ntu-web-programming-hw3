# 流浪狗狗领养服务

这是一个使用 React + Vite + TypeScript 搭建的纯前端产品原型，聚焦于流浪狗狗资料浏览首页与前端 mock 领养互动的设计与实现。

当前首页会展示全站资料规模、品种切换结果与狗狗卡片资料，并提供菜单式的待认养结算体验；`dogs.json` / `dogs.csv` 直接就是组件消费的资料来源，像性别与健康状态文案会在生成资料时先固定好，领养状态则在前端 session 内动态覆写。当前 session 也会限制单次最多认领 3 只，并提供已认领狗狗的查看入口。更细的状态流与统计口径说明统一以 `docs/architecture.md` 与 `docs/homepage-component-contracts.md` 为准。

## 文档入口

项目文档统一从 `docs/guide.md` 进入；该文件负责整理文档地图、阶段范围、查阅顺序与更新规则。

- 文档入口：`docs/guide.md`
- 规格说明：`docs/spec.md`
- 架构说明：`docs/architecture.md`
- 首页组件契约：`docs/homepage-component-contracts.md`
- 数据说明：`docs/data-model.md`
- 开发说明：`docs/development.md`
- 变更流程：`docs/change-workflow.md`
- 文档结构：`docs/documentation-structure.md`

若 `README.md` 与专题文档出现不一致，请优先回到 `docs/guide.md` 确认当前文档结构与更新方向，再同步修正文档。

## 技术栈

- React
- Vite
- TypeScript
- npm
- Material UI

## 启动与常用命令

```bash
npm install
npm run generate:data
npm run verify:data
npm run dev
npm run build
```

当前阶段范围、数据约定、架构规范与文档变更流程，统一以 `docs/` 中的权威文档为准，不在本文件重复定义。
