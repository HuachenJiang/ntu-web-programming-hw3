import { Box } from "@mui/material";
import { useDogCatalog } from "../../context/DogCatalogContext";
import { DogCard } from "./DogCard";

export function DogGrid() {
  const {
    catalog: { currentDogs, currentMeta },
    actions: { addDogToPendingAdoption },
  } = useDogCatalog();

  return (
    <Box className="dog-grid-shell">
      <Box className="dog-grid">
        {currentDogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            accent={currentMeta.accent}
            onAdopt={addDogToPendingAdoption}
          />
        ))}
      </Box>
    </Box>
  );
}
