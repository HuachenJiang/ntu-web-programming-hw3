# Development

本文件说明本地开发方式、常用命令与当前阶段建议工作流。

## 1. 环境

- Node.js
- npm
- React
- Vite
- TypeScript
- Material UI

## 2. 安装与启动

```bash
npm install
npm run generate:data
npm run verify:data
npm run dev
```

生产构建：

```bash
npm run build
```

本地预览：

```bash
npm run preview
```

## 3. 可用脚本

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动 Vite 开发环境 |
| `npm run build` | 进行正式构建 |
| `npm run preview` | 预览构建结果 |
| `npm run generate:data` | 生成狗狗 mock 数据 |
| `npm run verify:data` | 验证 `dogs.json` 与 `dogs.csv` 是否一致 |

## 4. 当前建议工作流

1. 先阅读 `docs/guide.md` 与相关专题文档。
2. 先阅读 `docs/change-workflow.md`，判断本次变更需要先改哪些文档。
3. 若变更会影响结构、数据、脚本或交互，先更新文档。
4. 再修改实现。
5. 若有动到数据产物或脚本，执行：

```bash
npm run generate:data
npm run verify:data
```

6. 若有动到前端页面，至少执行：

```bash
npm run build
```

7. 检查 `README.md` 是否仍与专题文档摘要一致。

## 5. 当前开发范围

允许：

- 首页视觉设计
- 品种浏览
- 卡片展示
- 前端 mock 的领养互动
- 底部待认养结算区
- 响应式排版

暂不处理：

- 登录与用户状态
- 后端 API 串接
- 持久化
- 真实订单 / 付款流程
- 复杂筛选

## 6. 文档更新要求

若你修改了以下内容，必须同步更新对应文档：

- 页面结构或组件职责：`docs/architecture.md`、`docs/homepage-component-contracts.md`
- 数据结构：`docs/data-model.md`
- 命令与工作流：`docs/development.md`
- 文档规则：`docs/guide.md`、`docs/change-workflow.md`、`docs/documentation-structure.md`

详细流程以 `docs/change-workflow.md` 为准。
