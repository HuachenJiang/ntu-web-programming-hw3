import { Box, Container } from "@mui/material";
import { BreedInsightPanel } from "./BreedInsightPanel";
import { HomeCatalogSection } from "./HomeCatalogSection";
import { HomeHero } from "./HomeHero";

export function HomePage() {
  return (
    <Box className="page-shell">
      <Box className="page-orb page-orb-left" />
      <Box className="page-orb page-orb-right" />

      <Container maxWidth="xl" sx={{ position: "relative", py: { xs: 4, md: 6 } }}>
        <Box className="hero-layout">
          <HomeHero />
          <BreedInsightPanel />
        </Box>

        <HomeCatalogSection />
      </Container>
    </Box>
  );
}
