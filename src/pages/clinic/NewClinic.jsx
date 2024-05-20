import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Typography,
  Box,
  Stack,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  Address,
  CustomSelect,
  Helmet,
  InputField,
  MarkdownEditor,
  SelectMultiple,
} from "../../components";
import icons from "../../utils/icons";
import { getBase64 } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { resetClinicStatus } from "../../store/clinics/clinicSlice";
import useNotification from "../../hooks/useNotification";
import * as apis from "../../apis";
import { addClinic } from "../../store/clinics/asyncAction";

const NewClinic = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { DriveFolderUploadOutlinedIcon } = icons;
  const dispatch = useDispatch();
  const { displayNotification } = useNotification();
  const { loading, errorAction, successAction } = useSelector(
    (state) => state.clinic
  );

  const [invalidFields, setInvalidFields] = useState([]);
  const [hoverElm, setHoverElm] = useState(null);
  const [hoverImg, setHoverImg] = useState(false);
  const [hosts, setHosts] = useState([]);
  const [specialtys, setSpecialtys] = useState([]);
  const [specialtyID, setspecialtyID] = useState([]);
  const [payload, setPayload] = useState({});
  const [preview, setPreview] = useState({
    image: null,
    descriptionImg: [],
  });

  const handlePreviewImage = async (file) => {
    const base64Image = await getBase64(file);
    setPreview((prev) => ({ ...prev, image: base64Image }));
  };
  const handlePreviewDescriptionImg = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      const base64Image = await getBase64(file);
      imagesPreview.push({
        name: file.name,
        path: base64Image,
      });
    }
    setPreview((prev) => ({ ...prev, descriptionImg: imagesPreview }));
  };
  const resetState = () => {
    setPayload({});
    setspecialtyID([]);
    setPreview({
      image: null,
      descriptionImg: [],
    });
  };
  const fetchApiHost = async () => {
    const response = await apis.apiGetAllUsers({ role: 2 });
    if (response?.success) {
      setHosts(response?.data);
    }
  };
  const fetchApiSpecialtys = async () => {
    const response = await apis.apiGetAllSpecialtys();
    if (response?.success) {
      setSpecialtys(response?.data);
    }
  };
  useEffect(() => {
    fetchApiHost();
    fetchApiSpecialtys();
  }, []);

  const handleSubmit = async () => {
    preview?.descriptionImg?.forEach((obj, index, arr) => {
      arr[index] = obj?.path;
    });
    dispatch(
      addClinic({
        ...payload,
        ...preview,
        ...{ specialtyID },
      })
    );
  };
  useEffect(() => {
    if (successAction || errorAction) {
      if (successAction) {
        resetState();
      }
      displayNotification({
        message: successAction || errorAction,
        severity: successAction ? "success" : "error",
        title: successAction ? t("success") : t("failed"),
      });
      dispatch(resetClinicStatus());
    }
  }, [successAction, errorAction]);

  return (
    <Helmet title={t("hospital.add-hospital")}>
      <Box
        sx={{
          backgroundColor: "var(--white)",
          padding: "20px",
          margin: "20px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5">{t("hospital.add-hospital")}</Typography>
        <Box
          sx={{
            padding: "10px",
            margin: "20px",
          }}
        >
          <Stack
            direction="column"
            alignItems="flex-start"
            spacing="32px"
            width="100%"
          >
            <Stack width="100%" spacing="8px" direction="row">
              <InputField
                label={t("hospital.name")}
                placeholder={t("hospital.name")}
                value={payload.name || ""}
                setValue={setPayload}
                nameKey="name"
              />
              <Stack
                width="100%"
                spacing="8px"
                direction="column"
                sx={{ maxWidth: { mobile: "300px", tablet: "500px" } }}
              >
                <SelectMultiple
                  label={t("specialty.list")}
                  options={specialtys}
                  value={specialtyID}
                  setValue={setspecialtyID}
                />
              </Stack>
            </Stack>
            <Address payload={payload} setPayload={setPayload} />

            <Stack width="100%" spacing="8px" direction="column">
              <CustomSelect
                label={t("hospital.host")}
                value={payload.host || ""}
                setValue={setPayload}
                nameKey="host"
                options={hosts}
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

            <Stack width="100%" spacing="8px" direction="row">
              <label
                htmlFor="image"
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
                id="image"
                onChange={(e) => handlePreviewImage(e.target.files[0])}
                style={{ display: "none" }}
              />
            </Stack>
            {preview?.image && (
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  maxWidth: "100%",
                  overflowX: "auto",
                }}
              >
                <Box
                  onMouseEnter={() => setHoverImg(true)}
                  onMouseLeave={() => setHoverImg(false)}
                  sx={{
                    position: "relative",
                    maxWidth: "100%",
                    flexShrink: 0,
                  }}
                >
                  <img
                    style={{
                      width: "200px",
                      height: "200px",
                    }}
                    src={preview?.image}
                    alt=""
                  />
                  {hoverImg && (
                    <Box
                      className="overlay"
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setHoverImg(false);
                        setPreview((prev) => ({
                          ...prev,
                          image: null,
                        }));
                      }}
                    >
                      <img src={icons?.deleteIcon} alt="" />
                    </Box>
                  )}
                </Box>
              </Stack>
            )}
            <Stack width="100%" spacing="8px" direction="row">
              <label
                htmlFor="descriptionImg"
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
                id="descriptionImg"
                multiple
                onChange={(e) => handlePreviewDescriptionImg(e.target.files)}
                style={{ display: "none" }}
              />
            </Stack>
            {preview?.descriptionImg.length > 0 && (
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  maxWidth: "100%", // Đảm bảo không vượt quá chiều rộng của phần tử cha
                  overflowX: "auto",
                }}
              >
                {preview?.descriptionImg?.map((el, index) => (
                  <Box
                    key={index}
                    onMouseEnter={() => setHoverElm(el.name)}
                    onMouseLeave={() => setHoverElm(null)}
                    sx={{
                      position: "relative",
                      maxWidth: "100%",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      key={index}
                      src={el.path}
                      alt=""
                      style={{
                        width: "200px",
                        height: "200px",
                        maxWidth: "100%",

                        display: "block",
                      }}
                    />
                    {hoverElm == el?.name && (
                      <Box
                        className="overlay"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          setPreview((prev) => ({
                            ...prev,
                            descriptionImg: prev?.descriptionImg?.filter(
                              (item) => item?.name !== el.name
                            ),
                          }))
                        }
                      >
                        <img src={icons?.deleteIcon} alt="" />
                      </Box>
                    )}
                  </Box>
                ))}
              </Stack>
            )}
          </Stack>
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
            onClick={() => navigate("/clinics")}
          >
            <Typography variant="button1"> {t("back")}</Typography>
          </Button>
        </Box>
      </Box>
    </Helmet>
  );
};

export default memo(NewClinic);
