import { useState } from "react";
import type { AdoptionStatus, DogRecord } from "../types/dog";

export const MAX_ADOPTION_PER_SESSION = 3;

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

export function useAdoptionFlow(allDogs: DogRecord[]) {
  const [pendingAdoptionIds, setPendingAdoptionIds] = useState<string[]>([]);
  const [adoptedDogIds, setAdoptedDogIds] = useState<string[]>([]);
  const [isCheckoutExpanded, setIsCheckoutExpanded] = useState(false);
  const [isAdoptedDrawerOpen, setIsAdoptedDrawerOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [lastConfirmedDogs, setLastConfirmedDogs] = useState<DogRecord[]>([]);

  const pendingIdsSet = new Set(pendingAdoptionIds);
  const adoptedIdsSet = new Set(adoptedDogIds);
  const resolvedDogs = allDogs.map((dog) => ({
    ...dog,
    adoptionStatus: getResolvedAdoptionStatus(dog, pendingIdsSet, adoptedIdsSet),
  }));
  const pendingDogs = resolvedDogs.filter((dog) => pendingIdsSet.has(dog.id));
  const adoptedDogs = resolvedDogs.filter((dog) => adoptedIdsSet.has(dog.id));
  const pendingAdoptionCount = pendingDogs.length;
  const adoptedDogCount = adoptedDogs.length;
  const remainingAdoptionSlots = Math.max(
    0,
    MAX_ADOPTION_PER_SESSION - adoptedDogCount - pendingAdoptionCount,
  );
  const hasReachedAdoptionLimit = remainingAdoptionSlots === 0;

  function addDogToPendingAdoption(dogId: string) {
    const targetDog = resolvedDogs.find((dog) => dog.id === dogId);

    if (
      !targetDog ||
      targetDog.adoptionStatus !== "available" ||
      remainingAdoptionSlots === 0
    ) {
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
    const confirmedDogs = resolvedDogs
      .filter((dog) => confirmedIdSet.has(dog.id))
      .map((dog) => ({ ...dog, adoptionStatus: "adopted" as const }));

    setAdoptedDogIds((prevIds) => Array.from(new Set([...prevIds, ...confirmedIds])));
    setPendingAdoptionIds([]);
    setLastConfirmedDogs(confirmedDogs);
    setIsCheckoutExpanded(false);
    setIsSuccessDialogOpen(true);
  }

  function openAdoptedDrawer() {
    if (adoptedDogCount === 0) {
      return;
    }

    setIsAdoptedDrawerOpen(true);
  }

  function closeAdoptedDrawer() {
    setIsAdoptedDrawerOpen(false);
  }

  function closeSuccessDialog() {
    setIsSuccessDialogOpen(false);
  }

  return {
    resolvedDogs,
    pendingDogs,
    adoptedDogs,
    pendingAdoptionCount,
    adoptedDogCount,
    remainingAdoptionSlots,
    hasReachedAdoptionLimit,
    isCheckoutExpanded,
    isAdoptedDrawerOpen,
    isSuccessDialogOpen,
    lastConfirmedDogs,
    addDogToPendingAdoption,
    removeDogFromPendingAdoption,
    confirmPendingAdoptions,
    setIsCheckoutExpanded,
    openAdoptedDrawer,
    closeAdoptedDrawer,
    closeSuccessDialog,
  };
}
