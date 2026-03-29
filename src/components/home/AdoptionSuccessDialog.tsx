import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import {
  alpha,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { useDogCatalog } from "../../context/DogCatalogContext";

export function AdoptionSuccessDialog() {
  const { closeSuccessDialog, currentMeta, isSuccessDialogOpen, lastConfirmedDogs } =
    useDogCatalog();
  const confirmedNames = lastConfirmedDogs.map((dog) => dog.name);

  return (
    <Dialog
      open={isSuccessDialogOpen}
      onClose={closeSuccessDialog}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          overflow: "hidden",
          borderRadius: "32px",
          background:
            "linear-gradient(180deg, rgba(255,251,247,0.98) 0%, rgba(255,244,230,0.98) 100%)",
        },
      }}
    >
      <DialogContent sx={{ p: { xs: 3, md: 4 } }}>
        <Stack spacing={2.5}>
          <Box
            sx={{
              width: 72,
              height: 72,
              display: "grid",
              placeItems: "center",
              borderRadius: "24px",
              bgcolor: alpha(currentMeta.accent, 0.12),
              color: currentMeta.accent,
            }}
          >
            <CelebrationRoundedIcon sx={{ fontSize: 36 }} />
          </Box>

          <Box>
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: "2rem", md: "2.35rem" }, lineHeight: 1.1 }}
            >
              感谢您的认领
            </Typography>
            <Typography sx={{ mt: 1.25, color: "text.secondary" }}>
              这次共有 {lastConfirmedDogs.length} 只狗狗收到新的承诺与陪伴。
              愿接下来的每一天，都有人陪牠们安心吃饭、散步、打盹，也陪你把家过成更柔软的样子。
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {confirmedNames.map((name) => (
              <Chip
                key={name}
                icon={<FavoriteRoundedIcon />}
                label={name}
                sx={{
                  borderRadius: "999px",
                  bgcolor: alpha(currentMeta.accent, 0.12),
                  color: currentMeta.accent,
                  fontWeight: 700,
                  "& .MuiChip-icon": {
                    color: "inherit",
                  },
                }}
              />
            ))}
          </Stack>

          <Button
            variant="contained"
            onClick={closeSuccessDialog}
            sx={{
              alignSelf: "flex-start",
              borderRadius: "999px",
              px: 3,
              py: 1.2,
              fontWeight: 800,
              bgcolor: currentMeta.accent,
              boxShadow: `0 14px 28px ${alpha(currentMeta.accent, 0.24)}`,
            }}
          >
            回到狗狗资料墙
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
