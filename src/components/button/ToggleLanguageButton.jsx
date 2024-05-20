import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ToggleLanguageButton = ({ languages }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handlerChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  useEffect(() => {
    if (localStorage.getItem("lng")) {
      const curLng = localStorage.getItem("lng");
      i18n.changeLanguage(curLng);
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        backgroundColor: "rgba(173, 201, 245, 1)",
        padding: "4px",
      }}
    >
      {languages.map((el, index) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
            padding: "4px 8px",
            cursor: "pointer",
            gap: "8px",
            backgroundColor:
              currentLanguage === el?.lng ? "rgba(119, 165, 238, 1)" : "",
          }}
          key={index}
          onClick={() => handlerChangeLanguage(el?.lng)}
        >
          <img src={el?.icon} alt="" />
          <Typography
            variant="button1"
            sx={{
              color:
                currentLanguage === el?.lng
                  ? "var(--white)"
                  : "rgba(128, 128, 128, 1)",
            }}
          >
            {el?.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ToggleLanguageButton;
