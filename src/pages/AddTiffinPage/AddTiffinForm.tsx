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
} from "@mui/material";
import { ISnackbar } from "../LoginPage/Login.type";

const tiffinValidationSchema = Yup.object({
  tiffin_name: Yup.string().required("Tiffin name is required"),
  tiffin_available_quantity: Yup.number()
    .integer("Must be an integer")
    .min(0, "Quantity cannot be negative")
    .required("Available quantity is required"),
  tiffin_description: Yup.string()
    .min(5, "Minimum 5 characters")
    .max(255, "Maximum 255 characters")
    .required("Description is required"),
  tiffin_type: Yup.string()
    .oneOf(["veg", "non-veg"], "Invalid tiffin type")
    .required("Tiffin type is required"),
  tiffin_price: Yup.number()
    .positive("Price must be positive")
    .required("Price is required"),
  tiffin_rating: Yup.number()
    .min(0, "Rating cannot be below 0")
    .max(5, "Rating cannot exceed 5")
    .optional(),
  tiffin_isavailable: Yup.boolean().required("Availability status is required"),
});

const initialValues = {
  tiffin_name: "",
  tiffin_available_quantity: 0,
  tiffin_description: "",
  tiffin_type: "",
  tiffin_price: 0,
  tiffin_rating: null,
  tiffin_isavailable: false,
};

const AddTiffinForm = () => {
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      console.log("Form Values:", values);
      // Replace with your API call logic
      setSnackbar({
        open: true,
        message: "Tiffin item added successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "An error occurred while submitting the form",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container>
      <Box sx={{ marginTop: 4, padding: 3, boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Add Tiffin Item
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={tiffinValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                name="tiffin_name"
                label="Tiffin Name"
                fullWidth
                margin="normal"
                error={touched.tiffin_name && Boolean(errors.tiffin_name)}
                helperText={touched.tiffin_name && errors.tiffin_name}
              />
              <Field
                as={TextField}
                name="tiffin_available_quantity"
                label="Available Quantity"
                type="number"
                fullWidth
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
              <Field
                as={TextField}
                name="tiffin_description"
                label="Description"
                fullWidth
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
              <Field
                as={TextField}
                name="tiffin_type"
                label="Tiffin Type"
                select
                fullWidth
                margin="normal"
                error={touched.tiffin_type && Boolean(errors.tiffin_type)}
                helperText={touched.tiffin_type && errors.tiffin_type}
              >
                <MenuItem value="veg">Veg</MenuItem>
                <MenuItem value="non-veg">Non-Veg</MenuItem>
              </Field>
              <Field
                as={TextField}
                name="tiffin_price"
                label="Price"
                type="number"
                fullWidth
                margin="normal"
                error={touched.tiffin_price && Boolean(errors.tiffin_price)}
                helperText={touched.tiffin_price && errors.tiffin_price}
              />
              <Field
                as={TextField}
                name="tiffin_rating"
                label="Rating"
                type="number"
                fullWidth
                margin="normal"
                error={touched.tiffin_rating && Boolean(errors.tiffin_rating)}
                helperText={touched.tiffin_rating && errors.tiffin_rating}
              />
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
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddTiffinForm;
