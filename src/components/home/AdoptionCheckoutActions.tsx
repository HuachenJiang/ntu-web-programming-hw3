import { alpha, Button, Stack, Typography } from "@mui/material";

interface AdoptionCheckoutActionsProps {
  accent: string;
  hasPendingDogs: boolean;
  onConfirm: () => void;
}

export function AdoptionCheckoutActions({
  accent,
  hasPendingDogs,
  onConfirm,
}: AdoptionCheckoutActionsProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.25}
      justifyContent="space-between"
      alignItems={{ xs: "stretch", sm: "center" }}
    >
      <Typography sx={{ color: "text.secondary" }}>
        {hasPendingDogs
          ? "确认后，这些狗狗会从“暂被锁定”变成“已有主人领养”。"
          : "目前还没有可确认的待认养狗狗。"}
      </Typography>
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
