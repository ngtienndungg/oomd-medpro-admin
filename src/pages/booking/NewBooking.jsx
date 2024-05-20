import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect, Helmet, SelectDate } from "../../components/index";
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
import { times } from "../../utils/contants";
import { addBooking } from "../../store/booking/asyncAction";
import icons from "../../utils/icons";
import { getBase64 } from "../../utils/helper";
import { resetBookingStatus } from "../../store/booking/bookingSlice";

const NewBooking = () => {
  const { DriveFolderUploadOutlinedIcon } = icons;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { displayNotification } = useNotification();
  const { loading, errorAction, successAction } = useSelector(
    (state) => state.booking
  );
  const { current } = useSelector((state) => state.auth);

  const [clinics, setClinics] = useState([]);
  const [specialtys, setSpecialtys] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const [payload, setPayload] = useState({
    date: new Date().getTime(),
  });
  const [hoverElm, setHoverElm] = useState(null);
  const [images, setImages] = useState([]);

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
  const fetchApiPatient = async () => {
    const response = await apis.apiGetAllUsers({ role: 4 });
    if (response?.success) {
      setPatients(response?.data);
    }
  };
  const fetchApiDoctor = async () => {
    const specialty = specialtys?.find(
      (el) => el?._id === payload?.specialtyID
    );
    const nameSpecialty = specialty?.name;
    const clinic = clinics?.find((el) => el?._id === payload?.clinicID);
    const nameClinic = clinic?.name;

    if (nameSpecialty) {
      const response = await apis.apiGetAllDoctors({
        nameSpecialty,
        nameClinic,
      });
      if (response?.success) {
        let doctors = [];
        response?.data?.map((el) => doctors.push(el?._id));
        setDoctors(doctors);
      }
    }
  };
  const fetchApiSchedule = async () => {
    if (payload?.doctorID) {
      const response = await apis.apiGetAllSchedules({
        doctorID: payload?.doctorID,
        date: Date.now(),
      });
      if (response?.success) {
        setSchedule(response?.data);
        setPayload((prev) => ({
          ...prev,
          scheduleID: response?.data?.[0]?._id,
        }));
      }
    }
  };
  const fetchApiScheduleByDate = async () => {
    if (payload?.date && payload?.doctorID) {
      const response = await apis.apiGetAllSchedules({
        doctorID: payload?.doctorID,
        date: payload?.date,
      });
      if (response?.success) {
        setSchedule(response?.data);
        setPayload((prev) => ({
          ...prev,
          scheduleID: response?.data?.[0]?._id,
        }));
      } else {
        setSchedule([]);
      }
    }
  };
  useEffect(() => {
    fetchApiClinic();
    fetchApiPatient();
  }, []);

  useEffect(() => {
    let clinic = clinics.find((el) => el._id === payload?.clinicID);
    setPayload((prev) => ({ ...prev, specialtyID: "" }));
    setSpecialtys(clinic?.specialtyID);
  }, [payload?.clinicID]);

  useEffect(() => {
    fetchApiDoctor();
  }, [payload?.specialtyID]);
  useEffect(() => {
    fetchApiSchedule();
  }, [payload?.doctorID]);
  useEffect(() => {
    fetchApiScheduleByDate();
  }, [payload?.date]);

  const handleSubmit = async () => {
    const { scheduleID, time, patientID, ...data } = payload;
    dispatch(addBooking({ scheduleID, time, patientID, images }));
  };
  useEffect(() => {
    if (successAction || errorAction) {
      if (successAction) {
        const { scheduleID, time, patientID, ...data } = payload;

        setPayload({});
      }
      displayNotification({
        message: successAction || errorAction,
        severity: successAction ? "success" : "error",
        title: successAction ? t("success") : t("failed"),
      });
      dispatch(resetBookingStatus());
    }
  }, [successAction, errorAction]);

  const handlePreviewDescriptionImg = async (files) => {
    let imagesPreview = images?.map((el) => el);

    for (let file of files) {
      const base64Image = await getBase64(file);
      imagesPreview.push(base64Image);
    }

    setImages(imagesPreview);
  };

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
          <Typography variant="h5">{t("booking.booking")}</Typography>
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
                  label={t("booking.name-patient")}
                  value={payload.patientID || ""}
                  setValue={setPayload}
                  nameKey="patientID"
                  options={patients}
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
              <Stack width="100%" spacing="8px" direction="column">
                <CustomSelect
                  label={t("doctor.name")}
                  value={payload.doctorID || ""}
                  setValue={setPayload}
                  nameKey="doctorID"
                  options={doctors}
                />
              </Stack>
              <Stack width="100%" spacing="16px" direction="row">
                <SelectDate
                  label="Chọn ngày:"
                  value={payload.date}
                  setValue={setPayload}
                  nameKey="date"
                />
              </Stack>
              <Stack width="100%" spacing="16px" direction="row">
                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  {schedule[0]?.timeType?.map((el, index) => (
                    <Box key={index} sx={{ width: "33,333%", padding: "10px" }}>
                      <Button
                        onClick={() =>
                          setPayload((prev) => ({ ...prev, time: el?.time }))
                        }
                        variant={
                          payload?.time === el?.time ? "contained" : "outlined"
                        }
                        sx={{ width: "150px" }}
                      >
                        <Typography variant="button1">
                          {times[el?.time - 1].value}
                        </Typography>
                      </Button>
                    </Box>
                  ))}
                </Box>
              </Stack>
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
              {images?.length > 0 && (
                <Stack
                  direction="row"
                  sx={{
                    display: "flex",
                    maxWidth: "100%",
                    overflowX: "auto",
                  }}
                >
                  {images?.map((el, index) => (
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
                            setImages(images?.filter((item) => item !== el))
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
            onClick={() => navigate("/bookings")}
          >
            <Typography variant="button1"> {t("back")}</Typography>
          </Button>
        </Box>
      </Box>
    </Helmet>
  );
};

export default NewBooking;
