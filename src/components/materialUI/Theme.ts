import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#d32f2f",
      light: "#a5aeb7",
      dark: "#d32f2f",
    },
    secondary: {
      main: "#d32f2f",
      light: "#687890",
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
