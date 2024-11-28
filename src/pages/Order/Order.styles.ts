import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

export const styles: { [key: string]: SxProps<Theme> } = {
  tableRowStyle: {
    // "& > *": { borderBottom: "unset" },
    "&:hover": { backgroundColor: "#f1f1f1" },
  },
  tableCellStyleFont: {
    fontWeight: "bold",
    display: { xs: "none", sm: "table-cell" },
  },
  tableCellStyleNormal: {
    display: { xs: "none", sm: "table-cell" },
  },
  tableCellStyleNone: {
    display: { xs: "table-cell", sm: "table-cell" },
  },
  background: {
    backgroundColor: "#f4f4f4",
  },
  fontWeightBold: {
    fontWeight: "bold",
  },
  paperStyle: {
    overflow: "hidden",
    justifyContent: "center",
    margin: "20px",
    borderRadius: "8px",
    boxShadow: 3,
  },
  boxStyle: {
    display: { sm: "flex", xs: "block" },
    justifyContent: "flex-end",
    marginBottom: "4px",
    marginTop: "8px",
    marginRight: "8px",
  },
  boxStyleButton: {
    display: { sm: "flex", xs: "flex" },
    justifyContent: "flex-end",
    marginBottom: "4px",
    marginTop: "8px",
    marginRight:{sm:"8px",xs:"0px"} ,
    marginLeft:{xs:1,sm:0}
  },
  boxStyleSearch: {
    display: { sm: "flex", xs: "block" },
    justifyContent: "flex-end",
    marginBottom: "4px",
    marginTop: "8px",
    marginRight: "8px",
  },
  iconButtonStyle: {
    "&:hover": { backgroundColor: "#d4edda" },
  },
  iconButtonRejectStyle: {
    "&:hover": { backgroundColor: "#f8d7da" },
  },
};

export const getStatusBadgeStyle = (status: string): SxProps<Theme> => {
  let backgroundColor, borderColor;

  switch (status) {
    case "paid":
    case "delivered":
      backgroundColor = "#4caf50";
      borderColor = "#388e3c";
      break;
    case "pending":
    case "in_progress":
      backgroundColor = "#ff9800";
      borderColor = "#f57c00";
      break;
    default:
      backgroundColor = "#f44336";
      borderColor = "#d32f2f";
  }

  return {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    backgroundColor,
    border: "2px solid",
    borderColor,
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
  };
};

export const buttonStyles = {
  baseButton: {
    border: "primary.main",
    borderRadius: "12px",
    marginRight: 1,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#ecf0f1",
    },
  },
  activeButton: {
    backgroundColor: "primary.main",
    color: "#fff",
    "&:hover": {
      backgroundColor: "primary.dark",
    },
  },
  defaultButton: {
    backgroundColor: "transparent",
    color: "primary.main",
  },
};
