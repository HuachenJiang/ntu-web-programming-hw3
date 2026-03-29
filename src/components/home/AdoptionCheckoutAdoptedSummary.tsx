import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { alpha, Box, Chip, Paper, Stack, Typography } from "@mui/material";
import type { DogRecord } from "../../types/dog";

interface AdoptionCheckoutAdoptedSummaryProps {
  accent: string;
  adoptedDogs: DogRecord[];
  remainingAdoptionSlots: number;
}

export function AdoptionCheckoutAdoptedSummary({
  accent,
  adoptedDogs,
  remainingAdoptionSlots,
}: AdoptionCheckoutAdoptedSummaryProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 2.25 },
        borderRadius: "24px",
        bgcolor: alpha("#ffffff", 0.72),
        border: `1px solid ${alpha(accent, 0.14)}`,
      }}
    >
      <Stack spacing={1.25}>
        <Box>
          <Typography sx={{ fontWeight: 800 }}>已认领狗狗</Typography>
          <Typography sx={{ mt: 0.6, color: "text.secondary", fontSize: "0.92rem" }}>
            {adoptedDogs.length > 0
              ? `已认领 ${adoptedDogs.length} 只，目前还能再加入 ${remainingAdoptionSlots} 只待认养。`
              : `目前还没有已认领的狗狗，本次还可认领 ${remainingAdoptionSlots} 只。`}
          </Typography>
        </Box>

        {adoptedDogs.length > 0 ? (
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {adoptedDogs.map((dog) => (
              <Chip
                key={dog.id}
                icon={<FavoriteRoundedIcon />}
                label={dog.name}
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
            ))}
          </Stack>
        ) : null}
      </Stack>
    </Paper>
  );
}
