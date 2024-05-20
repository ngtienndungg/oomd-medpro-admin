import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
  Button,
  Typography,
  Box,
  Stack,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { InputField, SelectDate } from "../../components";
import { updateSchedule } from "../../store/schedules/asyncAction";
import { times } from "../../utils/contants";
import { formatMoney } from "../../utils/helper";
import moment from "moment";

const UpdateSchedule = ({ data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.schedule);
  const [open, setOpen] = useState(false);

  const [payload, setPayload] = useState({});
  const [displayText, setDisplayText] = useState("");

  const timeTypes = times?.map((el) => ({ ...el, isSelected: false }));
  const handleClickOpen = () => {
    setOpen(true);
    setDisplayText(`${formatMoney(data?.cost)} VNĐ`);
    setPayload({
      id: data?.id,
      doctorID: data?.doctorID,
      timeType: timeTypes?.map((el) => {
        const matchingItem = data?.timeType?.find(
          (item) => parseInt(item.time) === el.id
        );

        if (matchingItem) {
          return {
            ...el,
            isSelected: true,
            maxNumber: matchingItem.maxNumber.toString(),
          };
        } else {
          return el;
        }
      }),
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  useEffect(() => {
    setDisplayText(payload.cost ? `${formatMoney(payload.cost)} VNĐ` : "");
  }, [payload?.cost]);

  const handleSubmit = () => {
    let result = [];
    const { id, timeType, ...data } = payload;
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
    id &&
      dispatch(
        updateSchedule({
          id,
          data: {
            ...data,
            timeType: result,
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
                <Stack width="100%" spacing="16px" direction="row">
                  <InputField
                    label={t("schedule.cost")}
                    placeholder={t("schedule.cost")}
                    type="number"
                    sx={{
                      width: "50%",
                    }}
                    value={
                      payload.cost === "" || payload.cost
                        ? payload.cost
                        : data?.cost
                    }
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
                    value={
                      payload.cost === "" || payload.cost
                        ? payload.cost
                        : moment(data?.date, "DD/MM/YYYY").format(
                            "YYYY-MM-DDT00:00"
                          )
                    }
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
                      <Box
                        key={index}
                        sx={{ width: "33,333%", padding: "10px" }}
                      >
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

export default memo(UpdateSchedule);
