import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import { alpha, Box, Chip, IconButton, Stack, Typography } from "@mui/material";

interface AdoptionCheckoutSummaryProps {
  accent: string;
  hasPendingDogs: boolean;
  pendingAdoptionCount: number;
  isCheckoutExpanded: boolean;
  onToggleExpanded: () => void;
}

export function AdoptionCheckoutSummary({
  accent,
  hasPendingDogs,
  pendingAdoptionCount,
  isCheckoutExpanded,
  onToggleExpanded,
}: AdoptionCheckoutSummaryProps) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: { xs: 2, md: 2.5 }, py: 1.5 }}
    >
      <Stack direction="row" spacing={1.25} alignItems="center">
        <Box
          sx={{
            width: 46,
            height: 46,
            display: "grid",
            placeItems: "center",
            borderRadius: "16px",
            bgcolor: alpha(accent, 0.12),
            color: accent,
          }}
        >
          <LocalMallOutlinedIcon />
        </Box>
        <Box>
          <Typography sx={{ fontSize: "1rem", fontWeight: 800 }}>
            当前待认养
          </Typography>
          <Typography sx={{ fontSize: "0.92rem", color: "text.secondary" }}>
            {hasPendingDogs
              ? `已经为 ${pendingAdoptionCount} 只狗狗留好了位置，准备带牠们回家。`
              : "先点几张狗狗卡片的“做TA的主人”，这里就会变成你的待认养清单。"}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <Chip
          icon={<PetsRoundedIcon />}
          label={`${pendingAdoptionCount} 只待认养`}
          sx={{
            borderRadius: "999px",
            fontWeight: 700,
            bgcolor: alpha(accent, 0.12),
            color: accent,
            "& .MuiChip-icon": {
              color: "inherit",
            },
          }}
        />
        <IconButton
          onClick={onToggleExpanded}
          sx={{
            border: `1px solid ${alpha(accent, 0.16)}`,
            bgcolor: alpha("#ffffff", 0.72),
          }}
        >
          {isCheckoutExpanded ? <ExpandMoreRoundedIcon /> : <ExpandLessRoundedIcon />}
        </IconButton>
      </Stack>
    </Stack>
  );
}
