import axios from "../axios";

export const apiGetAllClinics = (params) =>
  axios({
    url: "/clinic/",
    method: "get",
    params,
  });

export const apiGetClinic = (id) =>
  axios({
    url: `/clinic/${id}`,
    method: "get",
  });
export const apiCountClinic = () =>
  axios({
    url: `/clinic/count`,
    method: "get",
  });
export const apiAddClinic = (data) =>
  axios({
    url: "/clinic/",
    method: "post",
    data,
  });
export const apiUpdateClinic = (id, data) =>
  axios({
    url: `/clinic/${id}`,
    method: "put",
    data,
  });
export const apiDeleteClinic = (id) =>
  axios({
    url: `/clinic/${id}`,
    method: "delete",
  });
export const apiAddSpecialtyClinic = (id, data) =>
  axios({
    url: `/clinic/specialtys-add/${id}`,
    method: "put",
    data,
  });
export const apiDeleteSpecialtyClinic = (id, data) =>
  axios({
    url: `/clinic/specialtys-delete/${id}`,
    method: "put",
    data,
  });
