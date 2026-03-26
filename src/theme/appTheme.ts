import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1d3b2f",
    },
    secondary: {
      main: "#d9783d",
    },
    background: {
      default: "#f8f1e7",
      paper: "rgba(255, 251, 245, 0.84)",
    },
    text: {
      primary: "#1f241f",
      secondary: "#5a625c",
    },
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily:
      '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
    h1: {
      fontFamily: '"Noto Serif TC", "PMingLiU", serif',
      fontSize: "clamp(3rem, 6vw, 5.4rem)",
      lineHeight: 1.02,
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h2: {
      fontFamily: '"Noto Serif TC", "PMingLiU", serif',
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    h3: {
      fontFamily: '"Noto Serif TC", "PMingLiU", serif',
      fontWeight: 700,
    },
    body1: {
      lineHeight: 1.75,
    },
  },
});
