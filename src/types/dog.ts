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

export type AdoptionStatus = "available";

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

