import "./style.scss";

import { Box, Stack } from "@mui/system";
import {
  Grid,
  MenuItem,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import DataGridMain from "../datagrid/DataGridMain";

// Main function
const CustomSkeleton = ({ customKey, variant }) => {
  switch (variant) {
    case "card-notify":
      return <CardNotifySkeleton customKey={customKey} />;
  }
};

export default CustomSkeleton;

const CardNotifySkeleton = ({ customKey }) => {
  const { t } = useTranslation();
  const columns = [
    {
      field: "device",
      headerName: t("notification.device-name"),
      sortable: false,
      headerClassName: "card--header",
      cellClassName: "card--cell",
      flex: 1,

      renderHeader(params) {
        return (
          <Typography variant="label3">
            <Skeleton height={40} width={50} />
          </Typography>
        );
      },
      renderCell: (params) => {
        return (
          <Typography variant="label1">
            <Skeleton height={40} width={50} />
          </Typography>
        );
      },
    },
    {
      field: "message",
      headerName: t("notification.latest-error"),
      sortable: false,
      headerClassName: "card--header",
      cellClassName: "card--cell",
      flex: 2,
      align: "center",
      renderHeader(params) {
        return (
          <Typography variant="label3" sx={{ width: "100%" }}>
            <Skeleton height={40} width={100} />
          </Typography>
        );
      },
      renderCell: (params) => {
        return (
          <Typography
            className="truncate"
            variant="body2"
            sx={{ width: "100%" }}
          >
            <Skeleton height={40} />
          </Typography>
        );
      },
    },
    {
      field: "createdTime",
      headerName: t("notification.time-happens"),
      sortable: false,
      headerClassName: "card--header",
      cellClassName: "card--cell",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderHeader(params) {
        return (
          <Typography variant="label3">
            <Skeleton height={40} width={100} />
          </Typography>
        );
      },
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="body2">
              <Skeleton height={40} width={100} />
            </Typography>
          </Box>
        );
      },
    },
  ];

  const rows = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    createdTime: index + 1,
    startTs: index + 1,
    message: "string",
    device: {
      id: index + 1,
      name: "string",
      type: "string",
      label: "string",
      typeImage: "string",
    },
    project: {
      id: `string-${index + 1}`,
      name: `string-${index + 1}`,
    },
  }));

  return (
    <div key={customKey} className="custom-skeleton">
      <DataGridMain columns={columns} rows={rows} pagination={false} />
    </div>
  );
};
