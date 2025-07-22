export interface ProductFeedbackProps {
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
    onClose: () => void;
}