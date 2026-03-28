import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { getDogCatalogData } from "../utils/getDogCatalogData";
import { BREEDS, type BreedKey } from "../types/dog";

interface DogCatalogContextValue {
  selectedBreed: BreedKey;
  setSelectedBreed: Dispatch<SetStateAction<BreedKey>>;
  breeds: readonly BreedKey[];
  currentDogCount: number;
  cityCount: number;
  vaccinatedCount: number;
  neuteredCount: number;
  averageAge: string;
  currentDogs: ReturnType<typeof getDogCatalogData>["currentDogs"];
  currentMeta: ReturnType<typeof getDogCatalogData>["currentMeta"];
}

const DogCatalogContext = createContext<DogCatalogContextValue | null>(null);

export function DogCatalogProvider({ children }: { children: ReactNode }) {
  const [selectedBreed, setSelectedBreed] = useState<BreedKey>(BREEDS[0]);
  const catalogData = getDogCatalogData(selectedBreed);

  return (
    <DogCatalogContext.Provider
      value={{
        selectedBreed,
        setSelectedBreed,
        breeds: BREEDS,
        ...catalogData,
      }}
    >
      {children}
    </DogCatalogContext.Provider>
  );
}

export function useDogCatalog() {
  const context = useContext(DogCatalogContext);

  if (!context) {
    throw new Error("useDogCatalog must be used within DogCatalogProvider");
  }

  return context;
}
