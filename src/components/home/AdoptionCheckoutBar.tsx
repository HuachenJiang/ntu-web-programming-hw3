import { alpha, Box, Container, Divider, Paper, Stack } from "@mui/material";
import { useDogCatalog } from "../../context/DogCatalogContext";
import { AdoptionCheckoutAdoptedSummary } from "./AdoptionCheckoutAdoptedSummary";
import { AdoptionCheckoutActions } from "./AdoptionCheckoutActions";
import { AdoptionCheckoutList } from "./AdoptionCheckoutList";
import { AdoptionCheckoutSummary } from "./AdoptionCheckoutSummary";

export function AdoptionCheckoutBar() {
  const {
    catalog: { currentMeta },
    adoption: {
      adoptedDogCount,
      adoptedDogs,
      hasReachedAdoptionLimit,
      isCheckoutExpanded,
      maxAdoptionPerSession,
      pendingAdoptionCount,
      pendingDogs,
      remainingAdoptionSlots,
    },
    actions: {
      confirmPendingAdoptions,
      removeDogFromPendingAdoption,
      setIsCheckoutExpanded,
    },
  } = useDogCatalog();
  const hasPendingDogs = pendingAdoptionCount > 0;
  const accent = currentMeta.accent;

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
            border: `1px solid ${alpha(accent, 0.18)}`,
            boxShadow: "0 24px 80px rgba(46, 34, 20, 0.18)",
            background:
              "linear-gradient(180deg, rgba(255,251,247,0.98) 0%, rgba(249,241,230,0.96) 100%)",
            backdropFilter: "blur(24px)",
          }}
        >
          <Stack spacing={isCheckoutExpanded ? 2.25 : 0}>
            <AdoptionCheckoutSummary
              accent={accent}
              adoptedDogCount={adoptedDogCount}
              hasPendingDogs={hasPendingDogs}
              hasReachedAdoptionLimit={hasReachedAdoptionLimit}
              pendingAdoptionCount={pendingAdoptionCount}
              isCheckoutExpanded={isCheckoutExpanded}
              maxAdoptionPerSession={maxAdoptionPerSession}
              remainingAdoptionSlots={remainingAdoptionSlots}
              onToggleExpanded={() => setIsCheckoutExpanded((prev) => !prev)}
            />

            {isCheckoutExpanded ? (
              <>
                <Divider />

                <Stack spacing={2.25} sx={{ px: { xs: 2, md: 2.5 }, pb: { xs: 2, md: 2.5 } }}>
                  <AdoptionCheckoutList
                    pendingDogs={pendingDogs}
                    onRemoveDog={removeDogFromPendingAdoption}
                  />

                  <AdoptionCheckoutAdoptedSummary
                    accent={accent}
                    adoptedDogs={adoptedDogs}
                    remainingAdoptionSlots={remainingAdoptionSlots}
                  />

                  <AdoptionCheckoutActions
                    accent={accent}
                    adoptedDogCount={adoptedDogCount}
                    hasPendingDogs={hasPendingDogs}
                    hasReachedAdoptionLimit={hasReachedAdoptionLimit}
                    remainingAdoptionSlots={remainingAdoptionSlots}
                    onConfirm={confirmPendingAdoptions}
                  />
                </Stack>
              </>
            ) : null}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
