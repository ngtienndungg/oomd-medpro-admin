import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { updateUser } from "../../store/users/asyncAction";
//utils
import { genders, roleName, statusUser } from "../../utils/contants";
import { getBase64 } from "../../utils/helper";
import icons from "../../utils/icons";
import {
  Button,
  Typography,
  Box,
  Grid,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomSelect, InputField } from "../../components";

const UpdateUser = ({ data }) => {
  const { t } = useTranslation();
  const { DriveFolderUploadOutlinedIcon } = icons;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [preImg, setPreImg] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(undefined);
  const [avatar, setAvatar] = useState(undefined);

  const [payload, setPayload] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
    setPreImg(data?.avatar);
    setId(data?.id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    let a;
    if (avatar) {
      a = await getBase64(avatar);
    }
    const data = {
      ...payload,
      ...{ avatar: a },
    };
    dispatch(
      updateUser({
        id,
        data,
      })
    );
  };

  return (
    <Box>
      <Button variant="contained" color="green" onClick={handleClickOpen}>
        <Typography variant="button1"> {t("update")}</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
        <DialogTitle>{t("update-infomation")}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", padding: "10px", margin: "20px" }}>
            <Grid mobile={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
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
                      : preImg
                      ? preImg
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
                    <DriveFolderUploadOutlinedIcon sx={{ cursor: "pointer" }} />
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
                        value={data?.email}
                        setValue={setPayload}
                      />
                      <InputField
                        label={t("user.fullname")}
                        placeholder={t("user.fullname")}
                        style={{
                          width: "45%",
                        }}
                        value={
                          payload.fullName === "" || payload.fullName
                            ? payload.fullName
                            : data?.fullName
                        }
                        nameKey="fullName"
                        setValue={setPayload}
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
                        value={payload.password}
                        nameKey="password"
                        setValue={setPayload}
                      />
                      <InputField
                        label={t("user.phone")}
                        placeholder={t("user.phone")}
                        type="number"
                        style={{
                          width: "45%",
                        }}
                        value={
                          payload.mobile === "" || payload.mobile
                            ? payload.mobile
                            : data?.mobile
                        }
                        nameKey="mobile"
                        setValue={setPayload}
                      />
                    </Stack>
                    <Stack width="100%" spacing="8px" direction="row">
                      <InputField
                        label={t("user.address")}
                        placeholder={t("user.address")}
                        style={{
                          width: "45%",
                        }}
                        value={
                          payload.address === "" || payload.address
                            ? payload.address
                            : data?.address
                        }
                        nameKey="address"
                        setValue={setPayload}
                      />
                    </Stack>

                    <Stack width="100%" spacing="8px" direction="column">
                      <CustomSelect
                        label={t("user.gender")}
                        value={
                          payload.gender === "" || payload.gender
                            ? payload.gender
                            : data?.gender
                        }
                        setValue={setPayload}
                        nameKey="gender"
                        options={genders}
                      />
                    </Stack>
                    <Stack width="100%" spacing="8px" direction="column">
                      <CustomSelect
                        label={t("user.role")}
                        value={
                          payload.role === "" || payload.role
                            ? payload.role
                            : data?.role
                        }
                        setValue={setPayload}
                        nameKey="role"
                        options={roleName}
                      />
                    </Stack>
                    <Stack width="100%" spacing="8px" direction="column">
                      <CustomSelect
                        label={t("user.status")}
                        value={
                          payload.isBlocked === "" || payload.isBlocked
                            ? payload.isBlocked
                            : data?.isBlocked
                        }
                        setValue={setPayload}
                        nameKey="isBlocked"
                        options={statusUser}
                      />
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button variant="contained" color="green" onClick={handleSubmit}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography variant="button1"> {t("update")}</Typography>
            )}
          </Button>
          <Button variant="contained" color="red" onClick={handleClose}>
            <Typography variant="button1"> {t("back")}</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default memo(UpdateUser);
