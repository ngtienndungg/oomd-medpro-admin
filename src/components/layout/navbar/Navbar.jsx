import "./style.scss";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import ButtonLanguage from "./ButtonLanguage";
import NotiPopUp from "./NotiPopUp";
import ProfilePopUp from "./ProfilePopUp";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { changeOpenSidebar } from "../../../store/app/appSlice";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { getCurrent } from "../../../store/auth/asyncAction";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));
const Navbar = () => {
  const { isLoggedIn, current } = useSelector((state) => state.auth);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isOpenSidebar } = useSelector((state) => state.app);

  const lang = localStorage.getItem("lng");

  //language
  const handleChangeLanguage = (value) => {
    localStorage.setItem("lng", value);
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    const setTimeoutID = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => {
      clearTimeout(setTimeoutID);
    };
  }, [dispatch, isLoggedIn]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "var(--white)", color: "black" }}
      >
        <Toolbar>
          <Container className="header-sticky">
            <Container className="header-container">
              <Box component={"div"} className="header-component-left">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                  onClick={() =>
                    dispatch(
                      changeOpenSidebar({ isOpenSidebar: !isOpenSidebar })
                    )
                  }
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  {current?.role === 1 ? "Admin" : "Host"}
                </Typography>
              </Box>
              <Box component={"div"} className="header-component-right">
                <Stack spacing={3} direction={"row"} alignItems={"center"}>
                  <ButtonLanguage
                    handleClick={() =>
                      handleChangeLanguage(lang && lang === "en" ? "vi" : "en")
                    }
                  />
                  <NotiPopUp />
                  <ProfilePopUp userInfo={current} />
                </Stack>
              </Box>
            </Container>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
