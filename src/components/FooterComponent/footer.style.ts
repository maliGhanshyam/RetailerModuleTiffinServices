import { SxProps, Theme } from "@mui/material";

export const footerStyles: { [key: string]: SxProps<Theme> } = {
  root: {
    color: "white",
    width: "100%",
    height: "auto",
    backgroundColor: "secondary.main",
    marginTop: "10px",
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
  contact: {
    textAlign: { xs: "center", md: "left" },
  },
  title: {
    textAlign: { xs: "center", md: "center" },
    color: "white",
  },
  social: {
    textAlign: { xs: "center", md: "right" },
    alignItems: "center",
  },
  link: {
    ml: 1,
    color: "inherit",
  },
};
