# Architecture

本文件定义当前首页的实现规范，不只是说明目录，而是明确哪些层负责什么、哪些层不该做什么。

## 1. 当前架构目标

首页当前只解决一件事：把 `dogs.json` 中的静态资料，以稳定、可扩充的浏览结构展示出来。

实现目标：

- 让使用者先从首页理解救援犬资料
- 透过品种切换浏览不同狗狗
- 保持组件职责清楚，便于后续扩充

非目标：

- 承接领养提交流程
- 建立复杂筛选/排序系统
- 串接后端或登入状态

## 2. 首页信息架构

首页由以下区块组成：

1. `HomeHero`
   - 首页主视觉与全站级摘要数字
2. `BreedInsightPanel`
   - 当前品种焦点说明与辅助统计
3. `HomeCatalogSection`
   - 分类浏览主容器
4. `BreedTabs`
   - 品种切换入口
5. `CatalogOverview`
   - 当前分类的二次说明与显示状态摘要
6. `DogGrid`
   - 当前品种卡片列表容器
7. `DogCard`
   - 单一狗狗资料卡片

页面应维持“先给全站理解，再给当前品种理解，最后进入单卡片阅读”的阅读顺序。

## 3. 分层规范

### App Shell

- `src/main.tsx`
  - 只负责挂载应用
- `src/App.tsx`
  - 只负责挂载 theme、baseline、provider、页面入口
  - 不负责读取数据
  - 不负责写首页业务判断

### State Layer

- `src/context/DogCatalogContext.tsx`
  - 是首页页面级共享状态的唯一入口
  - 负责暴露 `selectedBreed` 与已派生好的展示资料

### Static Config Layer

- `src/types/dog.ts`
  - 定义数据契约与品种枚举
- `src/data/breedMeta.ts`
  - 定义品种视觉配置与说明文案
- `src/utils/getDogCatalogData.ts`
  - 是当前首页展示数据的唯一派生入口
  - 负责读取 `src/public/data/dogs.json`
  - 负责计算当前品种资料、当前品种辅助统计与首页全站摘要统计
- `src/utils/dogFormat.ts`
  - 定义可复用的格式化逻辑

### UI Layer

- `src/components/home/`
  - 负责展示与组合
  - 不负责直接读档
  - 不负责自行推导与复制复杂统计

## 4. 状态流规范

当前首页的页面级浏览状态只有一个：

- `selectedBreed`

当前首页的数据流必须维持以下顺序：

1. `dogs.json` 作为静态输入
2. `getDogCatalogData(selectedBreed)` 负责派生
3. `DogCatalogProvider` 统一透出页面所需资料
4. 首页组件通过 `useDogCatalog()` 消费

固定规则：

- `dogs.json` 是当前首页展示数据唯一来源
- `selectedBreed` 是当前唯一页面级浏览状态
- 统计值必须在纯函数派生层完成，不在组件内重复计算
- 展示组件不得各自复制筛选逻辑

## 5. 组件职责与非职责

### 允许做派生计算的层

- `utils` 中的纯函数
- 少量纯格式化工具函数

### 允许维护页面级共享状态的层

- `context`

### 不允许直接引入 `dogs.json` 的层

- `src/components/home/` 下的所有展示组件

### 展示组件的固定约束

- 可以读取 context
- 可以接收 props
- 可以做轻量展示判断
- 不应自行读取静态资料文件
- 不应在组件内部创建新的页面级状态协议

详细契约见 `docs/homepage-component-contracts.md`。

## 6. 目录职责约定

| 目录 | 责任 | 不负责 |
| --- | --- | --- |
| `src/components/` | 展示与组合 | 数据源读取、复杂派生 |
| `src/context/` | 共享页面状态与聚合资料暴露 | 原始数据定义 |
| `src/utils/` | 纯函数派生与格式化工具 | 页面级状态维护 |
| `src/data/` | 静态配置与文案 | 运行时状态 |
| `src/public/data/` | mock 数据产物 | 展示逻辑 |

## 7. 扩充边界

未来若新增功能，优先遵守以下原则：

- 新增筛选或排序时，先扩充页面级规范，不要直接把逻辑塞进 `BreedTabs`、`DogGrid` 或 `DogCard`
- 新增领养流程时，应独立定义新状态流与页面边界，不复用 `DogCard` 直接承接流程逻辑
- 新增后端串接时，应增加独立 data access / service 层，而不是让展示组件直接发请求
- 新增页面时，按页面或功能建立新的组件分组，而不是继续把所有逻辑堆进 `home/`

## 8. 文档接口约定

从现在开始，首页核心组件在文档中必须写清楚：

- 输入依赖
- 是否依赖 context
- 是否允许持有本地状态
- 展示职责
- 不负责什么

组件修改前，应先检查 `docs/homepage-component-contracts.md` 是否需要同步更新。
