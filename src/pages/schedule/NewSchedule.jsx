import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomSelect,
  Helmet,
  InputField,
  SelectDate,
} from "../../components/index";
import useNotification from "../../hooks/useNotification";
import { useTranslation } from "react-i18next";
import {
  Button,
  Box,
  Typography,
  Stack,
  CircularProgress,
  TextField,
} from "@mui/material";
import * as apis from "../../apis";
import { resetScheduleStatus } from "../../store/schedules/scheduleslice";
import { times } from "../../utils/contants";
import { formatMoney } from "../../utils/helper";
import { addSchedule } from "../../store/schedules/asyncAction";

const NewSchedule = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { displayNotification } = useNotification();
  const { loading, errorAction, successAction } = useSelector(
    (state) => state.schedule
  );
  const { current } = useSelector((state) => state.auth);
  const [doctors, setDoctors] = useState([]);

  const [payload, setPayload] = useState({
    timeType: times?.map((el) => ({ ...el, isSelected: false })),
    date: new Date().getTime(),
  });
  const [displayText, setDisplayText] = useState("");

  const handleTime = (time) => {
    const updatedTimes = payload?.timeType?.map((el) =>
      el.id === time.id ? { ...el, isSelected: !el.isSelected } : el
    );
    setPayload((prev) => ({ ...prev, timeType: updatedTimes }));
  };
  const handleNumber = (e, time) => {
    const updatedTimes = payload?.timeType?.map((el) =>
      el.id === time.id ? { ...el, maxNumber: e.target.value } : el
    );
    setPayload((prev) => ({ ...prev, timeType: updatedTimes }));
  };

  const fetchApiDoctor = async () => {
    let response;
    if (current?.role === 1) {
      response = await apis.apiGetAllDoctors();
    } else {
      response = await apis.apiGetAllDoctorsByHost();
    }
    if (response?.success) {
      let doctors = [];
      response?.data?.map((el) => doctors.push(el?._id));
      setDoctors(doctors);
    }
  };

  useEffect(() => {
    fetchApiDoctor();
  }, []);
  useEffect(() => {
    setDisplayText(payload.cost ? `${formatMoney(payload.cost)} VNĐ` : "");
  }, [payload?.cost]);

  const handleSubmit = async () => {
    let result = [];
    const { timeType, ...data } = payload;
    if (timeType && timeType.length > 0) {
      let selectTime = timeType.filter((el) => el.isSelected === true);
      selectTime.map((el) => {
        let object = {};
        object.time = el.id;
        if (el.maxNumber?.trim() !== "") {
          object.maxNumber = el.maxNumber;
        }
        result.push(object);
      });
    }

    dispatch(
      addSchedule({
        ...data,
        timeType: result,
      })
    );
  };
  useEffect(() => {
    if (successAction || errorAction) {
      if (successAction) {
        setPayload({
          timeType: times?.map((el) => ({ ...el, isSelected: false })),
        });
      }
      displayNotification({
        message: successAction || errorAction,
        severity: successAction ? "success" : "error",
        title: successAction ? t("success") : t("failed"),
      });
      dispatch(resetScheduleStatus());
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
          <Typography variant="h5">{t("schedule.add-schedule")}</Typography>
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
                  value={payload.doctorID || ""}
                  setValue={setPayload}
                  nameKey="doctorID"
                  options={doctors}
                />
              </Stack>

              <Stack width="100%" spacing="16px" direction="row">
                <InputField
                  label={t("schedule.cost")}
                  placeholder={t("schedule.cost")}
                  type="number"
                  sx={{
                    width: "50%",
                  }}
                  value={payload?.cost || ""}
                  setValue={setPayload}
                  nameKey="cost"
                />
                <Typography
                  variant="body1"
                  sx={{ alignSelf: "flex-end", width: "50%" }}
                >
                  {displayText}
                </Typography>
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
                  {payload?.timeType?.map((el, index) => (
                    <Box key={index} sx={{ width: "33,333%", padding: "10px" }}>
                      <Button
                        onClick={() => handleTime(el)}
                        variant={
                          el?.isSelected === true ? "contained" : "outlined"
                        }
                        sx={{ width: "150px" }}
                      >
                        <Typography variant="button1">{el.value}</Typography>
                      </Button>

                      <TextField
                        type="number"
                        className="px-4 py-2 rounded-md border w-[50%] my-2 placeholder:text-sm placeholder:italic outline-none bg-white"
                        value={el?.maxNumber}
                        placeholder="Số người"
                        onChange={(e) => handleNumber(e, el)}
                        sx={{ width: "150px" }}
                      />
                    </Box>
                  ))}
                </Box>
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
            onClick={() => navigate("/schedules")}
          >
            <Typography variant="button1"> {t("back")}</Typography>
          </Button>
        </Box>
      </Box>
    </Helmet>
  );
};

export default NewSchedule;
