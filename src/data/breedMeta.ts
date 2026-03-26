import type { BreedKey } from "../types/dog";

export interface BreedMeta {
  accent: string;
  wash: string;
  mood: string;
  summary: string;
}

export const BREED_META: Record<BreedKey, BreedMeta> = {
  比熊: {
    accent: "#d9783d",
    wash: "#fff4e6",
    mood: "亲人柔软，适合把家里变成棉花糖气氛。",
    summary: "比熊组以陪伴感见长，适合偏好温和互动的家庭。",
  },
  边牧: {
    accent: "#5670d8",
    wash: "#edf1ff",
    mood: "聪明警觉，适合喜欢高互动与训练感的日常。",
    summary: "边牧组精力与学习力都很突出，适合活动量较高的家庭。",
  },
  泰迪: {
    accent: "#a55f4f",
    wash: "#fff1ec",
    mood: "灵活外向，整体气质更像会主动靠近人的小太阳。",
    summary: "泰迪组在亲近度与活泼感之间取得了很好的平衡。",
  },
  柯基: {
    accent: "#c46b1d",
    wash: "#fff4df",
    mood: "表情丰富，日常互动感很强，容易成为家中的焦点。",
    summary: "柯基组有稳定的陪伴感，也保留了鲜明个性。",
  },
  柴犬: {
    accent: "#b14d32",
    wash: "#fff0ea",
    mood: "独立里带一点倔强，适合喜欢慢慢培养默契的人。",
    summary: "柴犬组更强调性格魅力与建立关系后的信任感。",
  },
  米克斯: {
    accent: "#2f7d60",
    wash: "#edf9f3",
    mood: "生命经验更丰富，往往拥有很高的适应力。",
    summary: "米克斯组展现了救援犬最真实、也最耐看的个性层次。",
  },
  黄金猎犬: {
    accent: "#be8d17",
    wash: "#fff7df",
    mood: "稳定温暖，天生自带让空间松弛下来的气场。",
    summary: "黄金猎犬组拥有非常直观的治愈感与家庭友好度。",
  },
  拉布拉多: {
    accent: "#53655a",
    wash: "#eef4f0",
    mood: "可靠开朗，适合喜欢明确陪伴感与户外节奏的家庭。",
    summary: "拉布拉多组是兼具亲和力、体能与稳定性的经典选择。",
  },
};
