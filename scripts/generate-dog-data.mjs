import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 资料产物固定输出到公开静态目录，供后续前端直接读取。
const outputDir = path.resolve(__dirname, "../src/public/data");

// 这份设定是当前阶段 mock 资料的主要来源，调整内容时要同步 docs/data-model.md 与 src/types/dog.ts。
const breeds = [
  {
    key: "比熊",
    code: "bichon",
    names: ["棉花糖", "白玉", "雪球", "奶酪", "麻糬", "豆花", "糖糖", "米露", "沐沐", "小圆", "泡芙", "露比"],
    colors: ["奶白", "雪白", "米白"],
    personalities: ["亲人黏人", "安静温柔", "爱撒娇", "喜欢陪伴"],
  },
  {
    key: "边牧",
    code: "border-collie",
    names: ["阿诺", "闪电", "小黑", "星尘", "球球", "海盐", "初一", "七七", "麦芽", "豆丁", "凯西", "布鲁"],
    colors: ["黑白", "咖白", "三色"],
    personalities: ["聪明机警", "精力旺盛", "喜欢训练", "互动感强"],
  },
  {
    key: "泰迪",
    code: "poodle",
    names: ["可可", "奶茶", "栗子", "可颂", "布丁", "毛豆", "小卷", "芋泥", "暖暖", "可乐", "QQ", "艾比"],
    colors: ["棕色", "深咖", "杏色"],
    personalities: ["活泼外向", "容易亲近", "好奇心强", "反应灵敏"],
  },
  {
    key: "柯基",
    code: "corgi",
    names: ["短腿", "阿饼", "多比", "咪噜", "旺财", "小麦", "糯米", "肉松", "柚子", "福宝", "卡布", "拿铁"],
    colors: ["黄白", "赤白", "三色"],
    personalities: ["友善开朗", "爱玩玩具", "表情丰富", "喜欢散步"],
  },
  {
    key: "柴犬",
    code: "shiba",
    names: ["阿柴", "福丸", "橘子", "豆柴", "麻吉", "丸子", "太阳", "和果", "小暖", "千岁", "可米", "豆腐"],
    colors: ["赤色", "黑柴", "胡麻"],
    personalities: ["独立稳定", "熟了很黏", "警觉性高", "有自己的节奏"],
  },
  {
    key: "米克斯",
    code: "mixed",
    names: ["小虎", "阿勇", "妞妞", "小吉", "斑比", "勇者", "阿棕", "橘福", "小叶", "阿布", "小满", "平安"],
    colors: ["虎斑", "黑褐", "米黄", "白底花"],
    personalities: ["适应力强", "忠诚可靠", "慢熟贴心", "稳重懂事"],
  },
  {
    key: "黄金猎犬",
    code: "golden-retriever",
    names: ["阿金", "阳光", "小麦", "哈尼", "森森", "巴迪", "球宝", "果酱", "点点", "欧文", "皮皮", "晴天"],
    colors: ["浅金", "金色", "奶油金"],
    personalities: ["温和亲切", "喜欢陪小孩", "爱互动", "稳定好相处"],
  },
  {
    key: "拉布拉多",
    code: "labrador",
    names: ["阿拉", "黑糖", "奶油", "卡卡", "拿拿", "泡泡", "勇宝", "阿肥", "布朗", "皮蛋", "星星", "芒果"],
    colors: ["米黄", "黑色", "巧克力"],
    personalities: ["外向可靠", "爱玩水", "服从性高", "喜欢陪伴"],
  },
];

// 轮替城市只为了让样本更接近真实列表分布，不代表未来真实资料来源格式。
const cities = ["台北", "新北", "桃园", "台中", "台南", "高雄", "新竹", "基隆"];

// CSV 欄位顺序必须与 JSON 结构保持同一份契约，方便后续比对与匯入。
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
  "vaccinationStatus",
  "neuteredStatus",
  "city",
  "description",
  "adoptionStatus",
];

function quoteCsv(value) {
  // 统一处理双引号转义，避免说明文字中的标点破坏 CSV 结构。
  return `"${String(value).replaceAll('"', '""')}"`;
}

const dogs = breeds.flatMap((breed, breedIndex) =>
  breed.names.map((name, dogIndex) => {
    // 使用可预测的规则产生资料，目的是让 JSON / CSV 能稳定重建并保持易于 diff。
    const ageYears = Number((1 + ((breedIndex + dogIndex) % 9) * 0.5).toFixed(1));
    const gender = dogIndex % 2 === 0 ? "男生" : "女生";
    const weightKg = Number((4.5 + breedIndex * 1.8 + (dogIndex % 4) * 1.3).toFixed(1));
    const dogName = name;
    const breedName = breed.key;
    const coatColor = breed.colors[dogIndex % breed.colors.length];
    const personality = breed.personalities[dogIndex % breed.personalities.length];
    const vaccinated = dogIndex % 5 !== 0;
    const neutered = dogIndex % 3 !== 0;
    const vaccinationStatus = vaccinated ? "已完成疫苗纪录" : "待补疫苗纪录";
    const neuteredStatus = neutered ? "已完成绝育" : "绝育状态待更新";
    const city = cities[(breedIndex + dogIndex) % cities.length];
    const id = `${breed.code}-${String(dogIndex + 1).padStart(2, "0")}`;
    const description = `${dogName}是一只${personality}的${breedName}，目前在${city}等待新的家庭，已完成基础救援安置。`;

    return {
      id,
      name: dogName,
      breed: breedName,
      ageYears,
      gender,
      weightKg,
      coatColor,
      personality,
      vaccinated,
      neutered,
      vaccinationStatus,
      neuteredStatus,
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
