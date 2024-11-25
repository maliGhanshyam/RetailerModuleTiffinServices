import { createContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";
import { AlertColor } from "@mui/material";
import { SnackbarContextProps } from "./SnackbarProvider.types";

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 5 }}
      >
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
