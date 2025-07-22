import { Alert, Snackbar } from "@mui/material";
import type { ProductFeedbackProps } from "./Interfaces";

export default function ProductFeedback({
  open,
  message,
  severity,
  onClose,
}: ProductFeedbackProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}