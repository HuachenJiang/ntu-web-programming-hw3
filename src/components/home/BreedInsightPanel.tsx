import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import VaccinesRoundedIcon from "@mui/icons-material/VaccinesRounded";
import { alpha, Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { useDogCatalog } from "../../context/DogCatalogContext";

export function BreedInsightPanel() {
  const {
    currentDogCount,
    currentMeta,
    neuteredCount,
    selectedBreed,
    vaccinatedCount,
  } = useDogCatalog();

  return (
    <Paper
      className="insight-panel"
      elevation={0}
      sx={{
        borderColor: alpha(currentMeta.accent, 0.25),
        background: `linear-gradient(180deg, ${alpha(
          currentMeta.wash,
          0.9,
        )} 0%, rgba(255,255,255,0.82) 100%)`,
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography className="insight-label">本页聚焦品种</Typography>
          <Typography
            variant="h2"
            sx={{ mt: 1, fontSize: { xs: "2.4rem", md: "3rem" } }}
          >
            {selectedBreed}
          </Typography>
          <Typography sx={{ mt: 1.5, color: "text.secondary" }}>
            {currentMeta.mood}
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <PetsRoundedIcon sx={{ color: currentMeta.accent }} />
            <Typography>
              当前品种共有 <strong>{currentDogCount}</strong> 只狗狗资料可浏览
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <VaccinesRoundedIcon sx={{ color: currentMeta.accent }} />
            <Typography>
              当前品种已有 <strong>{vaccinatedCount}</strong> 只完成疫苗纪录
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <MonitorHeartOutlinedIcon sx={{ color: currentMeta.accent }} />
            <Typography>
              当前品种已绝育纪录共 <strong>{neuteredCount}</strong> 只
            </Typography>
          </Stack>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 5,
            bgcolor: alpha("#ffffff", 0.68),
            border: `1px solid ${alpha(currentMeta.accent, 0.18)}`,
          }}
        >
          <Typography className="insight-label">品种导览摘要</Typography>
          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            {currentMeta.summary}
          </Typography>
        </Paper>
      </Stack>
    </Paper>
  );
}
