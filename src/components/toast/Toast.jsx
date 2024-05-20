import { Alert, AlertTitle, Snackbar, Typography } from "@mui/material";
import "./style.scss";
import icons from "../../utils/icons";
import { useSelector } from "react-redux";
import useNotification from "../../hooks/useNotification";

export default function Toast() {
  const { open, message, title, severity } = useSelector((state) => state.app);
  const { resetNotification } = useNotification();
  const handleCloseToast = (event, reason) => {
    reason !== "clickaway" && resetNotification();
  };
  const anchorOrigin = { vertical: "top", horizontal: "right" };
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleCloseToast}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        className="toast-alert"
        onClose={handleCloseToast}
        severity={severity}
        iconMapping={{
          success: (
            <img className="toast-icon" src={icons.successIcon} alt="success" />
          ),
          error: (
            <img className="toast-icon" src={icons.alertIcon} alt="error" />
          ),
          warning: (
            <img className="toast-icon" src={icons.warningIcon} alt="warning" />
          ),
          info: <img className="toast-icon" src={icons.infoIcon} alt="info" />,
        }}
      >
        <AlertTitle>
          <Typography variant="h6">{title}</Typography>
        </AlertTitle>
        <Typography variant="body2" className="alert-message">
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
}
