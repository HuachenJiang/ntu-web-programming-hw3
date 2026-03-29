import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useAdoptionFlow } from "../hooks/useAdoptionFlow";
import { useDogCatalogData } from "../hooks/useDogCatalogData";
import { BREEDS, type BreedKey, type DogRecord } from "../types/dog";
import type { BreedMeta } from "../data/breedMeta";

interface DogCatalogContextValue {
  catalog: {
    selectedBreed: BreedKey;
    setSelectedBreed: Dispatch<SetStateAction<BreedKey>>;
    breeds: readonly BreedKey[];
    totalDogs: number;
    currentDogCount: number;
    cityCount: number;
    vaccinatedCount: number;
    neuteredCount: number;
    averageAge: string;
    currentDogs: DogRecord[];
    currentMeta: BreedMeta;
  };
  adoption: {
    pendingDogs: DogRecord[];
    pendingAdoptionCount: number;
    isCheckoutExpanded: boolean;
    isSuccessDialogOpen: boolean;
    lastConfirmedDogs: DogRecord[];
  };
  actions: {
    addDogToPendingAdoption: (dogId: string) => void;
    removeDogFromPendingAdoption: (dogId: string) => void;
    confirmPendingAdoptions: () => void;
    setIsCheckoutExpanded: Dispatch<SetStateAction<boolean>>;
    closeSuccessDialog: () => void;
  };
}

const DogCatalogContext = createContext<DogCatalogContextValue | null>(null);

export function DogCatalogProvider({ children }: { children: ReactNode }) {
  const [selectedBreed, setSelectedBreed] = useState<BreedKey>(BREEDS[0]);
  const catalogData = useDogCatalogData(selectedBreed);
  const adoptionFlow = useAdoptionFlow(catalogData.allDogs);
  const currentDogs = adoptionFlow.resolvedDogs.filter((dog) => dog.breed === selectedBreed);

  return (
    <DogCatalogContext.Provider
      value={{
        // Provider 只保留页面共享协议，避免让叶子组件依赖未分组的大对象。
        catalog: {
          selectedBreed,
          setSelectedBreed,
          breeds: BREEDS,
          totalDogs: catalogData.totalDogs,
          currentDogCount: currentDogs.length,
          cityCount: catalogData.cityCount,
          vaccinatedCount: catalogData.vaccinatedCount,
          neuteredCount: catalogData.neuteredCount,
          averageAge: catalogData.averageAge,
          currentDogs,
          currentMeta: catalogData.currentMeta,
        },
        adoption: {
          pendingDogs: adoptionFlow.pendingDogs,
          pendingAdoptionCount: adoptionFlow.pendingAdoptionCount,
          isCheckoutExpanded: adoptionFlow.isCheckoutExpanded,
          isSuccessDialogOpen: adoptionFlow.isSuccessDialogOpen,
          lastConfirmedDogs: adoptionFlow.lastConfirmedDogs,
        },
        actions: {
          addDogToPendingAdoption: adoptionFlow.addDogToPendingAdoption,
          removeDogFromPendingAdoption: adoptionFlow.removeDogFromPendingAdoption,
          confirmPendingAdoptions: adoptionFlow.confirmPendingAdoptions,
          setIsCheckoutExpanded: adoptionFlow.setIsCheckoutExpanded,
          closeSuccessDialog: adoptionFlow.closeSuccessDialog,
        },
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
