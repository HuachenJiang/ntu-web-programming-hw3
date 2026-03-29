import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import {
  alpha,
  Box,
  Chip,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useDogCatalog } from "../../context/DogCatalogContext";

export function AdoptedDogsDrawer() {
  const {
    catalog: { currentMeta },
    adoption: { adoptedDogCount, adoptedDogs, isAdoptedDrawerOpen },
    actions: { closeAdoptedDrawer },
  } = useDogCatalog();

  return (
    <Drawer
      anchor="right"
      open={isAdoptedDrawerOpen}
      onClose={closeAdoptedDrawer}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 420 },
          background:
            "linear-gradient(180deg, rgba(255,251,247,0.98) 0%, rgba(247,239,229,0.98) 100%)",
        },
      }}
    >
      <Stack spacing={2.5} sx={{ height: "100%", p: { xs: 2.5, md: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography className="section-kicker">Adopted Dogs</Typography>
            <Typography
              variant="h4"
              sx={{ mt: 1, fontSize: { xs: "1.8rem", md: "2rem" }, lineHeight: 1.12 }}
            >
              这里是你已经认领的狗狗
            </Typography>
            <Typography sx={{ mt: 1, color: "text.secondary" }}>
              当前 session 已认领 {adoptedDogCount} 只，牠们会继续保留在这份清单里。
            </Typography>
          </Box>

          <IconButton
            onClick={closeAdoptedDrawer}
            sx={{
              border: `1px solid ${alpha(currentMeta.accent, 0.16)}`,
              bgcolor: alpha("#ffffff", 0.72),
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Chip
          icon={<PetsRoundedIcon />}
          label={`已认领 ${adoptedDogCount} 只`}
          sx={{
            alignSelf: "flex-start",
            borderRadius: "999px",
            fontWeight: 700,
            bgcolor: alpha(currentMeta.accent, 0.12),
            color: currentMeta.accent,
            "& .MuiChip-icon": {
              color: "inherit",
            },
          }}
        />

        <Stack spacing={1.2}>
          {adoptedDogs.map((dog) => (
            <Paper
              key={dog.id}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: "24px",
                bgcolor: alpha("#ffffff", 0.74),
                border: `1px solid ${alpha(currentMeta.accent, 0.12)}`,
              }}
            >
              <Stack spacing={1.25}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography sx={{ fontSize: "1.08rem", fontWeight: 800 }}>
                      {dog.name}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: "0.93rem" }}>
                      {dog.breed} / {dog.gender} / {dog.city}
                    </Typography>
                  </Box>

                  <Chip
                    icon={<FavoriteRoundedIcon />}
                    label="已认领"
                    sx={{
                      borderRadius: "999px",
                      fontWeight: 700,
                      bgcolor: alpha("#5f6e63", 0.12),
                      color: "#5f6e63",
                      "& .MuiChip-icon": {
                        color: "inherit",
                      },
                    }}
                  />
                </Stack>

                <Typography sx={{ color: "text.secondary", fontSize: "0.93rem" }}>
                  {dog.description}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </Drawer>
  );
}
