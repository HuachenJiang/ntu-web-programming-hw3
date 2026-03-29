# Data Model

本文件定义当前阶段 mock 数据的来源、字段契约、允许值来源与同步更新规则。

## 1. 资料来源与产物

当前前端展示直接读取：

- `src/public/data/dogs.json`

同时维护一份便于人工检查的表格产物：

- `src/public/data/dogs.csv`

两份档案必须保持：

- 相同记录数量
- 相同字段结构
- 相同记录顺序
- 相同语义内容

## 2. 生成与验证脚本

- `scripts/generate-dog-data.mjs`
  - 生成 `dogs.json` 与 `dogs.csv`
- `scripts/verify-dog-data.mjs`
  - 验证两份资料产物是否一致

若脚本输入、输出路径或生成逻辑发生变化，必须先更新本文件与 `README.md`。

## 3. 字段定义

当前 `dogs.json` / `dogs.csv` 直接符合 `src/types/dog.ts` 中的 `DogRecord`；不再区分原始资料型别与展示型别，生成资料时就要写成 UI 可直接消费的结构。

| 字段 | 型别 | 说明 |
| --- | --- | --- |
| `id` | `string` | 唯一编号 |
| `name` | `string` | 狗狗名字 |
| `breed` | `BreedKey` | 品种，必须属于 `BREEDS` |
| `ageYears` | `number` | 年龄（岁） |
| `gender` | `"男生" \| "女生"` | 性别展示文案，在生成资料时就固定 |
| `weightKg` | `number` | 体重（公斤） |
| `coatColor` | `string` | 毛色 |
| `personality` | `string` | 性格标签 |
| `vaccinated` | `boolean` | 是否已完成疫苗，保留给统计与后续扩充使用 |
| `neutered` | `boolean` | 是否已绝育，保留给统计与后续扩充使用 |
| `vaccinationStatus` | `"已完成疫苗纪录" \| "待补疫苗纪录"` | 疫苗展示文案，在生成资料时就固定 |
| `neuteredStatus` | `"已完成绝育" \| "绝育状态待更新"` | 绝育展示文案，在生成资料时就固定 |
| `city` | `string` | 当前所在城市 |
| `description` | `string` | 简短介绍 |
| `adoptionStatus` | `"available" \| "locked" \| "adopted"` | 当前领养状态；`dogs.json` 初始值仍为 `available`，互动后由前端 session 覆写 |

## 4. 允许值来源

以下字段的允许值来源必须固定：

| 字段 | 允许值来源 |
| --- | --- |
| `breed` | `src/types/dog.ts` 中的 `BREEDS` |
| `gender` | `scripts/generate-dog-data.mjs` 中固定生成的中文展示文案 |
| `adoptionStatus` | `src/types/dog.ts` 中的 `AdoptionStatus` |
| 品种视觉/说明延伸资料 | `src/data/breedMeta.ts` |
| `vaccinationStatus` / `neuteredStatus` | `scripts/generate-dog-data.mjs` 中固定生成的展示文案 |

展示型文本约定：

- `breed` 使用既定中文品种值
- `gender`、`vaccinationStatus`、`neuteredStatus` 固定为中文展示文案，组件不再重复判断
- 展示型文本字段统一使用简体中文
- 当前城市资料来自固定城市列表，不做用户输入
- `locked` 与 `adopted` 的最终展示文案由 UI 组件统一决定，不直接写入资料档中的中文文案字段

## 5. 当前资料规模

- 8 个品种
- 每个品种 12 只狗
- 共 96 条记录

当前品种清单：

- 比熊
- 边牧
- 泰迪
- 柯基
- 柴犬
- 米克斯
- 黄金猎犬
- 拉布拉多

## 6. 同步更新点

当以下内容变化时，必须先更新本文件，再修改代码：

| 变化内容 | 还需要同步更新 |
| --- | --- |
| `DogRecord` 字段新增、删除、改名 | `README.md`、相关类型定义、生成脚本、消费该字段的组件/工具 |
| 字段型别变化 | `README.md`、相关类型定义、消费该字段的组件/工具 |
| 品种枚举变化 | `README.md`、`src/types/dog.ts`、`src/data/breedMeta.ts` |
| 资料目录变化 | `README.md`、脚本路径说明 |
| 脚本输入输出变化 | `README.md`、`docs/development.md` |
| 记录规模变化 | `README.md`、生成脚本说明 |

## 7. 当前阶段限制

当前 `dogs.json` / `dogs.csv` 中的 `adoptionStatus` 初始值仍为 `available`，但首页允许在前端 session 中把状态覆写为：

- `available`
- `locked`
- `adopted`

状态规则：

- 加入待认养区后，该狗在当前 session 内视为 `locked`
- 从待认养区单只放弃后，若尚未确认领养，则回到 `available`
- 确认领养后，该狗在当前 session 内视为 `adopted`
- 前端互动状态不反写 `dogs.json` / `dogs.csv`

若未来要加入更多状态，例如：

- 已送养
- 待审核
- 暂停开放

必须先在本文件写清楚：

- 状态定义
- 来源
- 展示规则
- 需要同步更新的类型与组件

然后才能进入实现。
