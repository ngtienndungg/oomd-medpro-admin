import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  MarkdownEditor,
  InputField,
  CustomSelect,
} from "../../components/index";

import { Button, Typography, Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { status, statusPay } from "../../utils/contants";
import { updateBooking } from "../../store/booking/asyncAction";

const UpdateBooking = ({ data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.booking);
  const [open, setOpen] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
    setPayload({
      id: data?.id,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    const { id, ...data } = payload;

    id &&
      dispatch(
        updateBooking({
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
                <Stack width="100%" spacing="8px" direction="column">
                  <InputField
                    label={t("booking.name-patient")}
                    placeholder={t("booking.name-patient")}
                    style={{
                      width: "45%",
                    }}
                    value={data?.fullName}
                    setValue={setPayload}
                  />
                </Stack>

                <Stack width="100%" spacing="8px" direction="column">
                  <InputField
                    label={t("doctor.name")}
                    placeholder={t("doctor.name")}
                    style={{
                      width: "45%",
                    }}
                    value={data?.nameDoctor}
                    setValue={setPayload}
                  />
                </Stack>
                <Stack width="100%" spacing="8px" direction="column">
                  <InputField
                    label={t("schedule.date")}
                    placeholder={t("schedule.date")}
                    style={{
                      width: "45%",
                    }}
                    value={data?.date}
                    setValue={setPayload}
                  />
                  <Stack width="100%" spacing="8px" direction="column">
                    <Typography variant="label1">
                      {t("schedule.time")}
                    </Typography>
                    <Button variant="contained" sx={{ width: "150px" }}>
                      <Typography variant="button1">{data?.time}</Typography>
                    </Button>
                  </Stack>
                </Stack>

                <Stack width="100%" spacing="8px" direction="column">
                  <CustomSelect
                    label={t("user.status")}
                    value={
                      payload.status === "" || payload.status
                        ? payload.status
                        : data?.status
                    }
                    setValue={setPayload}
                    nameKey="status"
                    options={status}
                  />
                </Stack>
                {data?.images?.length > 0 && (
                  <Stack
                    direction="column"
                    sx={{
                      display: "flex",
                      maxWidth: "100%",
                      overflowX: "auto",
                    }}
                  >
                    <Typography variant="label1">
                      {t("booking.description-img")}
                    </Typography>
                    {data?.images?.map((el, index) => (
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
                      </Box>
                    ))}
                  </Stack>
                )}

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
                <Stack
                  width="100%"
                  spacing="8px"
                  direction="row"
                  alignItems="center"
                >
                  <CustomSelect
                    label={t("booking.payment")}
                    value={
                      payload.isPaid !== undefined
                        ? payload.isPaid
                        : data?.isPaid
                    }
                    setValue={setPayload}
                    nameKey="isPaid"
                    options={statusPay}
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

export default memo(UpdateBooking);
