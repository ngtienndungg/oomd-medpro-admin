import icons from "./icons";
import { roleName, times } from "./contants";
import { Typography, Box, Select, MenuItem, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { EmptyPage } from "../components";

export const userColumns = [
  {
    field: "idRow",
    headerName: "id",
    width: 120,
    headerAlign: "center",
    align: "center",

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return <Typography variant="label1">{text}</Typography>;
    },
  },

  {
    field: "fullName",
    headerName: "user.fullname",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          className="truncate_1"
        >
          <img
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "20px",
            }}
            src={
              params.row.avatar
                ? params.row.avatar
                : params.row.role === 4
                ? icons.patientImg
                : icons.noUser
            }
            alt="avatar"
          />
          <Typography variant="body2" className="truncate_2">
            {text}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "email",
    headerName: "user.email",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Typography
          variant="body2"
          className="truncate_1"
          sx={{ display: "block" }}
        >
          {text}
        </Typography>
      );
    },
  },
  {
    field: "mobile",
    headerName: "user.phone",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return <Typography variant="body2">{text}</Typography>;
    },
  },
  {
    field: "address",
    headerName: "user.address",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Typography variant="body2" className="truncate_1">
          {text}
        </Typography>
      );
    },
  },
  {
    field: "gender",
    headerName: "user.gender",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      const { t } = useTranslation();
      let text = params.value?.toLowerCase();

      return (
        <Typography variant="body2">{text ? t(`user.${text}`) : ""}</Typography>
      );
    },
  },
  {
    field: "role",
    headerName: "user.role",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Typography variant="body2">
          {roleName.find((el) => el._id === params.row.role)?.name}
        </Typography>
      );
    },
  },
  {
    field: "isBlocked",
    headerName: "user.status",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Typography
          variant="body2"
          sx={{
            padding: "4px",
            borderRadius: "6px",
            backgroundColor: params.row.isBlocked
              ? "bg-[rgba(255,0,0,0.05)]"
              : "bg-[rgba(255,217,0,0.05)]",
            color: params.row.isBlocked ? "var(--alert)" : "var(--success)",
          }}
        >
          {params.row.isBlocked ? "Blocked" : "Active"}
        </Typography>
      );
    },
  },
];

export const doctorColumns = [
  {
    field: "idRow",
    headerName: "id",
    width: 120,
    headerAlign: "center",
    align: "center",

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;

      return (
        <Typography variant="label1" className="truncate_1">
          {text}
        </Typography>
      );
    },
  },

  {
    field: "fullName",
    headerName: "doctor.name",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "20px",
            }}
            src={
              params.row.avatar
                ? params.row.avatar
                : params.row.role === 4
                ? icons.patientImg
                : icons.noUser
            }
            alt="avatar"
          />
          <Typography variant="body2" className="truncate_2">
            {text}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "email",
    headerName: "user.email",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Typography
          variant="body2"
          className="truncate_1"
          sx={{ display: "block" }}
        >
          {text}
        </Typography>
      );
    },
  },
  {
    field: "mobile",
    headerName: "user.phone",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return <Typography variant="body2">{text}</Typography>;
    },
  },
  {
    field: "clinicName",
    headerName: "hospital.name",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "20px",
            }}
            src={
              params.row.clinicImg ? params.row.clinicImg : icons.hospitalImage
            }
            alt="avatar"
          />
          <Typography variant="body2" className="truncate_2">
            {text}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "clinicAdress",
    headerName: "hospital.address",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;

      return (
        <Typography variant="body2" className="truncate_2">
          {text}
        </Typography>
      );
    },
  },
  {
    field: "specialtyName",
    headerName: "specialty.name",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Typography variant="body2" className="truncate_1">
          {text}
        </Typography>
      );
    },
  },
];

export const clinicColumns = [
  {
    field: "idRow",
    headerName: "id",
    width: 120,
    align: "center",
    headerAlign: "center",

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;

      return <Typography variant="label1">{text}</Typography>;
    },
  },

  {
    field: "name",
    headerName: "hospital.name",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "20px",
            }}
            src={params.row.image ? params.row.image : icons.hospitalImage}
            alt="avatar"
          />
          <Typography variant="body2" className="truncate_2">
            {text}
          </Typography>
        </Box>
      );
    },
  },

  {
    field: "address",
    headerName: "hospital.address",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      const detail = params.row.detail ? `${params.row.detail},` : "";
      const ward = params.row.ward ? `${params.row.ward},` : "";
      const district = params.row.district ? `${params.row.district},` : "";
      const province = params.row.province ? `${params.row.province}` : "";

      return (
        <Typography
          variant="body2"
          className="truncate_2"
        >{`${detail}${ward}${district}${province}`}</Typography>
      );
    },
  },
  {
    field: "specialtyID",
    headerName: "specialty.list",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      const { t } = useTranslation();
      const specialtys = params.value;
      return (
        <Select size="small" displayEmpty value="" sx={{ width: "100%" }}>
          <MenuItem value="" sx={{ display: "none" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="body2" className="truncate_1">
                {t("specialty.list")}
              </Typography>
            </Box>
          </MenuItem>
          {specialtys.length > 0 ? (
            specialtys?.map((item, index) => (
              <MenuItem key={index} value={item._id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography variant="body2">{item.name}</Typography>
                </Box>
              </MenuItem>
            ))
          ) : (
            <MenuItem>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <EmptyPage
                  title={t("data-not-found")}
                  message={t("please-add-data")}
                />
              </Box>
            </MenuItem>
          )}
        </Select>
      );
    },
  },
  {
    field: "host",
    headerName: "hospital.host",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body2"
            className="truncate_2"
          >{`${text?.fullName} (${text?.email})`}</Typography>
        </Box>
      );
    },
  },
];

export const specialtyColumns = [
  {
    field: "idRow",
    headerName: "id",
    width: 120,
    headerAlign: "center",
    align: "center",

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;

      return <Typography variant="label1">{text}</Typography>;
    },
  },

  {
    field: "name",
    headerName: "specialty.name",
    flex: 0.5,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "20px",
            }}
            src={params.row.image ? params.row.image : icons.specialty}
            alt="avatar"
          />

          <Typography variant="body2" className="truncate_1">
            {text}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "description",
    headerName: "description",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: text }}
          className="truncate_2"
        />
      );
    },
  },
];
export const scheduleColumns = [
  {
    field: "idRow",
    headerName: "id",
    width: 120,
    align: "center",
    headerAlign: "center",

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;

      return <Typography variant="label1">{text}</Typography>;
    },
  },

  {
    field: "fullName",
    headerName: "doctor.name",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "20px",
            }}
            src={
              params.row.avatar
                ? params.row.avatar
                : params.row.role === 4
                ? icons.patientImg
                : icons.noUser
            }
            alt="avatar"
          />
          <Typography variant="body2" className="truncate_2">
            {text}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "email",
    headerName: "user.email",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Typography
          variant="body2"
          className="truncate_2"
          sx={{ display: "block" }}
        >
          {text}
        </Typography>
      );
    },
  },
  {
    field: "clinicName",
    headerName: "hospital.name",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" className="truncate_2">
            {text}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "specialtyName",
    headerName: "specialty.name",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return <Typography variant="body2">{text}</Typography>;
    },
  },
  {
    field: "date",
    headerName: "schedule.date",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return <Typography variant="body2">{text}</Typography>;
    },
  },

  {
    field: "timeType",
    headerName: "schedule.time",
    flex: 1,

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      const { t } = useTranslation();
      const timeType = params.value;
      return (
        <Select size="small" displayEmpty value="">
          <MenuItem value="" sx={{ display: "none" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="body2">{t("schedule.time")}</Typography>
            </Box>
          </MenuItem>
          {timeType.length > 0 ? (
            timeType?.map((item, index) => (
              <MenuItem key={index} value={item._id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Button variant="contained">
                    <Typography variant="button1">
                      {times[item?.time - 1].value}
                    </Typography>
                  </Button>
                </Box>
              </MenuItem>
            ))
          ) : (
            <MenuItem>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <EmptyPage
                  title={t("data-not-found")}
                  message={t("please-add-data")}
                />
              </Box>
            </MenuItem>
          )}
        </Select>
      );
    },
  },
];
export const bookingColumns = [
  {
    field: "idRow",
    headerName: "id",
    width: 120,
    align: "center",
    headerAlign: "center",

    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
  },
  {
    field: "fullName",
    headerName: "booking.name-patient",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return <Typography variant="body2">{text}</Typography>;
    },
  },
  {
    field: "mobile",
    headerName: "user.phone",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return <Typography variant="body2">{text}</Typography>;
    },
  },
  {
    field: "nameDoctor",
    headerName: "doctor.name",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return <Typography variant="body2">{text}</Typography>;
    },
  },
  {
    field: "date",
    headerName: "schedule.date",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return <Typography variant="body2">{text}</Typography>;
    },
  },

  {
    field: "time",
    headerName: "schedule.time",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      let text = params.value;
      return <Typography variant="body2">{text}</Typography>;
    },
  },
  {
    field: "status",
    headerName: "user.status",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader(params) {
      const { t } = useTranslation();
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label1" color="var(--text-primary)">
          {t(headerName)}
        </Typography>
      );
    },
    renderCell: (params) => {
      const text = params.value;
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "6px",
            padding: "12px 6px",
            width: "100px",
            backgroundColor: `${
              text === "Đã huỷ"
                ? "var(--red-100)"
                : text === "Đang xử lý"
                ? "var(--yellow-100)"
                : text === "Đã xác nhận"
                ? "var(--blue-100)"
                : text === "Bỏ khảm"
                ? "var(--grey-primary-100)"
                : "var(--green-100)"
            }`,
            color: `${
              text === "Đã huỷ"
                ? "var(--red-900)"
                : text === "Đang xử lý"
                ? "var(--yellow-900)"
                : text === "Đã xác nhận"
                ? "var(--blue-900)"
                : text === "Bỏ khảm"
                ? "var(--grey-primary-900)"
                : "var(--green-900)"
            }`,
          }}
        >
          <Typography variant="body2"> {text}</Typography>
        </Box>
      );
    },
  },
];
