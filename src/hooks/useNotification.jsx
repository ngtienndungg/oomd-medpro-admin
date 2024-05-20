import { useDispatch } from "react-redux";
import { addNotification, clearNotification } from "../store/app/appSlice";
const useNotification = () => {
  const dispatch = useDispatch();

  const displayNotification = (notification) => {
    dispatch(addNotification(notification));
  };
  const resetNotification = () => {
    dispatch(clearNotification());
  };
  return { displayNotification, resetNotification };
};
export default useNotification;
