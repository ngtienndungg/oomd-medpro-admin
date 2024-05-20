import "./style.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clinicColumns } from "../../utils/datatablesource";
import {
  Helmet,
  DataGridMain,
  EmptyPage,
  PopUp,
  CustomSkeleton,
} from "../../components/index";
import { Typography, Box, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UpdateClinic from "./UpdateClinic";
import { resetClinicStatus } from "../../store/clinics/clinicSlice";
import useNotification from "../../hooks/useNotification";
import { deleteClinic, getClinics } from "../../store/clinics/asyncAction";

const ListClinics = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clinics, totalItem, errorAction, successAction, loading } =
    useSelector((state) => state.clinic);
  const { displayNotification } = useNotification();

  const pageSizeDefault = 10;
  const [pageSize, setPageSize] = useState(pageSizeDefault);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(getClinics({ limit: pageSizeDefault, page: page }));
  }, [page, successAction]);
  useEffect(() => {
    if (pageSizeDefault > totalItem && totalItem > 0) {
      setPageSize(totalItem);
    }
    setRows(
      clinics &&
        clinics?.map((el, index) => {
          return {
            id: el?._id,
            idRow: (page - 1) * pageSize + index + 1,
            name: el?.name,
            image: el.image,
            description: el.description,
            descriptionImg: el.descriptionImg,
            province: el.address?.province,
            district: el.address?.district,
            ward: el.address?.ward,
            detail: el.address?.detail,
            specialtyID: el?.specialtyID,
            host: el?.host,
          };
        })
    );
  }, [totalItem, clinics]);

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
            <UpdateClinic data={params.row} />
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
  const handleDeleteClinic = () => {
    id && dispatch(deleteClinic(id));
    setOpenPopUp(false);
  };

  useEffect(() => {
    if (successAction || errorAction) {
      displayNotification({
        message: successAction || errorAction,
        severity: successAction ? "success" : "error",
        title: successAction ? t("success") : t("failed"),
      });
      dispatch(resetClinicStatus());
    }
  }, [successAction, errorAction]);

  return (
    <Helmet title={t("hospital.list")}>
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
            <Typography variant="h5">{t("hospital.list")}</Typography>
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
            columns={clinicColumns.concat(actionColumn)}
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
        onClick={handleDeleteClinic}
      />
    </Helmet>
  );
};

export default ListClinics;
