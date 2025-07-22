import { useState, useEffect } from "react";
import ProductFeedback from "../components/ProductsFeedback/ProductsFeedback";

export default function ProductFeedbackView() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error" | "info">("info");

  useEffect(() => {
    const handleShowSnackbar = (event: Event) => {
      const customEvent = event as CustomEvent;
      setMessage(customEvent.detail.message);
      setSeverity(customEvent.detail.severity);
      setOpen(true);
    };
    window.addEventListener('showSnackbar', handleShowSnackbar);
    return () => {
      window.removeEventListener('showSnackbar', handleShowSnackbar);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ProductFeedback
      open={open}
      message={message}
      severity={severity}
      onClose={handleClose}
    />
  );
}