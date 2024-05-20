import React from "react";
import { Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "moment/locale/vi";

const SelectDate = ({ value, setValue, nameKey, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {label && <Typography variant="label1">{label}</Typography>}
        <DatePicker
          selected={value}
          defaultValue={moment.utc(value)}
          format="DD/MM/YYYY"
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [nameKey]: new Date(e).getTime() }))
          }
          minDate={moment()}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default SelectDate;
