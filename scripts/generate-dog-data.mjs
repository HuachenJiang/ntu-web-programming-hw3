import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, "../src/public/data");

const breeds = [
  {
    key: "比熊",
    code: "bichon",
    names: ["棉花糖", "白玉", "雪球", "奶酪", "麻糬", "豆花", "糖糖", "米露", "沐沐", "小圓", "泡芙", "露比"],
    colors: ["奶白", "雪白", "米白"],
    personalities: ["親人黏人", "安靜溫柔", "愛撒嬌", "喜歡陪伴"],
  },
  {
    key: "边牧",
    code: "border-collie",
    names: ["阿諾", "閃電", "小黑", "星塵", "球球", "海鹽", "初一", "七七", "麥芽", "豆丁", "凱西", "布魯"],
    colors: ["黑白", "咖白", "三色"],
    personalities: ["聰明機警", "精力旺盛", "喜歡訓練", "互動感強"],
  },
  {
    key: "泰迪",
    code: "poodle",
    names: ["可可", "奶茶", "栗子", "可頌", "布丁", "毛豆", "小卷", "芋泥", "暖暖", "可樂", "QQ", "艾比"],
    colors: ["棕色", "深咖", "杏色"],
    personalities: ["活潑外向", "容易親近", "好奇心強", "反應靈敏"],
  },
  {
    key: "柯基",
    code: "corgi",
    names: ["短腿", "阿餅", "多比", "咪嚕", "旺財", "小麥", "糯米", "肉鬆", "柚子", "福寶", "卡布", "拿鐵"],
    colors: ["黃白", "赤白", "三色"],
    personalities: ["友善開朗", "愛玩玩具", "表情豐富", "喜歡散步"],
  },
  {
    key: "柴犬",
    code: "shiba",
    names: ["阿柴", "福丸", "橘子", "豆柴", "麻吉", "丸子", "太陽", "和果", "小暖", "千歲", "可米", "豆腐"],
    colors: ["赤色", "黑柴", "胡麻"],
    personalities: ["獨立穩定", "熟了很黏", "警覺性高", "有自己的節奏"],
  },
  {
    key: "米克斯",
    code: "mixed",
    names: ["小虎", "阿勇", "妞妞", "小吉", "斑比", "勇者", "阿棕", "橘福", "小葉", "阿布", "小滿", "平安"],
    colors: ["虎斑", "黑褐", "米黃", "白底花"],
    personalities: ["適應力強", "忠誠可靠", "慢熟貼心", "穩重懂事"],
  },
  {
    key: "黄金猎犬",
    code: "golden-retriever",
    names: ["阿金", "陽光", "小麥", "哈尼", "森森", "巴迪", "球寶", "果醬", "點點", "歐文", "皮皮", "晴天"],
    colors: ["淺金", "金色", "奶油金"],
    personalities: ["溫和親切", "喜歡陪小孩", "愛互動", "穩定好相處"],
  },
  {
    key: "拉布拉多",
    code: "labrador",
    names: ["阿拉", "黑糖", "奶油", "卡卡", "拿拿", "泡泡", "勇寶", "阿肥", "布朗", "皮蛋", "星星", "芒果"],
    colors: ["米黃", "黑色", "巧克力"],
    personalities: ["外向可靠", "愛玩水", "服從性高", "喜歡陪伴"],
  },
];

const cities = ["台北", "新北", "桃園", "台中", "台南", "高雄", "新竹", "基隆"];

const csvColumns = [
  "id",
  "name",
  "breed",
  "ageYears",
  "gender",
  "weightKg",
  "coatColor",
  "personality",
  "vaccinated",
  "neutered",
  "city",
  "description",
  "adoptionStatus",
];

function quoteCsv(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

const dogs = breeds.flatMap((breed, breedIndex) =>
  breed.names.map((name, dogIndex) => {
    const ageYears = Number((1 + ((breedIndex + dogIndex) % 9) * 0.5).toFixed(1));
    const gender = dogIndex % 2 === 0 ? "male" : "female";
    const weightKg = Number((4.5 + breedIndex * 1.8 + (dogIndex % 4) * 1.3).toFixed(1));
    const coatColor = breed.colors[dogIndex % breed.colors.length];
    const personality = breed.personalities[dogIndex % breed.personalities.length];
    const vaccinated = dogIndex % 5 !== 0;
    const neutered = dogIndex % 3 !== 0;
    const city = cities[(breedIndex + dogIndex) % cities.length];
    const id = `${breed.code}-${String(dogIndex + 1).padStart(2, "0")}`;
    const description = `${name}是一隻${personality}的${breed.key}，目前在${city}等待新的家庭，已完成基礎救援安置。`;

    return {
      id,
      name,
      breed: breed.key,
      ageYears,
      gender,
      weightKg,
      coatColor,
      personality,
      vaccinated,
      neutered,
      city,
      description,
      adoptionStatus: "available",
    };
  }),
);

const csvContent = [
  csvColumns.join(","),
  ...dogs.map((dog) => csvColumns.map((column) => quoteCsv(dog[column])).join(",")),
].join("\n");

await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, "dogs.json"), `${JSON.stringify(dogs, null, 2)}\n`, "utf8");
await writeFile(path.join(outputDir, "dogs.csv"), `${csvContent}\n`, "utf8");

console.log(`Generated ${dogs.length} dog records into ${outputDir}`);

