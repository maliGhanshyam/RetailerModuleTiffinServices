import { useContext } from "react";
import { SnackbarContext } from "../context/SnackbarProvider";

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar hook used as SnackbarProvider");
  }

  return context;
};
