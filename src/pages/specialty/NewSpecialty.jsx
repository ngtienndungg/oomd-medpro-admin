import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSpecialty } from "../../store/specialtys/asyncAction";
import {
  Button,
  Typography,
  Box,
  Stack,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Helmet, InputField, MarkdownEditor } from "../../components";
import icons from "../../utils/icons";
import { getBase64 } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { resetSpecialtyStatus } from "../../store/specialtys/specialtySlice";
import useNotification from "../../hooks/useNotification";

const NewSpecialty = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { DriveFolderUploadOutlinedIcon } = icons;
  const dispatch = useDispatch();
  const { displayNotification } = useNotification();
  const { loading, errorAction, successAction } = useSelector(
    (state) => state.specialty
  );

  const [invalidFields, setInvalidFields] = useState([]);
  const [image, setImage] = useState(undefined);
  const [payload, setPayload] = useState({});

  const handleSubmit = async () => {
    let a;
    if (image) {
      a = await getBase64(image);
    }
    dispatch(
      addSpecialty({
        ...payload,
        ...{ image: a },
      })
    );
  };
  useEffect(() => {
    if (successAction || errorAction) {
      if (successAction) {
        setPayload({});
        setImage(undefined);
      }
      displayNotification({
        message: successAction || errorAction,
        severity: successAction ? "success" : "error",
        title: successAction ? t("success") : t("failed"),
      });
      dispatch(resetSpecialtyStatus());
    }
  }, [successAction, errorAction]);

  return (
    <Helmet title="New Specialty">
      <Box
        sx={{
          backgroundColor: "var(--white)",
          padding: "20px",
          margin: "20px",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ display: "flex", padding: "10px" }}>
          <Typography variant="h5">{t("specialty.add-specialty")}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            margin: "20px",
            gap: "20px",
          }}
        >
          <Box sx={{ display: "flex", gap: "20px", marginX: "28px" }}>
            <Grid
              mobile={6}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
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
                    width: "100%",
                    height: "100%",
                    // borderRadius: "50%",
                    objectFit: "contain",
                  }}
                  src={
                    image
                      ? URL.createObjectURL(image)
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
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid mobile={6}>
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
                        value={payload.name || ""}
                        setValue={setPayload}
                        nameKey="name"
                      />
                    </Stack>
                    <Stack width="100%" spacing="8px" direction="row">
                      <MarkdownEditor
                        nameKey="description"
                        label={t("description")}
                        setValue={setPayload}
                        value={payload.description || ""}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                      />
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Box>
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
            onClick={() => navigate("/specialtys")}
          >
            <Typography variant="button1"> {t("back")}</Typography>
          </Button>
        </Box>
      </Box>
    </Helmet>
  );
};

export default memo(NewSpecialty);
