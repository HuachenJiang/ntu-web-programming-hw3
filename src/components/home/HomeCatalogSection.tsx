import { Box, Paper, Stack, Typography } from "@mui/material";
import { BreedTabs } from "./BreedTabs";
import { CatalogOverview } from "./CatalogOverview";
import { DogGrid } from "./DogGrid";

export function HomeCatalogSection() {
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
        </Box>

        <BreedTabs />
        <CatalogOverview />
        <DogGrid />
      </Stack>
    </Paper>
  );
}
