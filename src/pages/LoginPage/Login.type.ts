export interface ISnackbar {
  open: boolean;
  message: string;
  severity: "success" | "error";
}
