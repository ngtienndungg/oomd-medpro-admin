import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});
// Thêm một bộ đón chặn request
instance.interceptors.request.use(
  function (config) {
    let localStorageData = window.localStorage.getItem("persist:auth");
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
      const accessToken = JSON.parse(localStorageData?.token);
      config.headers = { authorization: `Bearer ${accessToken}` };
      return config;
    } else {
      return config;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return error.response.data;
  }
);

export default instance;
