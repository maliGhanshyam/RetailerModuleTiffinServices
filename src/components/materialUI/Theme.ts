import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#2e4053",
    },
    secondary: {
      main: "#5d6d7e",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
};

const Theme = createTheme(themeOptions);

export default Theme;
