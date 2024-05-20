import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//components
import { CustomSelect, Helmet, InputField } from "../../components/index";
//utils
import { getBase64 } from "../../utils/helper";
import icons from "../../utils/icons";
import {
  Button,
  Box,
  Typography,
  Grid,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { genders, roleName } from "../../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addUer } from "../../store/users/asyncAction";
import useNotification from "../../hooks/useNotification";
import { resetUserStatus } from "../../store/users/userSlice";

const NewUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { displayNotification } = useNotification();
  const { DriveFolderUploadOutlinedIcon } = icons;
  const { loading, errorAction, successAction } = useSelector(
    (state) => state.user
  );

  const [avatar, setAvatar] = useState(undefined);

  const [payload, setPayload] = useState({});

  const handleSubmit = async () => {
    let a;
    if (avatar) {
      a = await getBase64(avatar);
    }

    dispatch(
      addUer({
        ...payload,
        ...{ avatar: a },
      })
    );
  };
  useEffect(() => {
    if (successAction || errorAction) {
      if (successAction) {
        setPayload({});
      }
      displayNotification({
        message: successAction || errorAction,
        severity: successAction ? "success" : "error",
        title: successAction ? t("success") : t("failed"),
      });
      dispatch(resetUserStatus());
    }
  }, [successAction, errorAction]);
  return (
    <Helmet title="New Patient">
      <Box
        sx={{
          backgroundColor: "var(--white)",
          padding: "20px",
          margin: "20px",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ display: "flex", padding: "10px" }}>
          <Typography variant="h5">{t("user.add-user")}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            margin: "20px",
            gap: "20px",
          }}
        >
          <Grid mobile={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{
                  width: "200px",
                  height: "200ox",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
              <Box sx={{ padding: "24px" }}>
                <label
                  htmlFor="file"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  Ảnh:{" "}
                  <DriveFolderUploadOutlinedIcon className="cursor-pointer" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid mobile={8}>
            <Box>
              <Box sx={{ display: "flex", gap: "20px", marginX: "28px" }}>
                <Stack
                  direction="column"
                  alignItems="flex-start"
                  spacing="16px"
                  width="100%"
                >
                  <Stack width="100%" spacing="8px" direction="row">
                    <InputField
                      label={t("user.email")}
                      placeholder={t("user.email")}
                      style={{
                        width: "45%",
                      }}
                      value={payload.email || ""}
                      setValue={setPayload}
                      nameKey="email"
                    />
                    <InputField
                      label={t("user.fullname")}
                      placeholder={t("user.fullname")}
                      style={{
                        width: "45%",
                      }}
                      value={payload.fullName || ""}
                      setValue={setPayload}
                      nameKey="fullName"
                    />
                  </Stack>
                  <Stack width="100%" spacing="8px" direction="row">
                    <InputField
                      label={t("user.password")}
                      placeholder={t("user.password")}
                      type="password"
                      style={{
                        width: "45%",
                      }}
                      value={payload.password || ""}
                      setValue={setPayload}
                      nameKey="password"
                    />
                    <InputField
                      label={t("user.phone")}
                      placeholder={t("user.phone")}
                      type="number"
                      style={{
                        width: "45%",
                      }}
                      value={payload.mobile || ""}
                      setValue={setPayload}
                      nameKey="mobile"
                    />
                  </Stack>
                  <Stack width="100%" spacing="8px" direction="row">
                    <InputField
                      label={t("user.address")}
                      placeholder={t("user.address")}
                      style={{
                        width: "45%",
                      }}
                      value={payload.address || ""}
                      setValue={setPayload}
                      nameKey="address"
                    />
                  </Stack>

                  <Stack width="100%" spacing="8px" direction="column">
                    <CustomSelect
                      label={t("user.gender")}
                      value={payload.gender || ""}
                      setValue={setPayload}
                      nameKey="gender"
                      options={genders}
                    />
                  </Stack>
                  <Stack width="100%" spacing="8px" direction="column">
                    <CustomSelect
                      label={t("user.role")}
                      value={payload.role || ""}
                      setValue={setPayload}
                      nameKey="role"
                      options={roleName}
                    />
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <Button variant="contained" color="green" onClick={handleSubmit}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography variant="button1"> {t("add")}</Typography>
            )}
          </Button>
          <Button
            variant="contained"
            color="red"
            onClick={() => navigate("/users")}
          >
            <Typography variant="button1"> {t("back")}</Typography>
          </Button>
        </Box>
      </Box>
    </Helmet>
  );
};

export default NewUser;
