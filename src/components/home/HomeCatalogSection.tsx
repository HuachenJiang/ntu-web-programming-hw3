import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import { alpha, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useDogCatalog } from "../../context/DogCatalogContext";
import { AdoptedDogsDrawer } from "./AdoptedDogsDrawer";
import { BreedTabs } from "./BreedTabs";
import { CatalogOverview } from "./CatalogOverview";
import { DogGrid } from "./DogGrid";

export function HomeCatalogSection() {
  const {
    catalog: { currentMeta },
    adoption: { adoptedDogCount },
    actions: { openAdoptedDrawer },
  } = useDogCatalog();

  return (
    <Paper className="catalog-panel" elevation={0}>
      <Stack spacing={3}>
        <Box className="catalog-header">
          <Box>
            <Typography className="section-kicker">Breed Directory</Typography>
            <Typography
              variant="h3"
              sx={{ mt: 1, fontSize: { xs: "2rem", md: "2.5rem" } }}
            >
              按品种浏览，直接找到想认识的狗狗
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<PetsRoundedIcon />}
            disabled={adoptedDogCount === 0}
            onClick={openAdoptedDrawer}
            sx={{
              alignSelf: { xs: "stretch", md: "center" },
              borderRadius: "999px",
              px: 2.2,
              py: 1.1,
              fontWeight: 800,
              borderColor: alpha(currentMeta.accent, 0.18),
              bgcolor: alpha("#ffffff", 0.68),
              color: currentMeta.accent,
              boxShadow: `0 16px 32px ${alpha(currentMeta.accent, 0.12)}`,
              "&:hover": {
                borderColor: alpha(currentMeta.accent, 0.26),
                bgcolor: alpha(currentMeta.wash, 0.72),
              },
              "&.Mui-disabled": {
                color: alpha(currentMeta.accent, 0.45),
                borderColor: alpha(currentMeta.accent, 0.12),
              },
            }}
          >
            已认领狗狗 {adoptedDogCount > 0 ? `(${adoptedDogCount})` : ""}
          </Button>
        </Box>

        <BreedTabs />
        <CatalogOverview />
        <DogGrid />
      </Stack>

      <AdoptedDogsDrawer />
    </Paper>
  );
}
