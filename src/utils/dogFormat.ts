import type { DogRecord } from "../types/dog";

export function formatGender(gender: DogRecord["gender"]) {
  return gender === "male" ? "男生" : "女生";
}

export function formatProcedure(
  done: boolean,
  positive: string,
  pending: string,
) {
  return done ? positive : pending;
}
