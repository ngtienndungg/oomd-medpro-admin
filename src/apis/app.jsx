import AxiosDefaults from "axios";

export const apiGetProvinces = () =>
  AxiosDefaults({
    url: `https://vapi.vnappmob.com/api/province`,
    method: "get",
  });
export const apiGetDistrics = (id) =>
  AxiosDefaults({
    url: `https://vapi.vnappmob.com/api/province/district/${id}`,
    method: "get",
  });
export const apiGetWards = (id) =>
  AxiosDefaults({
    url: `https://vapi.vnappmob.com/api/province/ward/${id}`,
    method: "get",
  });
