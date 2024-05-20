import "./style.scss";

import {
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";

import { Link } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import icons from "../../../utils/icons";
import { logout } from "../../../store/auth/authSlice";

const ProfilePopUp = (props) => {
  const { userInfo } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const anchorRefProfile = useRef(null);

  const [openProfile, setOpenProfile] = useState(false);

  const handleToggleProfile = () => {
    setOpenProfile((prevOpen) => !prevOpen);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Box
        sx={{ cursor: "pointer" }}
        ref={anchorRefProfile}
        onClick={handleToggleProfile}
      >
        <Avatar
          sx={{ width: 32, height: 32 }}
          src={userInfo?.avatar || icons.noUser}
          className="avatar"
          alt="User Avatar"
        />
      </Box>
      <Popper
        open={openProfile}
        anchorEl={anchorRefProfile.current}
        id="popup-profile"
      >
        <ClickAwayListener onClickAway={handleCloseProfile}>
          <Paper>
            <MenuList
              autoFocusItem={openProfile}
              sx={{ width: "250px" }}
              id="menu-list-grow"
            >
              <Stack
                direction="row"
                alignItems={"center"}
                spacing={2}
                px={2}
                py={1}
              >
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  src={userInfo?.avatar || icons.noUser}
                  alt="User Avatar"
                />
                <Box>
                  <Typography variant="label1">{userInfo?.fullName}</Typography>
                </Box>
              </Stack>

              <Divider sx={{ marginX: "12px" }} />

              <MenuItem onClick={handleLogOut}>
                <Link to={"/login"}>
                  <Stack direction="row" alignItems={"center"} spacing={1}>
                    <LogoutOutlinedIcon />
                    <Typography variant="body2">{t("logout")}</Typography>
                  </Stack>
                </Link>
              </MenuItem>
            </MenuList>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};
export default ProfilePopUp;
