import React from "react";
import { useTranslation } from "react-i18next";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
import "./style.scss";
import icons from "../../utils/icons";

const PopUp = (props) => {
  const {
    open,
    handleClose,
    title,
    message,
    enableCancelButton,
    onClick,
    loading,
  } = props;

  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box className="popup-box">
        <Box className="popup-box-header">
          <Box className="popup-box-inner">
            <Box
              component="img"
              src={icons.errorRoundedIcon}
              alt="error-rounded"
            />
            <Box className="popup-box-content">
              <Typography variant="h6">{title}</Typography>
              <Typography
                variant="body2"
                sx={{ color: "var(--text-secondary)" }}
              >
                {message}
              </Typography>
            </Box>
          </Box>
          <Box
            component="img"
            className="popup-cancel-icon"
            src={icons.cancelIcon}
            alt="cancel"
            onClick={() => !loading && handleClose()}
            sx={{ cursor: `${loading ? "default" : "pointer"}` }}
          />
        </Box>
        <Box className="popup-action">
          {enableCancelButton && (
            <Button
              disabled={loading}
              variant="contained"
              color="tertiary"
              disableElevation
              className="popup-cancel-button"
              onClick={() => !loading && handleClose()}
            >
              <Typography variant="button1">{t("popup.cancel")}</Typography>
            </Button>
          )}
          <Button
            disabled={loading}
            variant="contained"
            disableElevation
            className="popup-confirm-button"
            onClick={onClick}
          >
            {loading ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress size={28} sx={{ color: "white" }} />
              </Box>
            ) : (
              <Typography variant="button1">{t("popup.delete")}</Typography>
            )}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PopUp;
