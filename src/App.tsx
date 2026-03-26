import { CssBaseline, ThemeProvider } from "@mui/material";
import { HomePage } from "./components/home/HomePage";
import { DogCatalogProvider } from "./context/DogCatalogContext";
import { appTheme } from "./theme/appTheme";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <DogCatalogProvider>
        <HomePage />
      </DogCatalogProvider>
    </ThemeProvider>
  );
}

export default App;
