import * as yup from "yup";

export const userSchemaValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Not valid email format").required("Email is required"),
  password: yup.string().min(6, "Password too short").max(20, "Password too long").required("Password is required"),
  confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords don't match"),
});