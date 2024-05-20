import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { updateDoctor } from "../../store/doctors/asyncAction";
import {
  Button,
  Typography,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomSelect, InputField, MarkdownEditor } from "../../components";
import * as apis from "../../apis";

const UpdateDoctor = ({ data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.doctor);
  const { current } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [specialtys, setSpecialtys] = useState([]);

  const [invalidFields, setInvalidFields] = useState([]);
  const [id, setId] = useState(undefined);
  const [payload, setPayload] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
    setId(data?.id);
    setPayload((prev) => ({ ...prev, specialtyID: data?.specialtyID }));
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchApiClinic = async () => {
    let response;
    if (current?.role === 1) {
      response = await apis.apiGetAllClinics();
    } else {
      response = await apis.apiGetAllClinics({ host: current?._id });
    }
    if (response?.success) {
      setClinics(response?.data);
    }
    const clinic = await apis.apiGetClinic(data?.clinicID);
    if (clinic?.success) {
      setSpecialtys(clinic?.data?.specialtyID);
    }
  };

  useEffect(() => {
    open && fetchApiClinic();
  }, [open]);
  useEffect(() => {
    let clinic = clinics.find((el) => el._id === payload.clinicID);
    setPayload((prev) => ({ ...prev, specialtyID: "" }));
    setSpecialtys(clinic?.specialtyID);
  }, [payload.clinicID]);

  const handleSubmit = () => {
    if (payload.specialtyID === data?.specialtyID) {
      delete payload.specialtyID;
    }
    id &&
      dispatch(
        updateDoctor({
          id,
          data: payload,
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
                <Stack width="100%" spacing="8px" direction="column">
                  <InputField
                    label={t("doctor.name")}
                    placeholder={t("doctor.name")}
                    style={{
                      width: "45%",
                    }}
                    value={data?.fullName}
                    setValue={setPayload}
                  />
                </Stack>
                <Stack width="100%" spacing="8px" direction="column">
                  <CustomSelect
                    label={t("hospital.name")}
                    value={payload.clinicID ? payload.clinicID : data?.clinicID}
                    setValue={setPayload}
                    nameKey="clinicID"
                    options={clinics}
                  />
                </Stack>
                <Stack width="100%" spacing="8px" direction="column">
                  <CustomSelect
                    label={t("specialty.name")}
                    value={payload.specialtyID}
                    setValue={setPayload}
                    nameKey="specialtyID"
                    options={specialtys}
                  />
                </Stack>
                <Stack width="100%" spacing="16px" direction="row">
                  <InputField
                    label={t("doctor.position")}
                    placeholder={t("doctor.position")}
                    sx={{
                      width: "50%",
                    }}
                    value={
                      payload.position === "" || payload.position
                        ? payload.position
                        : data?.position
                    }
                    setValue={setPayload}
                    nameKey="position"
                  />
                  <InputField
                    label={t("doctor.roomID")}
                    placeholder={t("doctor.roomID")}
                    sx={{
                      width: "50%",
                    }}
                    value={
                      payload.roomID === "" || payload.roomID
                        ? payload.roomID
                        : data?.roomID
                    }
                    setValue={setPayload}
                    nameKey="roomID"
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

export default memo(UpdateDoctor);
