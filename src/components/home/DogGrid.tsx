import { Box } from "@mui/material";
import { useDogCatalog } from "../../context/DogCatalogContext";
import { DogCard } from "./DogCard";

export function DogGrid() {
  const { currentDogs } = useDogCatalog();

  return (
    <Box className="dog-grid">
      {currentDogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </Box>
  );
}
