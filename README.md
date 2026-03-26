# 流浪狗狗领养服务

这是一个使用 React + Vite + TypeScript 搭建的纯前端项目，目标是制作一个流浪狗狗收养服务页面。使用者未来可以在页面中浏览不同狗狗品种，并查看每只狗的详细资料，再进入领养流程。

## 当前阶段

当前阶段只完成两件事：
- 初始化前端项目骨架。
- 生成可供后续页面开发使用的 mock 数据。

页面开发、视觉设计、领养流程与“每人最多领养三只”的前端交互逻辑将在你确认数据后再进入下一阶段。

## 技术栈

- React
- Vite
- TypeScript
- npm

## 启动与常用命令

```bash
npm install
npm run generate:data
npm run verify:data
npm run dev
npm run build
```

## 数据目录

当前 mock 数据输出在 `src/public/data/`：

- `dogs.json`：供前端后续直接读取的总表数组
- `dogs.csv`：可直接用表格软件打开的 spreadsheet 文件

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

