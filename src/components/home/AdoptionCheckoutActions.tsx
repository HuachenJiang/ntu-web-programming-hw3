import { alpha, Button, Chip, Stack, Typography } from "@mui/material";

interface AdoptionCheckoutActionsProps {
  accent: string;
  hasPendingDogs: boolean;
  adoptedDogCount: number;
  remainingAdoptionSlots: number;
  hasReachedAdoptionLimit: boolean;
  onConfirm: () => void;
}

export function AdoptionCheckoutActions({
  accent,
  hasPendingDogs,
  adoptedDogCount,
  remainingAdoptionSlots,
  hasReachedAdoptionLimit,
  onConfirm,
}: AdoptionCheckoutActionsProps) {
  const helperText = hasPendingDogs
    ? hasReachedAdoptionLimit
      ? "确认后，这些狗狗会从“暂被锁定”变成“已有主人领养”，本次名额也会刚好用满。"
      : `确认后，这些狗狗会从“暂被锁定”变成“已有主人领养”，之后还能再认领 ${remainingAdoptionSlots} 只。`
    : adoptedDogCount > 0
      ? `目前已认领 ${adoptedDogCount} 只狗狗，还可再加入 ${remainingAdoptionSlots} 只待认养。`
      : "目前还没有可确认的待认养狗狗。";

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.25}
      justifyContent="space-between"
      alignItems={{ xs: "stretch", sm: "center" }}
    >
      <Stack direction="row" spacing={1} alignItems="center" useFlexGap flexWrap="wrap">
        <Typography sx={{ color: "text.secondary" }}>{helperText}</Typography>
        <Chip
          label={hasReachedAdoptionLimit ? "本次名额已满" : `还可认领 ${remainingAdoptionSlots} 只`}
          sx={{
            borderRadius: "999px",
            fontWeight: 700,
            bgcolor: alpha(accent, 0.1),
            color: accent,
          }}
        />
      </Stack>
      <Button
        variant="contained"
        onClick={onConfirm}
        disabled={!hasPendingDogs}
        sx={{
          borderRadius: "999px",
          px: 3,
          py: 1.2,
          minWidth: { sm: 164 },
          fontWeight: 800,
          bgcolor: accent,
          boxShadow: `0 14px 28px ${alpha(accent, 0.24)}`,
        }}
      >
        确认领养
      </Button>
    </Stack>
  );
}
