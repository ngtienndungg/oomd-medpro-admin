import React, { memo } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import EmptyPage from "../emptyPage/EmptyPage";

const SelectAddress = ({ label, options, value, setValue, type }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "100%",
      }}
    >
      <Typography variant="label1">{label}</Typography>
      <Select
        size="small"
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
        id="select"
        displayEmpty
        defaultValue=""
      >
        <MenuItem value="" sx={{ display: "none" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="body2">
              {`--${t("select")} ${label}--`}
            </Typography>
          </Box>
        </MenuItem>

        {options?.length > 0 ? (
          options?.map((el) => {
            return (
              <MenuItem
                key={
                  type === "province"
                    ? el?.province_id
                    : type === "district"
                    ? el?.district_id
                    : el?.ward_id
                }
                value={
                  type === "province"
                    ? el?.province_id
                    : type === "district"
                    ? el?.district_id
                    : el?.ward_id
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography variant="body2">
                    {type === "province"
                      ? el?.province_name
                      : type === "district"
                      ? el?.district_name
                      : el?.ward_name}
                  </Typography>
                </Box>
              </MenuItem>
            );
          })
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
    </Box>
  );
};

export default memo(SelectAddress);
