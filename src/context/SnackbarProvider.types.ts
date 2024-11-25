export interface SnackbarContextProps {
    showSnackbar: (message: string, severity: "success" | "error") => void;
  }