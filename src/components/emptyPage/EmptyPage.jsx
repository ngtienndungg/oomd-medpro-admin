import React from "react";
import "./style.scss";
import { Box, Typography, Stack } from "@mui/material";
import icons from "../../utils/icons";

export default function EmptyPage({ title, message }) {
  return (
    <Box className="emptyDevice-container">
      <img src={icons.emptyIcon} alt="Empty" width={120} height={120} />
      <Stack
        sx={{
          marginTop: "24px",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" sx={{ marginTop: "8px" }}>
          {message}
        </Typography>
      </Stack>
    </Box>
  );
}
