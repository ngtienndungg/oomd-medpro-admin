import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import icons from "../../../utils/icons";

export default function Sidebar() {
  const { isOpenSidebar } = useSelector((state) => state.app);
  const { current } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();

  const sidebarAdmin = [
    {
      id: 1,

      child: [{ name: "DASHBOARD", path: "", icon: icons.dashboard }],
    },
    {
      id: 2,
      child: [
        { name: t("user.user"), path: "users", icon: icons.user },
        { name: t("doctor.doctor"), path: "doctors", icon: icons.doctor },
      ],
    },
    {
      id: 3,
      child: [
        {
          name: t("doctor-appointment-schedule"),
          path: "schedules",
          icon: icons.timeDoctor,
        },
        {
          name: t("patient-appointment-schedule"),
          path: "bookings",
          icon: icons.timePatient,
        },
      ],
    },
    {
      id: 4,
      child: [
        {
          name: t("hospital.hospital"),
          path: "clinics",
          icon: icons.hospital,
        },
        {
          name: t("specialty.specialty"),
          path: "specialtys",
          icon: icons.specialty,
        },
      ],
    },
  ];
  const sidebarHost = [
    {
      id: 1,
      child: [
        { name: t("doctor.doctor"), path: "doctors", icon: icons.doctor },
      ],
    },
    {
      id: 2,
      child: [
        {
          name: t("doctor-appointment-schedule"),
          path: "schedules",
          icon: icons.timeDoctor,
        },
        {
          name: t("patient-appointment-schedule"),
          path: "bookings",
          icon: icons.timePatient,
        },
      ],
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={isOpenSidebar}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {current?.role === 1
          ? sidebarAdmin?.map((el, index) => (
              <Box key={index}>
                <List>
                  {el?.child?.map((el, index) => (
                    <ListItem
                      disablePadding
                      sx={{ display: "flex", justifyContent: "center" }}
                      key={index}
                      selected={location?.pathname.split("/")[1] === el?.path}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                        onClick={() => navigate(`/${el.path}`)}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3.5 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <img src={el?.icon} alt="" />
                        </ListItemIcon>
                        <Typography
                          variant="button1"
                          className="truncate_1"
                          sx={{ display: "block" }}
                        >
                          {el?.name}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </Box>
            ))
          : sidebarHost?.map((el, index) => (
              <Box key={index}>
                <List>
                  {el?.child?.map((el, index) => (
                    <ListItem
                      disablePadding
                      sx={{ display: "flex", justifyContent: "center" }}
                      key={index}
                      selected={location?.pathname.split("/")[1] === el?.path}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                        onClick={() => navigate(`/${el.path}`)}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3.5 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <img src={el?.icon} alt="" />
                        </ListItemIcon>
                        <Typography variant="button1">{el?.name}</Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </Box>
            ))}
      </Drawer>
    </Box>
  );
}

const drawerWidth = 300;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
