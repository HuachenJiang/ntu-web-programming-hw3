import { Box, Container } from "@mui/material";
import { AdoptionCheckoutBar } from "./AdoptionCheckoutBar";
import { AdoptionSuccessDialog } from "./AdoptionSuccessDialog";
import { BreedInsightPanel } from "./BreedInsightPanel";
import { HomeCatalogSection } from "./HomeCatalogSection";
import { HomeHero } from "./HomeHero";

export function HomePage() {
  return (
    <Box className="page-shell">
      <Box className="page-orb page-orb-left" />
      <Box className="page-orb page-orb-right" />

      <Container
        maxWidth="xl"
        sx={{ position: "relative", pt: { xs: 4, md: 6 }, pb: { xs: 24, md: 30 } }}
      >
        <Box className="hero-layout">
          <HomeHero />
          <BreedInsightPanel />
        </Box>

        <HomeCatalogSection />
      </Container>

      <AdoptionCheckoutBar />
      <AdoptionSuccessDialog />
    </Box>
  );
}
