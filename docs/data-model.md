# 数据模型

## 目录约定

- 资料产物统一输出到 `src/public/data/`。
- 当前阶段同时维护 `dogs.json` 与 `dogs.csv` 两份文件。
- 两份文件必须保持记录数量、字段结构、记录顺序与语义一致。

## 记录规模

- 品种数量：8
- 每个品种：12 笔
- 总记录数：96 笔

## 字段契约

| 字段 | 型别 | 说明 | 允许值 / 备注 |
| --- | --- | --- | --- |
| `id` | `string` | 唯一编号 | 由品种代码与流水号组成，例如 `bichon-01` |
| `name` | `string` | 狗狗名字 | 简体中文文案 |
| `breed` | `string` | 品种名称 | 必须属于既定 8 个品种 |
| `ageYears` | `number` | 年龄（岁） | 允许小数，当前脚本产出 1.0 到 5.0 |
| `gender` | `"male" \| "female"` | 性别 | 保留英文枚举，方便后续程式判断 |
| `weightKg` | `number` | 体重（公斤） | 允许小数 |
| `coatColor` | `string` | 毛色 | 简体中文文案 |
| `personality` | `string` | 性格标签 | 简体中文文案 |
| `vaccinated` | `boolean` | 是否已完成疫苗 | 布林值 |
| `neutered` | `boolean` | 是否已绝育 | 布林值 |
| `city` | `string` | 当前所在城市 | 简体中文文案 |
| `description` | `string` | 简短介绍 | 简体中文文案 |
| `adoptionStatus` | `"available"` | 领养状态 | 当前阶段固定为 `available` |

## 允许值

- 品种仅允许：`比熊`、`边牧`、`泰迪`、`柯基`、`柴犬`、`米克斯`、`黄金猎犬`、`拉布拉多`。
- `adoptionStatus` 当前阶段仅允许 `available`。
- 展示型文字字段统一使用简体中文；枚举判断字段维持英文值。

## 同步更新点

- 字段、允许值或记录规模变更时，必须先更新本文。
- 更新本文后，再同步 `README.md` 摘要、`src/types/dog.ts` 与相关脚本。
- 若变更影响阶段范围，也要同步更新 `docs/spec.md`。
