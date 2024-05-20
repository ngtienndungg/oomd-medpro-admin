import "./style.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ToggleLanguageButton } from "../../components/index";
import { apiLogin } from "../../apis/user";
import { login } from "../../store/auth/authSlice";
import { useTranslation } from "react-i18next";
import icons from "../../utils/icons";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CryptoJS from "crypto-js";

const languages = [
  { title: "VIE", icon: icons.vietnam, lng: "vi" },
  { title: "ENG", icon: icons.usa, lng: "en" },
];

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const encryptedPassword = localStorage.getItem("password");

    if (encryptedPassword) {
      const decryptedPassword = CryptoJS.AES.decrypt(
        encryptedPassword,
        "jlasdfmnqweo@#$_)dsf123456"
      ).toString(CryptoJS.enc.Utf8);

      const rememberMeFlag = localStorage.getItem("rememberMe");
      if (rememberMeFlag === "true") {
        const savedEmail = localStorage.getItem("email");

        if (savedEmail) {
          setPayload({
            email: savedEmail,
            password: decryptedPassword,
          });
          setRememberMe(true);
        }
      }
    }
  }, []);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setPayload((prev) => ({ ...prev, email: emailValue }));
    if (emailValue.trim() === "") {
      setEmailError("");
    } else if (!emailValue.match(/^\S+@\S+\.\S+$/)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPayload((prev) => ({ ...prev, password: passwordValue }));

    // Check for empty password
    if (passwordValue.trim() === "") {
      setPasswordError("");
    } else if (passwordValue.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);

    if (e.target.checked) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", payload.email);

      const encryptedPassword = CryptoJS.AES.encrypt(
        payload.password,
        "jlasdfmnqweo@#$_)dsf123456"
      ).toString();

      localStorage.setItem("password", encryptedPassword);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };
  const handlerSubmit = useCallback(async () => {
    if (!payload.email || !payload.password) {
      return Swal.fire("Đăng nhập thất bại", "Vui lòng nhập đầy đủ", " error");
    }
    const rs = await apiLogin(payload);
    if (rs?.success) {
      if (rs?.data?.role === 1 || rs?.data?.role === 2) {
        dispatch(
          login({
            isLoggedIn: true,
            token: rs.accessToken,
            current: rs.data,
          })
        );
        navigate("/");
      } else {
        Swal.fire(
          "Tài khoản không có quyền",
          "Vui lòng đăng nhập lại",
          "error"
        );
      }
    } else {
      Swal.fire("Đăng nhập thất bại", rs.message, "error");
    }
  }, [payload]);

  return (
    <>
      {/* {Loading && <Loading />} */}
      <Box className="login-container">
        <Box className="login-left">
          <Box className="login-form">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                sx={{ textTransform: "capitalize", color: "var(--primary)" }}
              >
                {t("login.log-in")}
              </Typography>

              <Stack
                direction="column"
                alignItems="flex-start"
                spacing="16px"
                width="100%"
              >
                <Stack width="100%" spacing="8px">
                  <TextField
                    label={t("login.email")}
                    placeholder={t("login.your-email")}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(35, 47, 67, 1) !important",
                        borderColor: "rgba(69,94,135,1)",
                        color: "var(--white)",
                      },
                      "& .MuiInputLabel-root": {
                        color: "var(--white)",
                        "&.Mui-focused": {
                          color: "var(--white) ",
                        },
                      },
                    }}
                    value={payload.email}
                    onChange={handleEmailChange}
                    error={Boolean(emailError)}
                    helperText={emailError}
                  />
                </Stack>
                <Stack width="100%" spacing="8px">
                  <TextField
                    label={t("login.password")}
                    placeholder={t("login.password")}
                    type={showPassword ? "text" : "password"}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(35, 47, 67, 1) !important",
                        borderColor: "rgba(69,94,135,1)",
                        color: "var(--white)",
                      },
                      "& .MuiInputLabel-root": {
                        color: "var(--white)",
                        "&.Mui-focused": {
                          color: "var(--white) ",
                        },
                      },
                    }}
                    value={payload.password}
                    onChange={handlePasswordChange}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOutlinedIcon
                                sx={{
                                  cursor: "pointer",
                                  color: "var(--white)",
                                }}
                              />
                            ) : (
                              <VisibilityOffOutlinedIcon
                                sx={{
                                  cursor: "pointer",
                                  color: "var(--white)",
                                }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <Stack
                  width="100%"
                  direction="row"
                  spacing="8px"
                  alignItems="center"
                >
                  <Checkbox
                    size="small"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  ></Checkbox>
                  <Typography variant="body2" sx={{ color: "var(--white)" }}>
                    {t("login.remember-me")}
                  </Typography>
                </Stack>
              </Stack>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: "100%" }}
                onClick={handlerSubmit}
              >
                {t("login.log-in")}
              </Button>

              <ToggleLanguageButton languages={languages} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
