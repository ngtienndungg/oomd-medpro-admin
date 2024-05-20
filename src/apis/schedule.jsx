import axios from "../axios";

export const apiGetAllSchedules = (params) =>
  axios({
    url: "/schedule/",
    method: "get",
    params,
  });
export const apiGetAllSchedulesByHost = (params) =>
  axios({
    url: "/schedule/host",
    method: "get",
    params,
  });

export const apiGetSchedule = (id) =>
  axios({
    url: `/schedule/${id}`,
    method: "get",
  });
export const apiGetScheduleByDoctorID = (id) =>
  axios({
    url: `/schedule/doctor/${id}`,
    method: "get",
  });

export const apiAddSchedule = (data) =>
  axios({
    url: "/schedule/",
    method: "post",
    data,
  });
export const apiUpdateSchedule = (id, data) =>
  axios({
    url: `/schedule/${id}`,
    method: "put",
    data,
  });
export const apiDeleteSchedule = (id) =>
  axios({
    url: `/schedule/${id}`,
    method: "delete",
  });
