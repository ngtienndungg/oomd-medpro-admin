import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  addSpecialtyOfClinic,
  deleteSpecialtyOfClinic,
  updateClinic,
} from "../../store/clinics/asyncAction";
import {
  Button,
  Typography,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  Address,
  CustomSelect,
  InputField,
  MarkdownEditor,
  SelectMultiple,
} from "../../components";
import * as apis from "../../apis";
import icons from "../../utils/icons";
import { getBase64 } from "../../utils/helper";

const UpdateClinic = ({ data }) => {
  const { DriveFolderUploadOutlinedIcon } = icons;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.doctor);
  const [open, setOpen] = useState(false);
  const [specialtys, setSpecialtys] = useState([]);
  const [preview, setPreview] = useState({
    image: null,
    descriptionImg: [],
  });

  const [invalidFields, setInvalidFields] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [id, setId] = useState(undefined);
  const [specialtyID, setspecialtyID] = useState([]);
  const [specialtyID2, setspecialtyID2] = useState([]);
  const [payload, setPayload] = useState({});
  const [specialtyIdDelete, setSpecialtyIdDelete] = useState([]);
  const [specialtyIdAdd, setSpecialtyIdAdd] = useState([]);
  const [descriptionImgDelete, setDescriptionImgDelete] = useState([]);
  const [descriptionImgAdd, setDescriptionImgAdd] = useState([]);
  const [hoverElm, setHoverElm] = useState(null);
  const [hoverImg, setHoverImg] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setId(data?.id);
    setPreview({
      image: data?.image,
      descriptionImg: data?.descriptionImg,
    });
    setspecialtyID(data?.specialtyID);
    let result = specialtys?.filter(
      (obj1) => !data?.specialtyID.some((obj2) => obj1._id === obj2._id)
    );
    setspecialtyID2(result);
  };
  const handleClose = () => {
    setOpen(false);
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

  const handleDeleteSpecialty = () => {
    dispatch(
      deleteSpecialtyOfClinic({ id, data: { specialtyID: specialtyIdDelete } })
    );
  };
  const handleAddSpecialty = () => {
    dispatch(
      addSpecialtyOfClinic({ id, data: { specialtyID: specialtyIdAdd } })
    );
  };
  const handlePreviewImage = async (file) => {
    const base64Image = await getBase64(file);
    setPreview((prev) => ({ ...prev, image: base64Image }));
  };
  const handlePreviewDescriptionImg = async (files) => {
    let imagesPreview = preview?.descriptionImg?.map((el) => el);

    for (let file of files) {
      const base64Image = await getBase64(file);
      imagesPreview.push(base64Image);
    }

    setPreview((prev) => ({ ...prev, descriptionImg: imagesPreview }));
    setDescriptionImgAdd(imagesPreview.filter((el) => !el?.includes("http")));
  };
  const handleDeletePreviewDescriptionImg = (img) => {
    let imgDelete = descriptionImgDelete;

    setPreview((prev) => ({
      ...prev,
      descriptionImg: prev?.descriptionImg?.filter((item) => item !== img),
    }));
    if (img?.includes("http")) imgDelete?.push(img);
    setDescriptionImgDelete(imgDelete);
  };

  const handleSubmit = () => {
    const data = {
      ...payload,
      descriptionImgAdd,
      descriptionImgDelete,
      image: preview?.image?.includes("http://") ? undefined : preview?.image,
    };

    id &&
      dispatch(
        updateClinic({
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
      <Dialog open={open} onClose={handleClose} fullWidth={false}>
        <DialogTitle>{t("update-infomation")}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              padding: "10px",
              margin: "20px",
              gap: "20px",
            }}
          >
            <Box sx={{ display: "flex", gap: "20px", marginX: "28px" }}>
              <Stack
                direction="column"
                alignItems="flex-start"
                spacing="16px"
                width="100%"
              >
                <Stack width="100%" spacing="8px" direction="row">
                  <InputField
                    label={t("hospital.name")}
                    placeholder={t("hospital.name")}
                    value={
                      payload.name === "" || payload.name
                        ? payload.name
                        : data?.name
                    }
                    setValue={setPayload}
                    nameKey="name"
                  />
                </Stack>
                <Address
                  payload={{
                    province: data?.province,
                    district: data?.district,
                    ward: data?.ward,
                  }}
                  setPayload={setPayload}
                />
                <Stack width="100%" spacing="8px" direction="column">
                  <SelectMultiple
                    label={t("hospital.hospital-specialties")}
                    options={specialtyID}
                    value={specialtyIdDelete}
                    setValue={setSpecialtyIdDelete}
                    endIcon={icons?.deleteIcon}
                    onClick={() => handleDeleteSpecialty()}
                  />
                  <SelectMultiple
                    label={t("hospital.non-hospital-specialties")}
                    options={specialtyID2}
                    value={specialtyIdAdd}
                    setValue={setSpecialtyIdAdd}
                    endIcon={icons?.addIcon}
                    onClick={() => handleAddSpecialty()}
                  />
                </Stack>
                <Stack width="100%" spacing="8px" direction="column">
                  <CustomSelect
                    label={t("hospital.host")}
                    value={
                      payload.host === "" || payload.host
                        ? payload.host
                        : data?.host?._id
                    }
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
                    value={
                      payload.description === "" || payload.description
                        ? payload.description
                        : data?.description
                    }
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
                    onChange={(e) =>
                      handlePreviewDescriptionImg(e.target.files)
                    }
                    style={{ display: "none" }}
                  />
                </Stack>
                {preview?.descriptionImg?.length > 0 && (
                  <Stack
                    direction="row"
                    sx={{
                      display: "flex",
                      maxWidth: "100%",
                      overflowX: "auto",
                    }}
                  >
                    {preview?.descriptionImg?.map((el, index) => (
                      <Box
                        key={index}
                        onMouseEnter={() => setHoverElm(el)}
                        onMouseLeave={() => setHoverElm(null)}
                        sx={{
                          position: "relative",
                          maxWidth: "100%",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          key={index}
                          src={el}
                          alt=""
                          style={{
                            width: "200px",
                            height: "200px",
                            maxWidth: "100%",
                            marginRight: "20px",
                            display: "block",
                          }}
                        />
                        {hoverElm == el && (
                          <Box
                            className="overlay"
                            sx={{ cursor: "pointer" }}
                            onClick={() =>
                              handleDeletePreviewDescriptionImg(el)
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

export default memo(UpdateClinic);
