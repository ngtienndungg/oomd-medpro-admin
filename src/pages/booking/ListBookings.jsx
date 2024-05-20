import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { deleteBooking, getBookings } from "../../store/booking/asyncAction";
import {
  CustomSkeleton,
  DataGridMain,
  EmptyPage,
  Helmet,
  PopUp,
} from "../../components/index";
import { bookingColumns } from "../../utils/datatablesource";
import { times } from "../../utils/contants";
import { useTranslation } from "react-i18next";
import useNotification from "../../hooks/useNotification";
import { Typography, Box, Button, Grid } from "@mui/material";
import { resetBookingStatus } from "../../store/booking/bookingSlice";
import UpdateBooking from "./UpdateBooking";

const ListBookings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookings, totalItem, errorAction, successAction, loading } =
    useSelector((state) => state.booking);

  const { displayNotification } = useNotification();

  const pageSizeDefault = 10;
  const [pageSize, setPageSize] = useState(pageSizeDefault);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(getBookings({ limit: pageSizeDefault, page: page }));
  }, [page, successAction]);
  useEffect(() => {
    if (pageSizeDefault > totalItem && totalItem > 0) {
      setPageSize(totalItem);
    }

    setRows(
      bookings &&
        bookings?.map((el, index) => {
          return {
            id: el._id,
            idRow: index + 1,
            fullName: el?.patientID?.fullName,
            mobile: el?.patientID?.mobile,
            nameDoctor: el?.scheduleID?.doctorID?._id?.fullName,
            avatar: el?.patientID?.avatar,
            status: el?.status,
            date: moment(el?.scheduleID.date).format("DD/MM/yyyy"),
            description: el?.description,
            time: times[el?.time - 1].value,
            images: el?.images,
            isPaid: el?.isPaid,
          };
        })
    );
  }, [totalItem, bookings]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: 200,
      align: "center",
      renderHeader(params) {
        let headerName = params.colDef.headerName;
        return (
          <Typography variant="label1" color="var(--text-primary)">
            {headerName}
          </Typography>
        );
      },
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              whiteSpace: "nowrap !important",
            }}
          >
            <UpdateBooking data={params.row} />
            <Button
              variant="contained"
              color="red"
              onClick={(e) => {
                handleOpenConfirmPopup(e);
                setId(params.row.id);
              }}
            >
              <Typography variant="button1"> {t("delete")}</Typography>
            </Button>
          </Box>
        );
      },
    },
  ];

  const [openPopUp, setOpenPopUp] = useState(false);

  const handleOpenConfirmPopup = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenPopUp(true);
  };
  const handleCloseConfirmPopUp = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenPopUp(false);
  };
  const handleDeleteSchedule = () => {
    id && dispatch(deleteBooking(id));
    setOpenPopUp(false);
  };

  useEffect(() => {
    if (successAction || errorAction) {
      displayNotification({
        message: successAction || errorAction,
        severity: successAction ? "success" : "error",
        title: successAction ? t("success") : t("failed"),
      });
      dispatch(resetBookingStatus());
    }
  }, [successAction, errorAction]);

  return (
    <Helmet title={t("doctor.list")}>
      <Grid container sx={{ padding: "0px 32px", height: "100%" }}>
        <Box
          className="card-data-header"
          sx={{
            width: "100%",
            flexDirection: "row",
            border: "var(--border-color)",
            padding: "24px 0",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5">{t("schedule.list")}</Typography>
          </Box>
          <Button variant="contained" onClick={() => navigate("new")}>
            <Typography variant="button1">{t("add")}</Typography>
          </Button>
        </Box>
        {loading ? (
          <CustomSkeleton
            customKey={`skeleton__card-notify`}
            variant="card-notify"
          />
        ) : (
          <DataGridMain
            slots={
              rows?.length === 0
                ? {
                    columnHeaders: () => null,
                    noRowsOverlay: () => (
                      <EmptyPage
                        title={t("data-not-found")}
                        message={t("please-add-data")}
                      />
                    ),
                  }
                : {}
            }
            columns={bookingColumns.concat(actionColumn)}
            rows={rows}
            pagination={rows?.length > 0 ? true : false}
            pageSize={pageSize}
            totalRow={totalItem}
            setPage={setPage}
            page={page}
            height={185}
          ></DataGridMain>
        )}
      </Grid>
      <PopUp
        open={openPopUp}
        handleClose={handleCloseConfirmPopUp}
        title={t("delete-title")}
        message={t("delete-confirm")}
        enableCancelButton
        onClick={handleDeleteSchedule}
      />
    </Helmet>
  );
};

export default ListBookings;
