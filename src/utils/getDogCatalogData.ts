import dogsData from "../public/data/dogs.json";
import { BREED_META } from "../data/breedMeta";
import type { BreedKey, DogRecord } from "../types/dog";

const dogs = dogsData as DogRecord[];

export function getDogCatalogData(selectedBreed: BreedKey) {
  const currentDogs = dogs.filter((dog) => dog.breed === selectedBreed);
  const currentMeta = BREED_META[selectedBreed];
  const currentDogCount = currentDogs.length;
  const totalDogs = dogs.length;
  const cityCount = new Set(dogs.map((dog) => dog.city)).size;
  const vaccinatedCount = currentDogs.filter((dog) => dog.vaccinated).length;
  const neuteredCount = currentDogs.filter((dog) => dog.neutered).length;
  const averageAge =
    totalDogs === 0
      ? "0.0"
      : (dogs.reduce((sum, dog) => sum + dog.ageYears, 0) / totalDogs).toFixed(1);

  return {
    totalDogs,
    currentDogs,
    currentMeta,
    currentDogCount,
    cityCount,
    vaccinatedCount,
    neuteredCount,
    averageAge,
  };
}
