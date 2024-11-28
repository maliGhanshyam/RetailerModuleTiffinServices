import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { RegisterResponse } from "./RetailerRegistration.types";
import { styles } from "./RetailerRegistration.styles";
import { registerAdmin } from "../../services/Auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import login from "../../assets/LoginScreen.svg";
import { RETAILER_ROLE_ID } from "../../constants/ROLES";
import { useSnackbar } from "../../hook";

const RetailerRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      contact_number: "",
      address: "",
      password: "",
      confirmPassword: "",
      gst_no: "",
      role_id: RETAILER_ROLE_ID,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9.\-_$@*!]{3,20}$/,
          "Must be a valid username number"
        )
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .matches(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          "Invalid email format"
        ),
      contact_number: Yup.string()
        .matches(/^[0-9]+$/, "Must be a valid contact number")
        .length(10, "Contact Number must be of 10 digits")
        .required("Contact Number is required"),
      address: Yup.string()
        .required("Address is required")
        .min(5, "At least 5 characters be there")
        .max(50, "Upto 50 characters long"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password must be at most 20 characters long")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      gst_no: Yup.string()
        .matches(
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/,
          "Must matches GST format 22AAAAA0000A1Z5"
        )
        .required("GST no is required"),
    }),
    onSubmit: async (values, actions) => {
      try {
        const res: RegisterResponse = await registerAdmin(values);
        if (res.statusCode === 201) {
          showSnackbar("Retailer registered successfully.", "success");
          navigate("/login");
        }
        actions.resetForm();
      } catch (error) {
        showSnackbar("Email already exists", "error");
      }
    },
  });

  return (
    <Grid2 container size={12}>
      <Grid2 size={7} sx={styles.svgGrid}>
        <Box sx={styles.svgBox}>
          <img
            src={login}
            alt="Registration logo"
            style={{
              width: 600,
              height: 600,
              objectFit: "contain",
            }}
          />
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Box sx={styles.container}>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            sx={styles.heading}
          >
            Retailer Registration
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            <Grid2 container spacing={2} sx={styles.formGrid}>
              <Grid2 size={10}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  id="username"
                  autoComplete="off"
                  size="small"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid2>
              <Grid2 size={10}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  size="small"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid2>
              <Grid2 size={10}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contact_number"
                  id="contact_number"
                  autoComplete="off"
                  size="small"
                  value={formik.values.contact_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.contact_number &&
                    Boolean(formik.errors.contact_number)
                  }
                  helperText={
                    formik.touched.contact_number &&
                    formik.errors.contact_number
                  }
                />
              </Grid2>
              <Grid2 size={10}>
                <TextField
                  fullWidth
                  label="GST Number"
                  name="gst_no"
                  id="gst_no"
                  autoComplete="off"
                  size="small"
                  value={formik.values.gst_no}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.gst_no && Boolean(formik.errors.gst_no)}
                  helperText={formik.touched.gst_no && formik.errors.gst_no}
                />
              </Grid2>
              <Grid2 size={10}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  id="address"
                  autoComplete="off"
                  size="small"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid2>
              <Grid2 size={10}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="off"
                  size="small"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
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
              <Grid2 size={10}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="off"
                  size="small"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
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
              <Grid2 size={10}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={styles.button}
                >
                  Sign Up
                </Button>
              </Grid2>
            </Grid2>
          </Box>
          <Typography variant="body2" align="center">
            Already have an account?&nbsp;
            <Link to={"/login"}>click here to login</Link>
          </Typography>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default RetailerRegistration;
