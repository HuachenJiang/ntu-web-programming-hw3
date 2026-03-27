// 这里的品种清单需要与 docs/data-model.md、mock 资料脚本与验证脚本同步维护。
export const BREEDS = [
  "比熊",
  "边牧",
  "泰迪",
  "柯基",
  "柴犬",
  "米克斯",
  "黄金猎犬",
  "拉布拉多",
] as const;

export type BreedKey = (typeof BREEDS)[number];

// 当前阶段只允许提供可领养中的占位状态，后续业务扩充时再放宽枚举。
export type AdoptionStatus = "available";

// 这个型别同时服务于静态资料与未来 UI 呈现，是前端读取 mock 数据的契约基线。
export interface DogRecord {
  id: string;
  name: string;
  breed: BreedKey;
  ageYears: number;
  gender: "male" | "female";
  weightKg: number;
  coatColor: string;
  personality: string;
  vaccinated: boolean;
  neutered: boolean;
  city: string;
  description: string;
  adoptionStatus: AdoptionStatus;
}
