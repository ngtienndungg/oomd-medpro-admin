import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomSelect,
  Helmet,
  InputField,
  MarkdownEditor,
} from "../../components/index";
import useNotification from "../../hooks/useNotification";
import { useTranslation } from "react-i18next";
import {
  Button,
  Box,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import * as apis from "../../apis";
import { addDoctor } from "../../store/doctors/asyncAction";
import { resetUserStatus } from "../../store/users/userSlice";

const NewDoctor = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { displayNotification } = useNotification();
  const { loading, errorAction, successAction } = useSelector(
    (state) => state.doctor
  );
  const { current } = useSelector((state) => state.auth);

  const [clinics, setClinics] = useState([]);
  const [specialtys, setSpecialtys] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({});

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
  };
  const fetchApiUser = async () => {
    const response = await apis.apiGetAllUsers({ role: 3 });
    if (response?.success) {
      setDoctors(response?.data);
    }
  };
  useEffect(() => {
    fetchApiClinic();
    fetchApiUser();
  }, []);
  useEffect(() => {
    let clinic = clinics.find((el) => el._id === payload?.clinicID);
    setPayload((prev) => ({ ...prev, specialtyID: "" }));
    setSpecialtys(clinic?.specialtyID);
  }, [payload?.clinicID]);

  const handleSubmit = async () => {
    dispatch(addDoctor(payload));
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
    <Helmet title="New Doctor">
      <Box
        sx={{
          backgroundColor: "var(--white)",
          padding: "20px",
          margin: "20px",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ display: "flex", padding: "10px" }}>
          <Typography variant="h5">{t("doctor.add-doctor")}</Typography>
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
            <Stack
              direction="column"
              alignItems="flex-start"
              spacing="16px"
              width="100%"
            >
              <Stack width="100%" spacing="8px" direction="column">
                <CustomSelect
                  label={t("doctor.name")}
                  value={payload.id || ""}
                  setValue={setPayload}
                  nameKey="id"
                  options={doctors}
                />
              </Stack>
              <Stack width="100%" spacing="8px" direction="column">
                <CustomSelect
                  label={t("hospital.name")}
                  value={payload.clinicID || ""}
                  setValue={setPayload}
                  nameKey="clinicID"
                  options={clinics}
                />
              </Stack>
              <Stack width="100%" spacing="8px" direction="column">
                <CustomSelect
                  label={t("specialty.name")}
                  value={payload.specialtyID || ""}
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
                  value={payload.position || ""}
                  setValue={setPayload}
                  nameKey="position"
                />
                <InputField
                  label={t("doctor.roomID")}
                  placeholder={t("doctor.roomID")}
                  sx={{
                    width: "50%",
                  }}
                  value={payload.roomID || ""}
                  setValue={setPayload}
                  nameKey="roomID"
                />
              </Stack>
              <Stack width="100%" spacing="8px" direction="row">
                <MarkdownEditor
                  nameKey="description"
                  label={t("description")}
                  setValue={setPayload}
                  value={payload?.description || ""}
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
              </Stack>
            </Stack>
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
            onClick={() => navigate("/doctors")}
          >
            <Typography variant="button1"> {t("back")}</Typography>
          </Button>
        </Box>
      </Box>
    </Helmet>
  );
};

export default NewDoctor;
