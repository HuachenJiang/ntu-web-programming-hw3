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

export type DogGender = "男生" | "女生";
export type VaccinationStatus = "已完成疫苗纪录" | "待补疫苗纪录";
export type NeuteredStatus = "已完成绝育" | "绝育状态待更新";

// 这个型别就是 dogs.json / dogs.csv 的单一资料契约，资料生成时就要满足 UI 展示需要。
export interface DogRecord {
  id: string;
  name: string;
  breed: BreedKey;
  ageYears: number;
  gender: DogGender;
  weightKg: number;
  coatColor: string;
  personality: string;
  vaccinated: boolean;
  neutered: boolean;
  vaccinationStatus: VaccinationStatus;
  neuteredStatus: NeuteredStatus;
  city: string;
  description: string;
  adoptionStatus: AdoptionStatus;
}
