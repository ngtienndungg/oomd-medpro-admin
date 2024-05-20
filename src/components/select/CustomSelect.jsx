import React from "react";
import { Select, MenuItem, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import EmptyPage from "../emptyPage/EmptyPage";
const CustomSelect = ({
  label,
  value,
  setValue,
  nameKey,
  options,
  disabled = false,
}) => {
  const { t } = useTranslation();
  return (
    <>
      {label && <Typography variant="label1">{label}:</Typography>}
      <Select
        disabled={disabled}
        size="small"
        displayEmpty
        value={value}
        onChange={(e) => {
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }));
        }}
      >
        <MenuItem value="" sx={{ display: "none" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="body2">{`-- ${label} --`}</Typography>
          </Box>
        </MenuItem>
        {options?.length > 0 ? (
          options?.map((item, index) => (
            <MenuItem key={index} value={item._id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="body2">
                  {t(
                    item.name ? item.name : `${item.fullName} (${item.email})`
                  )}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <EmptyPage
                title={t("data-not-found")}
                message={t("please-add-data")}
              />
            </Box>
          </MenuItem>
        )}
      </Select>
    </>
  );
};

export default CustomSelect;
