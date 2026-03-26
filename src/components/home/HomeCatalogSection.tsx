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
              从品种分类进入，先看到每只狗狗真正的样子
            </Typography>
          </Box>
          <Typography
            sx={{
              maxWidth: 440,
              color: "text.secondary",
              fontSize: { xs: "0.98rem", md: "1rem" },
            }}
          >
            目前只做展示型首页，因此把焦点放在清楚阅读、节奏感和卡片密度；后续若加入领养流程，可以沿用这套结构继续扩充。
          </Typography>
        </Box>

        <BreedTabs />
        <CatalogOverview />
        <DogGrid />
      </Stack>
    </Paper>
  );
}
