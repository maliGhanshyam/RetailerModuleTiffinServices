import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "./ProfileUpdate.styles";
import { RETAILER_ROLE_ID } from "../../constants/ROLES";
import {
  getUserByToken,
  updateProfile,
  uploadUserImage,
} from "../../services/Auth";
import login from "../../assets/LoginScreen.svg";
import { useSnackbar } from "../../hook";
import {
  ProfileResponse,
  User,
  UserResponse,
} from "../../services/Auth/Auth.types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";

const ProfileUpdate = () => {
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");
  const [userData, setUserData] = useState<User>();
  const [image, setImage] = useState<File | null>(null);
  const [image1, setImage1] = useState<string>("");
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const response: UserResponse = await getUserByToken();
        setUserData(response.data);
      }
    } catch (error) {
      showSnackbar("Error fetching user data", "error");
    }
  };

  // Set selectedOrganization from userData if available
  useEffect(() => {
    if (userData) {
      setImage1(userData.user_image || "");
      formik.setFieldValue("username", userData.username || "");
      formik.setFieldValue("email", userData.email || "");
      formik.setFieldValue("contact_number", userData.contact_number || "");
      formik.setFieldValue("address", userData.address || "");
      formik.setFieldValue("user_image", userData.user_image || "");
      formik.setFieldValue("organization_id", userData.role_specific_details?.approval?.organization_id || "");
      formik.setFieldValue("approval_status", userData.role_specific_details?.approval?.approval_status || "");
    }
  }, [userData]);

  const formik = useFormik({
    enableReinitialize: true, // Reinitialize Formik when userData changes
    initialValues: {
      user_image: image1 || "",
      username: userData?.username || "",
      email: userData?.email || "",
      contact_number: userData?.contact_number || "",
      address: userData?.address || "",
      approval_status:userData?.role_specific_details?.approval?.approval_status||"",
      organization_id:userData?.role_specific_details?.approval?.organization_id||"",
      role_id: userData?.role_id || RETAILER_ROLE_ID,
      gst_no: userData?.role_specific_details?.gst_no || "",
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
      gst_no: Yup.string()
        // .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/)
        .required("GST no is required"),
    }),
    onSubmit: async (values, actions) => {
      try {
        const res: ProfileResponse = await updateProfile(userId!, values);
        if (res.statusCode === 200) {
          showSnackbar("Profile updated successfully.", "success");
        }
      } catch (error) {
        showSnackbar("Error updating profile", "error");
      }
    },
  });
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // first file selected
    if (file) {
      setImage(file);
    }
  };
  const handleImageUpload = async () => {
    if (!image) {
      showSnackbar("Please select an image first", "error");
      return;
    }
    try {
      const res = await uploadUserImage(image!);
      setImage1(res.image);
      setUserData((prevUserData: any) => ({
        ...prevUserData,
        user_image: res.image, // Update userData directly instead of fetchUserData
      }));
      showSnackbar("Image uploaded successfully!", "success");
    } catch (error) {
      showSnackbar("Failed to upload image.", "error");
    }
  };
  return (
    <Grid2 container size={12}>
      <Grid2 size={7} sx={styles.svgGrid}>
        <Box sx={styles.svgBox}>
          <img
            src={login}
            alt="profile"
            style={{
              width: 600,
              height: 600,
              objectFit: "contain",
            }}
          />
        </Box>
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 4 }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={styles.container}>
          <Typography
            component="h1"
            variant="h5"
            align="center"
            sx={styles.heading}
          >
            Profile Update
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            <Grid2 container spacing={2} sx={{ justifyContent: "center" }}>
              <Grid2 size={10}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: "none" }}
                    id="profile-image-upload"
                  />
                  {userData ? (
                    <img
                      src={
                        userData.user_image || "https://via.placeholder.com/150"
                      }
                      alt="profile"
                      onClick={() =>
                        document.getElementById("profile-image-upload")?.click()
                      }
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150"
                      alt="placeholder"
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <Button
                    onClick={handleImageUpload}
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{ paddingX: "28px" }}
                  >
                    Upload
                  </Button>
                </Box>
              </Grid2>

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
                  helperText={
                    formik.touched.username &&
                    typeof formik.errors.username === "string"
                      ? formik.errors.username
                      : null
                  }
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
                  helperText={
                    formik.touched.email &&
                    typeof formik.errors.email === "string"
                      ? formik.errors.email
                      : null
                  }
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
                    typeof formik.errors.contact_number === "string"
                      ? formik.errors.contact_number
                      : null
                  }
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
                  helperText={
                    formik.touched.address &&
                    typeof formik.errors.address === "string"
                      ? formik.errors.address
                      : null
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
                    disabled={true}
                    error={
                      formik.touched.gst_no &&
                      Boolean(formik.errors.gst_no)
                    }
                    helperText={
                      formik.touched.gst_no &&
                      formik.errors.gst_no
                    }
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
                  Save Changes
                </Button>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default ProfileUpdate;
