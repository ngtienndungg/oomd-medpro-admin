import "./style.scss";

import { Box, PaginationItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";

const DataGridMain = ({
  totalRow = 99,
  pageSize = 20,
  rows,
  columns,
  page,
  setPage,
  slots,
  pagination = true,
}) => {
  const totalPage = Math.ceil(totalRow / pageSize);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "16px",
        marginBottom: "32px",
      }}
    >
      <DataGrid
        key={page}
        slots={slots}
        rowHeight={80}
        rows={rows}
        columns={columns}
        disableColumnSelector
        hideFooter
        hideFooterPagination
        sx={{
          "& .MuiDataGrid-main": {
            minWidth: "10px",
            overflow: "auto",
          },
          "& .MuiDataGrid-virtualScrollerContent": {
            height: "0 !important",
            minHeight: "100px",
            width: "auto !important",
          },
          "& .MuiDataGrid-columnHeaders ": {
            background: "rgba(0, 70, 101, 0.70)",
            marginBottom: "12px",
            border: "none",
            height: "60px",
            minHeight: "40px !important",
          },

          "&.MuiDataGrid-root": {
            width: "100%",
          },
          "& .MuiDataGrid-cell": {
            whiteSpace: "wrap !important",
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize,
              page: page ? page - 1 : -1,
            },
          },
        }}
      />
      {pagination && (
        <Pagination
          count={totalPage}
          page={page}
          onChange={handleChangePage}
          shape="rounded"
          color="primary"
          sx={{
            "& .MuiButtonBase-root": {
              color: "var(--primary)",
              "&.Mui-selected": {
                backgroundColor: "var(--blue-500)",
              },
            },
          }}
          // renderItem={(item) => (
          //   <PaginationItem
          //     components={{
          //       next: (props) => (
          //         <img {...props} src={images?.chevronsRight} alt="" />
          //       ),

          //       previous: (props) => (
          //         <img {...props} src={images?.chevronsLeft} alt="" />
          //       ),
          //     }}
          //     {...item}
          //   />
          // )}
        />
      )}
    </Box>
  );
};
export default DataGridMain;
