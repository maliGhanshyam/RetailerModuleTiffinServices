import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  MenuItem,
  Grid2,
} from "@mui/material";
import { ISnackbar } from "../LoginPage/Login.type";
import { UploadFileRounded } from "@mui/icons-material";
import { useSnackbar } from "../../hook";
import { AddTiffin } from "../../services/TiffinService/AddTiffin.types";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import {
  addTiffin,
  uploadTiffinImage,
} from "../../services/TiffinService/TiffinService";

const tiffinValidationSchema = Yup.object({
  tiffin_image_url: Yup.string().url("Must be a valid URL"),
  tiffin_name: Yup.string().required("Tiffin name is required"),
  tiffin_available_quantity: Yup.number()
    .integer("Must be an integer")
    .min(1, "Quantity must be greater than 0")
    .required("Available quantity is required"),
  tiffin_description: Yup.string()
    .min(5, "Minimum 5 characters")
    .max(255, "Maximum 255 characters")
    .required("Description is required"),
  // retailer_id: Yup.string()
  //   .matches(/^[a-fA-F0-9]{24}$/, "Invalid Retailer ID format")
  //   .required("Retailer ID is required"),
  tiffin_type: Yup.string()
    .oneOf(["veg", "non-veg", ""], "Invalid tiffin type")
    .required("Tiffin type is required"),
  tiffin_price: Yup.number()
    .positive("Price must be positive")
    .required("Price is required"),

  tiffin_isavailable: Yup.boolean().required("Availability status is required"),
});

const initialValues = {
  tiffin_image_url: "",
  tiffin_name: "",
  tiffin_available_quantity: 0,
  tiffin_description: "",
  retailer_id: "",
  tiffin_type: "",
  tiffin_price: 0,
  tiffin_isavailable: false,
};

export default function AddTiffinForm() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { showSnackbar } = useSnackbar();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const handleImageUpload = async (
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("recfile", selectedFile);
      try {
        console.log("handle image", formData);
        const response = await uploadTiffinImage(formData);
        if (response?.image) {
          setFieldValue("tiffin_image_url", response.image);
          showSnackbar("Image uploaded successfully.", "success");
        } else {
          throw new Error("Invalid response: Missing image field.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        showSnackbar("Image upload failed. Please try again.", "error");
      }
    }
  };
  console.log("outside");

  const handleSubmit = async (values: AddTiffin) => {
    try {
      if (_id) {
        // await updateOrganization(_id, values);
        showSnackbar("Tiffin item updated successfully.", "success");
      } else {
        values.retailer_id = userId!;
        await addTiffin(values);
        showSnackbar("Tiffin item added successfully.", "success");
      }
      // setTimeout(() => navigate("/retailer"), 1000);
    } catch (error) {
      showSnackbar("An error occurred. Please try again..", "error");
    }
  };
  return (
    <Container>
      <Box sx={{ marginTop: 4, padding: 3, boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Add Tiffin Item
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={tiffinValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form>
              <Grid2 container spacing={1} sx={{ paddingTop: 0 }}>
                <Grid2 size={6}>
                  <Field
                    as={TextField}
                    name="tiffin_name"
                    label="Tiffin Name"
                    fullWidth
                    height="12px"
                    margin="normal"
                    error={touched.tiffin_name && Boolean(errors.tiffin_name)}
                    helperText={touched.tiffin_name && errors.tiffin_name}
                  />
                </Grid2>
                <Grid2 size={6} paddingTop={"12px"}>
                  <FormControlLabel
                    control={
                      <Field
                        as={Switch}
                        name="tiffin_isavailable"
                        color="primary"
                        checked={values.tiffin_isavailable}
                      />
                    }
                    label="Available"
                  />
                </Grid2>
                <Grid2 size={4}>
                  <Field
                    as={TextField}
                    name="tiffin_available_quantity"
                    label="Available Quantity"
                    type="number"
                    fullWidth
                    height="12px"
                    margin="normal"
                    error={
                      touched.tiffin_available_quantity &&
                      Boolean(errors.tiffin_available_quantity)
                    }
                    helperText={
                      touched.tiffin_available_quantity &&
                      errors.tiffin_available_quantity
                    }
                  />
                </Grid2>

                <Grid2 size={4}>
                  <Field
                    as={TextField}
                    name="tiffin_type"
                    label="Tiffin Type"
                    select
                    fullWidth
                    height="12px"
                    margin="normal"
                    error={touched.tiffin_type && Boolean(errors.tiffin_type)}
                    helperText={touched.tiffin_type && errors.tiffin_type}
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="veg">Veg</MenuItem>
                    <MenuItem value="non-veg">Non-Veg</MenuItem>
                  </Field>
                </Grid2>
                <Grid2 size={4}>
                  <Field
                    as={TextField}
                    name="tiffin_price"
                    label="Price"
                    type="number"
                    fullWidth
                    height="12px"
                    margin="normal"
                    error={touched.tiffin_price && Boolean(errors.tiffin_price)}
                    helperText={touched.tiffin_price && errors.tiffin_price}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <Field
                    as={TextField}
                    name="tiffin_description"
                    label="Description"
                    fullWidth
                    height="12px"
                    margin="normal"
                    multiline
                    rows={3}
                    error={
                      touched.tiffin_description &&
                      Boolean(errors.tiffin_description)
                    }
                    helperText={
                      touched.tiffin_description && errors.tiffin_description
                    }
                  />
                </Grid2>

                <Grid2 size={6}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="left"
                    paddingTop={"12px"}
                  >
                    <Field name="tiffin_image_url">
                      {({ field, form }: { field: any; form: any }) => (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setSelectedFile(e.target.files?.[0] || null)
                            }
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<UploadFileRounded />}
                            onClick={() => handleImageUpload(setFieldValue)}
                            disabled={!selectedFile}
                            sx={{ marginLeft: 2 }}
                          >
                            Upload
                          </Button>
                        </>
                      )}
                    </Field>
                  </Box>
                </Grid2>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Box>
              </Grid2>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
