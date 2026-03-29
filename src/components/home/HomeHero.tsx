import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { alpha, Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { useDogCatalog } from "../../context/DogCatalogContext";

export function HomeHero() {
  const {
    catalog: { totalDogs, cityCount, averageAge },
  } = useDogCatalog();

  return (
    <Paper className="hero-panel" elevation={0}>
      <Stack spacing={3}>
        <Chip
          icon={<AutoAwesomeRoundedIcon />}
          label="Stray Dog Rescue / UI Preview"
          sx={{
            alignSelf: "flex-start",
            borderRadius: "999px",
            px: 1,
            height: 36,
            fontWeight: 700,
            bgcolor: alpha("#ffffff", 0.72),
            color: "primary.main",
            backdropFilter: "blur(16px)",
          }}
        />

        <Box>
          <Typography variant="h1">
            给等待家庭的狗狗，
            <br />
            一页更温柔的相遇。
          </Typography>
        </Box>

        <Box className="hero-highlights">
          <Paper elevation={0} className="highlight-card">
            <Typography className="metric-label">目前可浏览</Typography>
            <Typography className="metric-value">{totalDogs}</Typography>
            <Typography className="metric-caption">只救援狗狗资料</Typography>
          </Paper>
          <Paper elevation={0} className="highlight-card">
            <Typography className="metric-label">覆盖城市</Typography>
            <Typography className="metric-value">{cityCount}</Typography>
            <Typography className="metric-caption">个安置据点</Typography>
          </Paper>
          <Paper elevation={0} className="highlight-card">
            <Typography className="metric-label">平均年龄</Typography>
            <Typography className="metric-value">{averageAge}</Typography>
            <Typography className="metric-caption">岁</Typography>
          </Paper>
        </Box>
      </Stack>
    </Paper>
  );
}
