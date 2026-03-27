# 流浪狗狗领养服务

这是一个使用 React + Vite + TypeScript 搭建的纯前端项目，目标是制作一个流浪狗狗收养服务页面。使用者未来可以在页面中浏览不同狗狗品种，并查看每只狗的详细资料，再进入领养流程。

协作与专题文档入口统一整理在 `docs/guide.md`；开始改动前，请先确认 `docs/spec.md`、`docs/data-model.md` 与 `docs/code-maintenance.md`。

## 当前阶段

当前阶段只完成两件事：
- 初始化前端项目骨架。
- 生成可供后续页面开发使用的 mock 数据。

页面开发、视觉设计、领养流程与“每人最多领养三只”的前端交互逻辑将在你确认数据后再进入下一阶段。

当前 mock 数据中的中文文本统一使用简体中文，`dogs.csv` 与 `dogs.json` 需要保持同一份数据语义与文案风格；生成脚本中的数据源文本也直接维护为简体中文，不额外做运行时转换。

## 技术栈

- React
- Vite
- TypeScript
- npm

## UI 约束

- 下一阶段进入页面开发时，UI 必须基于现成框架或组件方案实现，不使用 pure CSS 独立从零搭建整套界面。
- 可接受的方向包括 Material UI、Ant Design、Shadcn UI、Tailwind CSS 等同类方案。
- 在当前数据结构确认前，本阶段不安装或开发具体 UI 组件，仅先记录该约束。

## 快速启动

```bash
npm install
npm run generate:data
npm run verify:data
npm run dev
```

## 常用命令

```bash
npm run build
```

## 数据目录

当前 mock 数据输出在 `src/public/data/`：

- `dogs.json`：供前端后续直接读取的总表数组
- `dogs.csv`：可直接用表格软件打开的 spreadsheet 文件

两份文件都应使用简体中文字段内容，且记录数量、字段结构与记录顺序保持一致。

## 数据结构

每条狗狗记录包含以下字段：

| 字段 | 说明 |
| --- | --- |
| `id` | 唯一编号 |
| `name` | 狗狗名字 |
| `breed` | 品种 |
| `ageYears` | 年龄（岁） |
| `gender` | 性别 |
| `weightKg` | 体重（公斤） |
| `coatColor` | 毛色 |
| `personality` | 性格标签 |
| `vaccinated` | 是否已完成疫苗 |
| `neutered` | 是否已绝育 |
| `city` | 当前所在城市 |
| `description` | 简短介绍 |
| `adoptionStatus` | 领养状态，本阶段统一为 `available` |

补充约定：
- `gender` 与 `adoptionStatus` 目前仍保留英文枚举值，方便后续程式判断。
- 其余面向内容展示的文字字段（如品种、毛色、性格、城市、描述）统一使用简体中文。

## 数据规模

- 8 个狗狗品种
- 每个品种 12 只狗
- 总计 96 条记录

## 后续页面目标

下一阶段页面会围绕以下结构开发：
- 顶部使用品种分类浏览，体验类似点餐页面中的分类菜单。
- 主内容区展示当前品种下的每只狗狗资料。
- 每条记录会用于支撑后续的卡片展示、筛选与领养状态呈现。

在进入页面开发前，如果字段、分类或数据风格要调整，请先更新本文档说明。

## 维护说明

- 代码改动前，先依 `docs/change-workflow.md` 更新相关文档。
- 新增或修改代码时，需要补充适量的维护性注释，重点解释约束、资料来源、非直觉逻辑与跨档案同步点。
