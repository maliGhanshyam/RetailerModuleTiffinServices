// OrganisationCardStyles.ts

import { SxProps, Theme } from "@mui/material";

const OrganisationCardStyles = {
  cardStyles: {
    maxWidth: 350,
    height: 400,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginTop: "10px",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: 4,
      backgroundColor: "#f1f1f1",
      borderRadius: 5,
    },
  },
  cardMediaStyles: {
    height: 140,
  },
  titleStyles: {
    fontWeight: "bolder",
    fontSize: "1.2rem",
  },
  subTitleStyles: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  statusStyles: (status: string): SxProps<Theme> => ({
    mt: 1,
    color:
      status.toLowerCase() === "active"
        ? "success.main"
        : status.toLowerCase() === "pending"
        ? "warning.main"
        : "error.main",
  }),
  cardActionsStyles: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: 2,
    position: "relative",
  },
  buttonStyles: (color: "primary" | "error"): SxProps<Theme> => ({
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: color === "primary" ? "primary.main" : "primary.dark",
      color: "white",
    },
  }),
};

export default OrganisationCardStyles;
