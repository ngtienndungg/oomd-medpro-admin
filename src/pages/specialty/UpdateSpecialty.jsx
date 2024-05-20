import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { updateSpecialty } from "../../store/specialtys/asyncAction";
import {
  Button,
  Typography,
  Box,
  Stack,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { InputField, MarkdownEditor } from "../../components";
import icons from "../../utils/icons";
import { getBase64 } from "../../utils/helper";

const UpdateSpecialty = ({ data }) => {
  const { t } = useTranslation();
  const { DriveFolderUploadOutlinedIcon } = icons;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.specialty);
  const [open, setOpen] = useState(false);

  const [invalidFields, setInvalidFields] = useState([]);
  const [id, setId] = useState(undefined);
  const [preImg, setPreImg] = useState("");
  const [image, setImage] = useState(undefined);
  const [payload, setPayload] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
    setId(data?.id);
    setPreImg(data?.image);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    let a;
    if (image) {
      a = await getBase64(image);
    }
    id &&
      dispatch(
        updateSpecialty({
          id,
          data: {
            ...payload,
            ...{ image: a },
          },
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
          <Grid item sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid
              mobile={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : preImg
                    ? preImg
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
              <Box sx={{ padding: "24px 0" }}>
                <label
                  htmlFor="file"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography variant="label1">{t("img")}:</Typography>
                  <DriveFolderUploadOutlinedIcon sx={{ cursor: "pointer" }} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </Box>
            </Grid>
            <Grid mobile={7}>
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
                        label={t("specialty.name")}
                        placeholder={t("specialty.name")}
                        style={{
                          width: "45%",
                        }}
                        value={
                          payload.name === "" || payload.name
                            ? payload.name
                            : data?.name
                        }
                        setValue={setPayload}
                        nameKey="name"
                      />
                    </Stack>
                    <Stack width="100%" spacing="8px" direction="row">
                      <MarkdownEditor
                        nameKey="description"
                        label={t("description")}
                        setValue={setPayload}
                        value={
                          payload.description === "" || payload.description
                            ? payload.description
                            : data?.description
                        }
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                      />
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
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

export default memo(UpdateSpecialty);
