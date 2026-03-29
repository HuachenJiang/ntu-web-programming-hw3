import { getDogCatalogData } from "../utils/getDogCatalogData";
import type { BreedKey } from "../types/dog";

export function useDogCatalogData(selectedBreed: BreedKey) {
  // 静态资料仍以 utils 纯函数为唯一派生来源；hook 只负责把它接入页面层。
  return getDogCatalogData(selectedBreed);
}
