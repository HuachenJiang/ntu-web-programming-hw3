import { alpha, Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { useDogCatalog } from "../../context/DogCatalogContext";

export function CatalogOverview() {
  const {
    catalog: { currentDogs, currentMeta, selectedBreed },
    adoption: { pendingAdoptionCount },
  } = useDogCatalog();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "minmax(0, 1.15fr) minmax(320px, 0.85fr)",
        },
        gap: 2,
        alignItems: "stretch",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: 6,
          bgcolor: alpha(currentMeta.wash, 0.78),
          border: `1px solid ${alpha(currentMeta.accent, 0.16)}`,
        }}
      >
        <Typography className="insight-label">当前分类说明</Typography>
        <Typography
          variant="h3"
          sx={{ mt: 1, fontSize: { xs: "1.8rem", md: "2.2rem" } }}
        >
          {selectedBreed}资料墙
        </Typography>
        <Typography sx={{ mt: 1.5, color: "text.secondary" }}>
          {currentMeta.summary}
        </Typography>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: 6,
          bgcolor: alpha("#ffffff", 0.76),
          border: "1px solid rgba(59, 72, 64, 0.08)",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              width: 52,
              height: 52,
              bgcolor: alpha(currentMeta.accent, 0.14),
              color: currentMeta.accent,
              fontWeight: 700,
            }}
          >
            {selectedBreed.slice(0, 1)}
          </Avatar>
          <Box>
            <Typography className="insight-label">当前显示</Typography>
            <Typography sx={{ fontSize: "1.05rem", fontWeight: 700 }}>
              {currentDogs.length} 张狗狗卡片
            </Typography>
            <Typography sx={{ mt: 0.75, fontSize: "0.92rem", color: "text.secondary" }}>
              待认养区目前有 {pendingAdoptionCount} 只狗狗
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
