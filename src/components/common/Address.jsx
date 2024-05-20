import React, { memo, useEffect, useState } from "react";
import { apiGetDistrics, apiGetProvinces, apiGetWards } from "../../apis";
import { SelectAddress } from "../index";
import { Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

const Address = ({ payload, setPayload }) => {
  const { t } = useTranslation();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

  const fetchApiProvince = async () => {
    const response = await apiGetProvinces();
    if (response?.status === 200) {
      setProvinces(response?.data?.results);
      let province = response?.data?.results?.find(
        (el) => el.province_name === payload?.province
      );
      setProvince(province ? province.province_id : "");
      setDistrict("");
      setWard("");
    }
  };
  const fetchApiDistrict = async () => {
    setDistricts(null);
    setWards(null);
    if (!province) {
      return;
    }
    const response = await apiGetDistrics(province);
    if (response.status === 200) {
      setDistricts(response?.data?.results);
      let district = response?.data?.results?.find(
        (el) => el.district_name === payload.district
      );
      setDistrict(district ? district.district_id : "");
      setWard("");
    }
  };
  const fetchApiWard = async () => {
    setWards(null);
    if (!district) {
      return;
    }
    const response = await apiGetWards(district);
    if (response.status === 200) {
      setWards(response?.data?.results);

      let ward = response?.data?.results?.find(
        (el) => el.ward_name === payload.ward
      );
      setWard(ward ? ward.ward_id : "");
    }
  };

  useEffect(() => {
    fetchApiProvince();
  }, []);
  useEffect(() => {
    fetchApiDistrict();
  }, [province]);
  useEffect(() => {
    fetchApiWard();
  }, [district]);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: {
        province: province
          ? provinces?.find((el) => el.province_id === province)?.province_name
          : "",
        district: district
          ? districts?.find((el) => el.district_id === district)?.district_name
          : "",
        ward: ward ? wards?.find((el) => el.ward_id === ward)?.ward_name : "",
      },
    }));
  }, [province, district, ward]);

  return (
    <Stack width="100%" spacing="8px" direction="row">
      <Stack width="100%">
        <SelectAddress
          value={province}
          setValue={setProvince}
          options={provinces}
          label={t("province-city")}
          type="province"
        />
      </Stack>
      <Stack width="100%">
        <SelectAddress
          value={district}
          setValue={setDistrict}
          options={districts}
          label={t("district-town")}
          type="district"
        />
      </Stack>
      <Stack width="100%">
        <SelectAddress
          value={ward}
          setValue={setWard}
          options={wards}
          label={t("ward")}
          type="ward"
        />
      </Stack>
    </Stack>
  );
};

export default memo(Address);
