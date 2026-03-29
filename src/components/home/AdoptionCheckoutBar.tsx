import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import {
  alpha,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useDogCatalog } from "../../context/DogCatalogContext";

export function AdoptionCheckoutBar() {
  const {
    confirmPendingAdoptions,
    currentMeta,
    isCheckoutExpanded,
    pendingAdoptionCount,
    pendingDogs,
    removeDogFromPendingAdoption,
    setIsCheckoutExpanded,
  } = useDogCatalog();
  const hasPendingDogs = pendingAdoptionCount > 0;

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: { xs: 12, md: 18 },
        zIndex: 1200,
        px: { xs: 1.5, md: 2.5 },
        pointerEvents: "none",
      }}
    >
      <Container maxWidth="xl" sx={{ pointerEvents: "none" }}>
        <Paper
          elevation={0}
          sx={{
            pointerEvents: "auto",
            ml: "auto",
            width: "min(100%, 780px)",
            borderRadius: "32px",
            overflow: "hidden",
            border: `1px solid ${alpha(currentMeta.accent, 0.18)}`,
            boxShadow: "0 24px 80px rgba(46, 34, 20, 0.18)",
            background:
              "linear-gradient(180deg, rgba(255,251,247,0.98) 0%, rgba(249,241,230,0.96) 100%)",
            backdropFilter: "blur(24px)",
          }}
        >
          <Stack spacing={isCheckoutExpanded ? 2.25 : 0}>
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
                    bgcolor: alpha(currentMeta.accent, 0.12),
                    color: currentMeta.accent,
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
                    bgcolor: alpha(currentMeta.accent, 0.12),
                    color: currentMeta.accent,
                    "& .MuiChip-icon": {
                      color: "inherit",
                    },
                  }}
                />
                <IconButton
                  onClick={() => setIsCheckoutExpanded((prev) => !prev)}
                  sx={{
                    border: `1px solid ${alpha(currentMeta.accent, 0.16)}`,
                    bgcolor: alpha("#ffffff", 0.72),
                  }}
                >
                  {isCheckoutExpanded ? <ExpandMoreRoundedIcon /> : <ExpandLessRoundedIcon />}
                </IconButton>
              </Stack>
            </Stack>

            {isCheckoutExpanded ? (
              <>
                <Divider />

                <Stack spacing={2.25} sx={{ px: { xs: 2, md: 2.5 }, pb: { xs: 2, md: 2.5 } }}>
                  {hasPendingDogs ? (
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
                            onClick={() => removeDogFromPendingAdoption(dog.id)}
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
                  ) : (
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
                  )}

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
                      onClick={confirmPendingAdoptions}
                      disabled={!hasPendingDogs}
                      sx={{
                        borderRadius: "999px",
                        px: 3,
                        py: 1.2,
                        minWidth: { sm: 164 },
                        fontWeight: 800,
                        bgcolor: currentMeta.accent,
                        boxShadow: `0 14px 28px ${alpha(currentMeta.accent, 0.24)}`,
                      }}
                    >
                      确认领养
                    </Button>
                  </Stack>
                </Stack>
              </>
            ) : null}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
