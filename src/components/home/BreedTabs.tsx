import { alpha, Tab, Tabs } from "@mui/material";
import { useDogCatalog } from "../../context/DogCatalogContext";
import { BREED_META } from "../../data/breedMeta";
import type { BreedKey } from "../../types/dog";

export function BreedTabs() {
  const {
    catalog: { breeds, selectedBreed, setSelectedBreed },
  } = useDogCatalog();

  return (
    <Tabs
      value={selectedBreed}
      onChange={(_, nextBreed: BreedKey) => setSelectedBreed(nextBreed)}
      variant="scrollable"
      allowScrollButtonsMobile
      sx={{
        minHeight: 0,
        "& .MuiTabs-indicator": {
          display: "none",
        },
      }}
    >
      {breeds.map((breed) => {
        const meta = BREED_META[breed];

        return (
          <Tab
            key={breed}
            value={breed}
            label={breed}
            sx={{
              mr: 1.25,
              minHeight: 0,
              minWidth: 0,
              px: 2.25,
              py: 1.25,
              borderRadius: "999px",
              textTransform: "none",
              fontSize: "0.98rem",
              fontWeight: 700,
              color: "text.secondary",
              border: `1px solid ${alpha(meta.accent, 0.18)}`,
              backgroundColor:
                breed === selectedBreed ? alpha(meta.accent, 0.12) : "transparent",
              boxShadow:
                breed === selectedBreed
                  ? `inset 0 0 0 1px ${alpha(meta.accent, 0.16)}`
                  : "none",
            }}
          />
        );
      })}
    </Tabs>
  );
}
