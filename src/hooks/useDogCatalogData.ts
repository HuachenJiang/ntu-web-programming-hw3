import dogsData from "../public/data/dogs.json";
import { BREED_META } from "../data/breedMeta";
import type { BreedKey, DogRecord } from "../types/dog";

const dogs = dogsData as DogRecord[];

export function useDogCatalogData(selectedBreed: BreedKey) {
  const currentDogs = dogs.filter((dog) => dog.breed === selectedBreed);
  const currentMeta = BREED_META[selectedBreed];
  const cityCount = new Set(dogs.map((dog) => dog.city)).size;
  const vaccinatedCount = dogs.filter((dog) => dog.vaccinated).length;
  const neuteredCount = dogs.filter((dog) => dog.neutered).length;
  const averageAge = (
    dogs.reduce((sum, dog) => sum + dog.ageYears, 0) / dogs.length
  ).toFixed(1);

  return {
    dogs,
    currentDogs,
    currentMeta,
    totalDogs: dogs.length,
    cityCount,
    vaccinatedCount,
    neuteredCount,
    averageAge,
  };
}
