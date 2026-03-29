import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { alpha, Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import type { DogRecord } from "../../types/dog";

interface AdoptionCheckoutListProps {
  pendingDogs: DogRecord[];
  onRemoveDog: (dogId: string) => void;
}

export function AdoptionCheckoutList({
  pendingDogs,
  onRemoveDog,
}: AdoptionCheckoutListProps) {
  if (pendingDogs.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2.25,
          borderRadius: "24px",
          bgcolor: alpha("#ffffff", 0.68),
          border: "1px dashed rgba(116, 95, 69, 0.22)",
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>
          待认养区还是空的
        </Typography>
        <Typography sx={{ mt: 0.75, color: "text.secondary" }}>
          先从上方资料卡片挑选心动的狗狗，再回来一起确认领养。
        </Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={1.2}>
      {pendingDogs.map((dog) => (
        <Stack
          key={dog.id}
          direction="row"
          spacing={1.25}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            p: 1.5,
            borderRadius: "22px",
            bgcolor: alpha("#ffffff", 0.66),
            border: "1px solid rgba(77, 67, 56, 0.08)",
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 800 }}>
              {dog.name}
            </Typography>
            <Typography sx={{ fontSize: "0.92rem", color: "text.secondary" }}>
              {dog.breed} / {dog.gender} / {dog.city}
            </Typography>
          </Box>
          <IconButton
            aria-label={`放弃认养 ${dog.name}`}
            onClick={() => onRemoveDog(dog.id)}
            sx={{
              color: "#8f5f47",
              border: "1px solid rgba(143, 95, 71, 0.18)",
            }}
          >
            <RemoveCircleOutlineRoundedIcon />
          </IconButton>
        </Stack>
      ))}
    </Stack>
  );
}
