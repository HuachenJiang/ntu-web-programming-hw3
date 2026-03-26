import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "../src/public/data");

const expectedBreeds = new Set([
  "比熊",
  "边牧",
  "泰迪",
  "柯基",
  "柴犬",
  "米克斯",
  "黄金猎犬",
  "拉布拉多",
]);

const requiredFields = [
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

const jsonPath = path.join(dataDir, "dogs.json");
const csvPath = path.join(dataDir, "dogs.csv");

const jsonRaw = await readFile(jsonPath, "utf8");
const csvRaw = await readFile(csvPath, "utf8");
const dogs = JSON.parse(jsonRaw);

if (!Array.isArray(dogs)) {
  throw new Error("dogs.json must contain an array.");
}

if (dogs.length !== 96) {
  throw new Error(`Expected 96 records, received ${dogs.length}.`);
}

const ids = new Set();
for (const dog of dogs) {
  for (const field of requiredFields) {
    if (!(field in dog)) {
      throw new Error(`Missing field "${field}" in record ${JSON.stringify(dog)}.`);
    }
  }

  if (ids.has(dog.id)) {
    throw new Error(`Duplicate id found: ${dog.id}`);
  }
  ids.add(dog.id);

  if (!expectedBreeds.has(dog.breed)) {
    throw new Error(`Unexpected breed found: ${dog.breed}`);
  }

  if (dog.adoptionStatus !== "available") {
    throw new Error(`Unexpected adoption status in ${dog.id}: ${dog.adoptionStatus}`);
  }
}

const csvLines = csvRaw.trim().split("\n");
if (csvLines.length - 1 !== dogs.length) {
  throw new Error(`CSV row count mismatch: expected ${dogs.length}, received ${csvLines.length - 1}.`);
}

console.log("Data verification passed.");
console.log(`Total records: ${dogs.length}`);
console.log(`CSV rows: ${csvLines.length - 1}`);
