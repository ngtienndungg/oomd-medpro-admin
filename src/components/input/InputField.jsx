import React from "react";
import { TextField } from "@mui/material";

const InputField = ({
  label,
  placeholder,
  value,
  setValue,
  nameKey,
  disabled = false,
  type = "text",
  style,
}) => {
  return (
    <TextField
      sx={style}
      disabled={disabled}
      label={label}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue((prev) => ({ ...prev, [nameKey]: e.target.value }));
      }}
    />
  );
};

export default InputField;
