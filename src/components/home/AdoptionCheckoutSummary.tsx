import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import { alpha, Box, Chip, IconButton, Stack, Typography } from "@mui/material";

interface AdoptionCheckoutSummaryProps {
  accent: string;
  hasPendingDogs: boolean;
  adoptedDogCount: number;
  pendingAdoptionCount: number;
  remainingAdoptionSlots: number;
  maxAdoptionPerSession: number;
  hasReachedAdoptionLimit: boolean;
  isCheckoutExpanded: boolean;
  onToggleExpanded: () => void;
}

export function AdoptionCheckoutSummary({
  accent,
  hasPendingDogs,
  adoptedDogCount,
  pendingAdoptionCount,
  remainingAdoptionSlots,
  maxAdoptionPerSession,
  hasReachedAdoptionLimit,
  isCheckoutExpanded,
  onToggleExpanded,
}: AdoptionCheckoutSummaryProps) {
  const summaryText = hasReachedAdoptionLimit
    ? `本次认领名额已满，已认领 ${adoptedDogCount} 只狗狗。`
    : adoptedDogCount > 0 || hasPendingDogs
      ? `已认领 ${adoptedDogCount} 只，目前还能再为 ${remainingAdoptionSlots} 只狗狗留位置。`
      : `本次最多可认领 ${maxAdoptionPerSession} 只狗狗，先点几张卡片把牠们加入待认养清单。`;

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
            {summaryText}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center" useFlexGap flexWrap="wrap">
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
        <Chip
          label={`已认领 ${adoptedDogCount} 只`}
          sx={{
            borderRadius: "999px",
            fontWeight: 700,
            bgcolor: alpha("#5f6e63", 0.12),
            color: "#5f6e63",
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
