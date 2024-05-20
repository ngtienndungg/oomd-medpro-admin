import { Box } from "@mui/material";
import { useSelector } from "react-redux";
const Helmet = (props) => {
  const { current } = useSelector((state) => state.auth);
  document.title = `${current?.role === 1 ? "ADMIN" : "HOST"}- ` + props.title;
  return <Box height="100%">{props.children}</Box>;
};

export default Helmet;
