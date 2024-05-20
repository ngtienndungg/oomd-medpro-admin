import { Link } from "react-router-dom";
import { dataConstant } from "../../utils/contants";
import icons from "../../utils/icons";
import { Box, Typography } from "@mui/material";
const Widget = ({ type, total, totalNew }) => {
  const { KeyboardArrowUpIcon } = icons;
  let index;

  switch (type) {
    case "user":
      index = 0;
      break;
    case "doctor":
      index = 1;
      break;
    case "clinic":
      index = 2;
      break;
    case "specialty":
      index = 3;
      break;
    default:
      break;
  }

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1">{dataConstant[index].title}</Typography>
        <Typography variant="body2">{total}</Typography>
        <Link to={dataConstant[index].link}>
          <Typography variant="caption2">
            {dataConstant[index].linkTile}
          </Typography>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box className="flex items-center text-sm text-green-600">
          <KeyboardArrowUpIcon />
          {totalNew} {dataConstant[index].title} mới
        </Box>
        {dataConstant[index].icon}
      </Box>
    </Box>
  );
};

export default Widget;
