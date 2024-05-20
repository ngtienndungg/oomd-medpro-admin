import axios from "../axios";

export const apiGetAllSpecialtys = (params) =>
  axios({
    url: "/specialty",
    method: "get",
    params,
  });

export const apiGetSpecialty = (id) =>
  axios({
    url: `/specialty/${id}`,
    method: "get",
  });
export const apiCountSpecialty = () =>
  axios({
    url: `/specialty/count`,
    method: "get",
  });
export const apiAddSpecialty = (data) =>
  axios({
    url: "/specialty",
    method: "post",
    data,
  });
export const apiUpdateSpecialty = (id, data) =>
  axios({
    url: `/specialty/${id}`,
    method: "put",
    data,
  });
export const apiDeleteSpecialty = (id) =>
  axios({
    url: `/specialty/${id}`,
    method: "delete",
  });
