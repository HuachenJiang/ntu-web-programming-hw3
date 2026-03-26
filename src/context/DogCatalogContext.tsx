import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useDogCatalogData } from "../hooks/useDogCatalogData";
import { BREEDS, type BreedKey } from "../types/dog";

interface DogCatalogContextValue {
  selectedBreed: BreedKey;
  setSelectedBreed: Dispatch<SetStateAction<BreedKey>>;
  breeds: readonly BreedKey[];
  totalDogs: number;
  cityCount: number;
  vaccinatedCount: number;
  neuteredCount: number;
  averageAge: string;
  currentDogs: ReturnType<typeof useDogCatalogData>["currentDogs"];
  currentMeta: ReturnType<typeof useDogCatalogData>["currentMeta"];
}

const DogCatalogContext = createContext<DogCatalogContextValue | null>(null);

export function DogCatalogProvider({ children }: { children: ReactNode }) {
  const [selectedBreed, setSelectedBreed] = useState<BreedKey>(BREEDS[0]);
  const catalogData = useDogCatalogData(selectedBreed);

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
