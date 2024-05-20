import axios from "../axios";

export const apiGetAllDoctors = (params) =>
  axios({
    url: `doctor/`,
    method: "get",
    params,
  });
export const apiGetDoctor = (id) =>
  axios({
    url: `doctor/${id}`,
    method: "get",
  });
export const apiAddDoctor = (data) =>
  axios({
    url: `doctor`,
    method: "post",
    data,
  });
export const apiUpdateDoctor = (id, data) =>
  axios({
    url: `doctor/${id}`,
    method: "put",
    data,
  });
export const apiDeleteDoctor = (id) =>
  axios({
    url: `doctor/${id}`,
    method: "delete",
  });
export const apiCountDoctor = () =>
  axios({
    url: `/doctor/count`,
    method: "get",
  });
export const apiGetAllDoctorsByHost = (params) =>
  axios({
    url: `/doctor/host`,
    method: "get",
    params,
  });
