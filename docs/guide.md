# Documentation Guide

`docs/guide.md` 是本项目文档体系的入口，也是团队协作时的单一导航入口。

## 1. 文档入口定位

`docs/guide.md` 负责导航文档体系，不再作为阶段事实的权威来源。

当前项目阶段、目标、允许范围与禁止事项统一以 `docs/spec.md` 为准。

## 2. Single Source of Truth

文档维护采用以下规则：

- `docs/guide.md` 是文档入口，所有专题文档都必须先在这里挂载。
- `README.md` 只保留项目摘要、快速启动与文档入口，不重复承载阶段细节、数据字段或架构规范。
- `AGENTS.md` 只保留协作门禁与强制规则，不承载阶段细节、数据字段表或组件规范。
- 当页面交互、数据结构、目录结构、运行方式、脚本命令发生变化时，必须先更新文档，再修改实现。
- 若文档之间有冲突，先以 `docs/guide.md` 指向的专题结构为准，再同步修正文档。

未出现在本文件“文档地图”中的新文档，视为尚未接入正式文档体系。

### 权威归属

为避免重复维护，同一类事实只能有一个权威来源：

| 事实类型 | 权威文档 | 其他文件应该怎么做 |
| --- | --- | --- |
| 当前阶段、允许范围、禁止事项 | `docs/spec.md` | 只引用，不重复展开 |
| 首页架构、状态流、分层规则 | `docs/architecture.md` | 只摘要，不复制规范 |
| 首页组件职责与非职责 | `docs/homepage-component-contracts.md` | 只引用，不逐项复述 |
| 数据字段、允许值、资料目录 | `docs/data-model.md` | 只引用，不重复列字段表 |
| 开发命令与执行方式 | `docs/development.md` | `README.md` 可保留快速启动命令 |
| 文档优先的变更流程 | `docs/change-workflow.md` | `AGENTS.md` 只引用流程入口 |
| 文档职责与命名规则 | `docs/documentation-structure.md` | 其他文件不再重复说明 |

若需要把同一事实写到第二个文件，必须改成“摘要 + 指向权威文档”，而不是复制完整内容。

## 3. 文档地图

- `docs/guide.md`
  - 文档入口、查阅顺序、更新规则
- `docs/spec.md`
  - 当前阶段、目标、允许范围、禁止事项
- `docs/architecture.md`
  - 首页实现规范、分层职责、状态流、扩充边界
- `docs/homepage-component-contracts.md`
  - 首页核心组件契约与修改边界
- `docs/data-model.md`
  - mock 数据来源、字段定义、允许值来源、同步更新点
- `docs/development.md`
  - 本地开发、脚本命令、执行检查
- `docs/change-workflow.md`
  - 先写文档再改代码的执行流程与决策表
- `docs/documentation-structure.md`
  - 各文档职责、命名规则、避免重复的边界

## 4. 按任务找文档

如果你要做以下工作，优先看这些文档：

| 任务 | 优先查阅 |
| --- | --- |
| 修改首页区块、排版、元件职责 | `docs/architecture.md`、`docs/homepage-component-contracts.md` |
| 修改单一首页组件 | `docs/homepage-component-contracts.md`、`docs/architecture.md` |
| 修改当前阶段、in/out of scope | `docs/spec.md`、`docs/change-workflow.md` |
| 修改数据字段、品种枚举、数据目录 | `docs/data-model.md` |
| 修改脚本命令、运行方式、验证流程 | `docs/development.md`、`docs/change-workflow.md` |
| 修改协作规则或新增文档 | `docs/documentation-structure.md`、`docs/change-workflow.md` |
| 只想快速了解项目 | `README.md`，再回到本文件继续阅读 |

## 5. 推荐查阅顺序

### 新协作者

1. `docs/guide.md`
2. `README.md`
3. `docs/spec.md`
4. `docs/architecture.md`
5. `docs/homepage-component-contracts.md`

### 准备开始改代码

1. `docs/guide.md`
2. `docs/change-workflow.md`
3. 与本次改动直接相关的专题文档

## 6. 变更前检查清单

进入实现前，至少检查以下问题：

- 是否影响首页页面结构、组件职责或状态流
- 是否影响当前阶段、目标或禁止事项
- 是否影响 mock 数据字段、记录规模或数据目录
- 是否影响脚本命令、运行方式或验证步骤
- 是否需要同步 `README.md`
- 是否影响协作规则，从而需要同步 `AGENTS.md`
- 是否新增了专题文档；若有，是否已先挂到本文件

若任一答案为“是”，先更新文档再改实现。

## 7. 当前架构摘要

当前首页采用以下结构：

- `src/App.tsx`
  - 挂载 theme、`CssBaseline`、`DogCatalogProvider`
- `src/context/`
  - 负责页面共享浏览状态
- `src/hooks/`
  - 负责读取 `dogs.json` 与派生统计资料
- `src/components/home/`
  - 负责首页各展示区块
- `src/data/`
  - 负责品种视觉与文案配置
- `src/public/data/`
  - 负责 `dogs.json` 与 `dogs.csv`

更详细的组件边界与状态流请看 `docs/architecture.md` 与 `docs/homepage-component-contracts.md`。

## 8. 文档维护原则

- 先在专题文档写清楚边界，再进入实现。
- 避免把同一条规则复制到三份文档中长期漂移。
- `README.md` 负责摘要，不负责承载所有实现细节。
- `AGENTS.md` 负责约束，不负责解释所有背景。
- 新增文档时，必须同时更新本文件与 `docs/documentation-structure.md`。
