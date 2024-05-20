import axios from "../axios";

export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
  });

export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });
export const apiGetCurrent = () =>
  axios({
    url: "/user/current",
    method: "get",
  });
export const apiGetAllUsers = (params) =>
  axios({
    url: `/user/`,
    method: "get",
    params,
  });
export const apiGetUser = (id) =>
  axios({
    url: `/user/${id}`,
    method: "get",
  });

export const apiCountPatient = () =>
  axios({
    url: `/user/count-patient`,
    method: "get",
  });

export const apiAddUser = (data) =>
  axios({
    url: `/user/`,
    method: "post",
    data,
  });
export const apiUpdateUser = (id, data) =>
  axios({
    url: `/user/${id}`,
    method: "put",
    data,
  });
export const apiDeleteUser = (id) =>
  axios({
    url: `/user/${id}`,
    method: "delete",
  });
