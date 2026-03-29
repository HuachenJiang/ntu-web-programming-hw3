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
- 本阶段首页组件可以承载轻量领养动作流程，但不负责真实业务提交
- 首页上的说明文字只保留资料阅读必要信息，不展示项目阶段说明、未来规划或未实作功能提示

## 3. 组件契约

### `HomePage`

- 组件目的：作为首页最外层布局，组合 hero、insight、catalog、底部结算区与成功弹窗。
- 直接依赖的数据：无直接数据 props；透过子组件消费 context。
- 是否依赖 context：间接依赖。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：决定首页顶层布局、背景装饰、主要区块顺序与底部结算区的挂载位置。
- 非责任范围：不负责资料读取、不负责筛选逻辑、不负责单卡片展示细节。
- 修改时必须同步检查的文档：`docs/architecture.md`、`README.md`

### `HomeHero`

- 组件目的：展示首页主视觉与全站级摘要数字。
- 直接依赖的数据：`totalDogs`、`cityCount`、`averageAge`
- 是否依赖 context：是。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：提供首页第一屏标题与全域摘要，不额外承载项目说明段落。
- 非责任范围：不负责当前品种切换、不负责卡片列表、不负责领养确认动作。
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

- 组件目的：作为分类浏览主区域容器，安排 tabs、overview 与菜单式卡片浏览区的阅读顺序。
- 直接依赖的数据：无直接数据 props；由内部子组件消费 context。
- 是否依赖 context：间接依赖。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：组织分类浏览区块结构、文案层级与可滚动狗狗资料区，并以产品导向标题直接引导使用者开始浏览与挑选狗狗，同时在标题右侧挂载“已认领狗狗”入口与对应的右侧抽屉。
- 非责任范围：不负责筛选计算、不负责渲染单卡片细节、不负责写入领养状态。
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

- 组件目的：对当前分类内容做二次摘要，强调本区块的阅读用途与当前浏览状态。
- 直接依赖的数据：`selectedBreed`、`currentDogs`、`currentMeta`、`pendingAdoptionCount`
- 是否依赖 context：是。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：补充当前品种说明、当前显示数量与待认养中的即时摘要，不展示未开放功能的占位说明。
- 非责任范围：不负责品种切换、不负责单卡片格式化、不负责新增交互流程。
- 修改时必须同步检查的文档：`docs/architecture.md`、`docs/homepage-component-contracts.md`

### `DogGrid`

- 组件目的：以菜单式可滚动容器渲染当前品种下的卡片列表。
- 直接依赖的数据：`currentDogs`、`currentMeta`、领养动作
- 是否依赖 context：是。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：控制当前列表迭代、卡片排列容器与区块内滚动体验，并把单卡片需要的视觉与动作依赖透过 props 传下去。
- 非责任范围：不负责读取原始数据、不负责卡片内容细节、不负责复杂分页或虚拟滚动策略。
- 修改时必须同步检查的文档：`docs/architecture.md`、`docs/homepage-component-contracts.md`

### `DogCard`

- 组件目的：展示单只狗狗的资料卡片。
- 直接依赖的数据：展示就绪的 `dog` prop、`accent`、领养动作回调
- 是否依赖 context：否；主体资料、视觉色与动作都由上层透过 props 提供。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：展示名字、品种、性别、年龄、体重、性格、城市、健康状态、毛色与当前领养状态，并提供“做TA的主人”入口。
- 非责任范围：不负责收藏、不负责弹窗详情、不负责资料筛选，也不负责把资料字段再转换成展示文案。
- 修改时必须同步检查的文档：`docs/architecture.md`、`docs/homepage-component-contracts.md`、`README.md`

### `AdoptionCheckoutBar`

- 组件目的：作为首页底部吸附式待认养结算区，承接待认养摘要、展开清单与整单确认入口。
- 直接依赖的数据：`pendingDogs`、`pendingAdoptionCount`、`adoptedDogs`、`adoptedDogCount`、`remainingAdoptionSlots`、`isCheckoutExpanded`、结算动作与展开动作。
- 是否依赖 context：是。
- 是否允许持有本地状态：允许极少量表现型本地状态；待认养资料与结算状态仍以 context 为准。
- 输出的 UI 责任：作为容器组件读取 context，在页面底部挂载摘要头、待认养列表/空态、已认领摘要与底部确认区等展示子块，并明确显示本次剩余可认领名额。
- 非责任范围：不负责读取原始数据、不负责改写静态资料源、不负责成功反馈展示细节。
- 修改时必须同步检查的文档：`docs/architecture.md`、`docs/homepage-component-contracts.md`

### `AdoptionCheckoutBar` 内部展示子块

- 组件目的：承接 `AdoptionCheckoutBar` 拆出的摘要头、待认养列表/空态与底部确认区。
- 直接依赖的数据：由 `AdoptionCheckoutBar` 透过 props 传入，不直接读取 context。
- 是否依赖 context：否。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：只负责各自区块的显示与触发回调。
- 非责任范围：不负责定义新的页面级状态协议，不负责读取原始资料来源。
- 修改时必须同步检查的文档：`docs/architecture.md`、`docs/homepage-component-contracts.md`

### `AdoptedDogsDrawer`

- 组件目的：作为首页右侧抽屉，集中展示当前 session 内已认领的狗狗清单。
- 直接依赖的数据：`adoptedDogs`、`adoptedDogCount`、`isAdoptedDrawerOpen`、关闭动作。
- 是否依赖 context：是。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：在不打断当前分类浏览上下文的前提下，从右侧抽屉展示本人已认领的狗狗资料摘要与状态标签。
- 非责任范围：不负责修改已认领结果、不负责重新分配认领名额、不负责管理待认养清单。
- 修改时必须同步检查的文档：`docs/architecture.md`、`docs/homepage-component-contracts.md`

### `AdoptionSuccessDialog`

- 组件目的：在确认领养后提供暖心的完成反馈。
- 直接依赖的数据：`isSuccessDialogOpen`、最近一次确认领养的狗狗数量或名单摘要、关闭动作。
- 是否依赖 context：是。
- 是否允许持有本地状态：不允许。
- 输出的 UI 责任：展示“感谢您的认领”等成功文案，并在关闭后把用户带回首页当前浏览上下文。
- 非责任范围：不负责写入领养状态、不负责待认养清单管理、不负责真实订单流程。
- 修改时必须同步检查的文档：`docs/architecture.md`、`docs/homepage-component-contracts.md`

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
