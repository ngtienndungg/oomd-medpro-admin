import React, { useEffect, useState } from "react";

import { Helmet, Widget } from "../../components/index";
import {
  apiCountDoctor,
  apiCountClinic,
  apiCountSpecialty,
  apiCountPatient,
} from "../../apis/index";
import { Card, CardContent, Grid, Stack, useMediaQuery } from "@mui/material";
import { theme } from "../../theme";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const [totalClinic, setTotalClinic] = useState(0);
  const [totalNewClinic, setTotalNewClinic] = useState(0);

  const [totalSpecialty, setTotalSpecialty] = useState(0);
  const [totalNewSpecialty, setTotalNewSpecialty] = useState(0);

  const [totalDoctor, setTotalDoctor] = useState(0);
  const [totalNewDoctor, setTotalNewDoctor] = useState(0);

  const [totalPatient, setTotalPatient] = useState(0);
  const [totalNewPatient, setTotalNewPatient] = useState(0);

  const fetchDataClinic = async () => {
    const response = await apiCountClinic();
    if (response?.success) {
      setTotalNewClinic(response?.data[0]);
      setTotalClinic(response?.data[1]);
    }
  };
  const fetchDataSpecialty = async () => {
    const response = await apiCountSpecialty();
    if (response?.success) {
      setTotalNewSpecialty(response?.data[0]);
      setTotalSpecialty(response?.data[1]);
    }
  };
  const fetchDataDoctor = async () => {
    const response = await apiCountDoctor();
    if (response?.success) {
      setTotalNewDoctor(response?.data[0]);
      setTotalDoctor(response?.data[1]);
    }
  };
  const fetchDataPatient = async () => {
    const response = await apiCountPatient();
    if (response?.success) {
      setTotalNewPatient(response?.data[0]);
      setTotalPatient(response?.data[1]);
    }
  };
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      fetchDataClinic();
      fetchDataSpecialty();
      fetchDataPatient();
      fetchDataDoctor();
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, []);
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));

  return (
    <Helmet title="Trang chủ">
      <Grid container>
        {/* <Stack direction={isTablet ? "row" : "column"} spacing="16px">
          <Card
            sx={{
              width: {
                desktop: "35%",
                tablet: "35%",
                mobile: "100%",
                oversize: "37%",
              },
              height: 140,
              borderRadius: "6px",
            }}
          >
            <CardContent>
              <Widget
                type="clinic"
                total={totalClinic}
                totalNew={totalNewClinic}
              />
            </CardContent>
          </Card>
          <Card
            sx={{
              width: {
                desktop: "35%",
                tablet: "35%",
                mobile: "100%",
                oversize: "37%",
              },
              height: 140,
              borderRadius: "6px",
            }}
          >
            <CardContent>
              <Widget
                type="specialty"
                total={totalSpecialty}
                totalNew={totalNewSpecialty}
              />
            </CardContent>
          </Card>
          <Card
            sx={{
              width: {
                desktop: "35%",
                tablet: "35%",
                mobile: "100%",
                oversize: "37%",
              },
              height: 140,
              borderRadius: "6px",
            }}
          >
            <CardContent>
              <Widget
                type="doctor"
                total={totalDoctor}
                totalNew={totalNewDoctor}
              />
            </CardContent>
          </Card>
          <Card
            sx={{
              width: {
                desktop: "35%",
                tablet: "35%",
                mobile: "100%",
                oversize: "37%",
              },
              height: 140,
              borderRadius: "6px",
            }}
          >
            <CardContent>
              <Widget
                type="user"
                total={totalPatient}
                totalNew={totalNewPatient}
              />
            </CardContent>
          </Card>
        </Stack> */}
      </Grid>
    </Helmet>
  );
};

export default Home;
