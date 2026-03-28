# Homepage Component Contracts

本文件定义首页核心组件的文档契约。目标不是解释 UI 长什么样，而是明确每个组件的输入依赖、职责边界与禁止扩张的方向。

## 1. 使用方式

当你准备修改首页组件时，先看本文件，再看 `docs/architecture.md`。

每个组件的文档契约固定包含：

- 组件目的
- 直接依赖的数据
- 是否依赖 context
- 是否允许持有本地状态
- 输出的 UI 责任
- 非责任范围
- 修改时必须同步检查的文档

## 2. 通用约束

首页展示组件统一遵守以下规则：

- 不直接读取 `dogs.json`
- 只有 hook / context 层负责资料选择与派生
- 展示组件可以消费 context，但不能复制数据协议
- 本阶段首页组件不承载领养动作流程

## 3. 组件契约

### `HomePage`

- 组件目的：作为首页最外层布局，组合 hero、insight 与 catalog 区块。
- 直接依赖的数据：无直接数据 props；透过子组件消费 context。
- 是否依赖 context：间接依赖。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：决定首页顶层布局、背景装饰与主要区块顺序。
- 非责任范围：不负责资料读取、不负责筛选逻辑、不负责单卡片展示细节。
- 修改时必须同步检查的文档：`docs/architecture.md`、`README.md`

### `HomeHero`

- 组件目的：展示首页主视觉与全站级摘要数字。
- 直接依赖的数据：`totalDogs`、`cityCount`、`averageAge`
- 是否依赖 context：是。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：提供首页第一屏价值说明与全域摘要。
- 非责任范围：不负责当前品种切换、不负责卡片列表、不负责领养动作。
- 修改时必须同步检查的文档：`docs/architecture.md`、`docs/homepage-component-contracts.md`

### `BreedInsightPanel`

- 组件目的：展示当前选中品种的情绪描述、摘要与辅助统计。
- 直接依赖的数据：`selectedBreed`、`currentMeta`、`currentDogCount`、`vaccinatedCount`、`neuteredCount`
- 是否依赖 context：是。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：帮助使用者在进入卡片区前先理解当前品种的整体气质与资料规模。
- 非责任范围：不负责切换品种入口、不负责卡片列表渲染、不负责新增业务状态。
- 修改时必须同步检查的文档：`docs/architecture.md`、`docs/homepage-component-contracts.md`

### `HomeCatalogSection`

- 组件目的：作为分类浏览主区域容器，安排 tabs、overview 与 grid 的阅读顺序。
- 直接依赖的数据：无直接数据 props；由内部子组件消费 context。
- 是否依赖 context：间接依赖。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：组织分类浏览区块结构与文案层级。
- 非责任范围：不负责筛选计算、不负责渲染单卡片、不负责流程型操作。
- 修改时必须同步检查的文档：`docs/architecture.md`、`README.md`

### `BreedTabs`

- 组件目的：作为当前首页唯一的品种切换入口。
- 直接依赖的数据：`breeds`、`selectedBreed`、`setSelectedBreed`、`BREED_META`
- 是否依赖 context：是。
- 是否允许持有本地状态：不允许；当前切换状态统一由 context 管理。
- 输出的 UI 责任：渲染品种 tabs，并更新当前浏览品种。
- 非责任范围：不负责复杂筛选、不负责排序、不负责写入其他页面状态。
- 修改时必须同步检查的文档：`docs/architecture.md`、`docs/change-workflow.md`

### `CatalogOverview`

- 组件目的：对当前分类内容做二次摘要，强调本区块的阅读用途。
- 直接依赖的数据：`selectedBreed`、`currentDogs`、`currentMeta`
- 是否依赖 context：是。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：补充当前品种说明与当前显示数量。
- 非责任范围：不负责品种切换、不负责单卡片格式化、不负责新增交互流程。
- 修改时必须同步检查的文档：`docs/architecture.md`、`docs/homepage-component-contracts.md`

### `DogGrid`

- 组件目的：渲染当前品种下的卡片列表。
- 直接依赖的数据：`currentDogs`
- 是否依赖 context：是。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：控制当前列表迭代与卡片排列容器。
- 非责任范围：不负责读取原始数据、不负责卡片内容细节、不负责分页或虚拟滚动策略。
- 修改时必须同步检查的文档：`docs/architecture.md`、`docs/homepage-component-contracts.md`

### `DogCard`

- 组件目的：展示单只狗狗的资料卡片。
- 直接依赖的数据：`dog` prop、`currentMeta`
- 是否依赖 context：是，仅读取当前品种视觉设定；主体资料来自 prop。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：展示名字、品种、性别、年龄、体重、性格、城市、健康状态与毛色。
- 非责任范围：不负责领养按钮流程、不负责收藏、不负责弹窗详情、不负责资料筛选。
- 修改时必须同步检查的文档：`docs/architecture.md`、`docs/homepage-component-contracts.md`、`README.md`

## 4. 修改模板

若未来新增首页组件或调整现有组件，请至少补齐以下文档字段：

| 字段 | 必填说明 |
| --- | --- |
| 组件目的 | 它存在是为了解决什么展示问题 |
| 直接依赖的数据 | props、context、静态配置来源 |
| 是否依赖 context | 是 / 否 / 间接依赖 |
| 是否允许持有本地状态 | 允许或不允许，并写清范围 |
| 输出的 UI 责任 | 它负责呈现的内容 |
| 非责任范围 | 明确不要让它承担什么 |
| 同步检查文档 | 变更时至少需要看哪些文件 |
