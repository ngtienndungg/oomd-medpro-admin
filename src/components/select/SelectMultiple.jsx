import React from "react";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import icons from "../../utils/icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SelectMultiple = ({
  label,
  value,
  setValue,
  options,
  endIcon,
  disabled = false,
  onClick,
}) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <Typography variant="label1">{label}</Typography>

      <Select
        sx={{ height: "40px", borderRadius: "6px", border: "1" }}
        disabled={disabled}
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={value}
        onChange={handleChange}
        renderValue={(selected) =>
          selected
            .map((id) => options.find((option) => option._id === id)?.name)
            .join(", ")
        }
        MenuProps={MenuProps}
        size="small"
        IconComponent={() => (endIcon ? null : <ArrowDropDownIcon />)}
        endAdornment={
          <IconButton sx={{ display: endIcon ? "" : "none" }} onClick={onClick}>
            <img src={endIcon} alt="" />
          </IconButton>
        }
      >
        {options.map((el, index) => (
          <MenuItem key={index} value={el._id}>
            <Checkbox checked={value.includes(el._id)} />
            <ListItemText primary={el.name} />
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectMultiple;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
