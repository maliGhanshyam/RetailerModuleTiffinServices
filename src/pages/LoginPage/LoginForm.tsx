import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid2,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../store/authSlice";
import { loginUser } from "../../services/LoginService/loginUser";
import { SUPERADMIN_ROLE_ID } from "../../constants/ROLES";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { styles } from "./Login.style";
import { useSnackbar } from "../../hook";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { showSnackbar } = useSnackbar();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .max(50, "Too Long!")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .max(20, "Too Long!")
      .required("Password is required"),
  });

  const handleSubmit = async (
    loginData: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>
  ) => {
    try {
      const response = await loginUser(loginData.email, loginData.password);
      if (
        response.success &&
        (response as { token?: string }).token &&
        (response as { _id?: string })._id &&
        (response as { role_id?: string }).role_id
      ) {
        dispatch(
          setAuthData({
            userRoleId: response.role_id,
            userId: response._id,
          })
        );
        showSnackbar("Login successful", "success");
        navigate(
          response.role_id === SUPERADMIN_ROLE_ID
            ? "/superAdminDashboard"
            : "/adminDashboard"
        );
      } else {
        showSnackbar("Invalid credentials", "error");
      }
    } catch (error) {
      showSnackbar("Login error. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Container component="div">
      <Grid2 sx={styles.containerGrid}>
        <Grid2 size={5} sx={styles.svgGrid}>
          <img
            src="https://emp.neosofttech.com/assets/a9ba8aa/assets/images/login/login_bg.svg"
            alt="Loginpic"
          />
        </Grid2>
        <Grid2 size={{ sm: 4 }}>
          <Box sx={styles.container}>
            <Typography component="h1" variant="h5" sx={styles.heading}>
              Sign In
            </Typography>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                isSubmitting,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
              }) => (
                <Form>
                  <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid2 size={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        size="small"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid2>
                    <Grid2 size={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        size="small"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid2>
                    <Grid2 size={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        Submit
                      </Button>
                    </Grid2>
                  </Grid2>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ marginTop: 2 }}
                  >
                    Don’t have an account?{" "}
                    <Link to="/register">Sign up here</Link>
                  </Typography>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default LoginForm;
