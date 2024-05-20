import "./style.scss";
import { Box, Typography } from "@mui/material";
import React from "react";
import icons from "../../../utils/icons";

const ButtonLanguage = ({ handleClick }) => {
  const lang = localStorage.getItem("lng");

  return (
    <Box
      aria-haspopup="true"
      onClick={handleClick}
      component={"div"}
      className="btn-language"
      id={"btn-language-header"}
    >
      {lang && lang === "vi" ? (
        <>
          <img src={icons.vietnam} className="flag" alt="" />
          <Typography variant="button">VN</Typography>
        </>
      ) : (
        <>
          <img src={icons.usa} className="flag" alt="" />
          <Typography variant="button">EN</Typography>
        </>
      )}
    </Box>
  );
};

export default ButtonLanguage;
