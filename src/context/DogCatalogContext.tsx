import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { getDogCatalogData } from "../utils/getDogCatalogData";
import {
  BREEDS,
  type AdoptionStatus,
  type BreedKey,
  type DogRecord,
} from "../types/dog";

function getResolvedAdoptionStatus(
  dog: DogRecord,
  pendingIds: Set<string>,
  adoptedIds: Set<string>,
): AdoptionStatus {
  // 已认养必须覆盖待认养，避免确认后又被旧的 pending 状态盖回去。
  if (adoptedIds.has(dog.id)) {
    return "adopted";
  }

  if (pendingIds.has(dog.id)) {
    return "locked";
  }

  return dog.adoptionStatus;
}

interface DogCatalogContextValue {
  selectedBreed: BreedKey;
  setSelectedBreed: Dispatch<SetStateAction<BreedKey>>;
  breeds: readonly BreedKey[];
  totalDogs: number;
  currentDogCount: number;
  cityCount: number;
  vaccinatedCount: number;
  neuteredCount: number;
  averageAge: string;
  allDogs: DogRecord[];
  currentDogs: ReturnType<typeof getDogCatalogData>["currentDogs"];
  currentMeta: ReturnType<typeof getDogCatalogData>["currentMeta"];
  pendingDogs: DogRecord[];
  pendingAdoptionIds: string[];
  pendingAdoptionCount: number;
  adoptedCount: number;
  isCheckoutExpanded: boolean;
  setIsCheckoutExpanded: Dispatch<SetStateAction<boolean>>;
  isSuccessDialogOpen: boolean;
  lastConfirmedDogs: DogRecord[];
  addDogToPendingAdoption: (dogId: string) => void;
  removeDogFromPendingAdoption: (dogId: string) => void;
  confirmPendingAdoptions: () => void;
  closeSuccessDialog: () => void;
}

const DogCatalogContext = createContext<DogCatalogContextValue | null>(null);

export function DogCatalogProvider({ children }: { children: ReactNode }) {
  const [selectedBreed, setSelectedBreed] = useState<BreedKey>(BREEDS[0]);
  const [pendingAdoptionIds, setPendingAdoptionIds] = useState<string[]>([]);
  const [adoptedDogIds, setAdoptedDogIds] = useState<string[]>([]);
  const [isCheckoutExpanded, setIsCheckoutExpanded] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [lastConfirmedDogs, setLastConfirmedDogs] = useState<DogRecord[]>([]);
  const catalogData = getDogCatalogData(selectedBreed);
  const pendingIdsSet = new Set(pendingAdoptionIds);
  const adoptedIdsSet = new Set(adoptedDogIds);
  const allDogs = catalogData.allDogs.map((dog) => ({
    ...dog,
    adoptionStatus: getResolvedAdoptionStatus(dog, pendingIdsSet, adoptedIdsSet),
  }));
  const currentDogs = allDogs.filter((dog) => dog.breed === selectedBreed);
  const pendingDogs = allDogs.filter((dog) => pendingIdsSet.has(dog.id));

  function addDogToPendingAdoption(dogId: string) {
    const targetDog = allDogs.find((dog) => dog.id === dogId);

    if (!targetDog || targetDog.adoptionStatus !== "available") {
      return;
    }

    setPendingAdoptionIds((prevIds) =>
      prevIds.includes(dogId) ? prevIds : [...prevIds, dogId],
    );
    setIsCheckoutExpanded(true);
  }

  function removeDogFromPendingAdoption(dogId: string) {
    setPendingAdoptionIds((prevIds) => {
      const nextIds = prevIds.filter((id) => id !== dogId);

      if (nextIds.length === 0) {
        setIsCheckoutExpanded(false);
      }

      return nextIds;
    });
  }

  function confirmPendingAdoptions() {
    if (pendingAdoptionIds.length === 0) {
      return;
    }

    const confirmedIds = pendingAdoptionIds;
    const confirmedIdSet = new Set(confirmedIds);
    const confirmedDogs = allDogs
      .filter((dog) => confirmedIdSet.has(dog.id))
      .map((dog) => ({ ...dog, adoptionStatus: "adopted" as const }));

    setAdoptedDogIds((prevIds) => Array.from(new Set([...prevIds, ...confirmedIds])));
    setPendingAdoptionIds([]);
    setLastConfirmedDogs(confirmedDogs);
    setIsCheckoutExpanded(false);
    setIsSuccessDialogOpen(true);
  }

  function closeSuccessDialog() {
    setIsSuccessDialogOpen(false);
  }

  return (
    <DogCatalogContext.Provider
      value={{
        selectedBreed,
        setSelectedBreed,
        breeds: BREEDS,
        totalDogs: catalogData.totalDogs,
        currentDogCount: currentDogs.length,
        cityCount: catalogData.cityCount,
        vaccinatedCount: catalogData.vaccinatedCount,
        neuteredCount: catalogData.neuteredCount,
        averageAge: catalogData.averageAge,
        allDogs,
        currentDogs,
        currentMeta: catalogData.currentMeta,
        pendingDogs,
        pendingAdoptionIds,
        pendingAdoptionCount: pendingDogs.length,
        adoptedCount: adoptedDogIds.length,
        isCheckoutExpanded,
        setIsCheckoutExpanded,
        isSuccessDialogOpen,
        lastConfirmedDogs,
        addDogToPendingAdoption,
        removeDogFromPendingAdoption,
        confirmPendingAdoptions,
        closeSuccessDialog,
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
