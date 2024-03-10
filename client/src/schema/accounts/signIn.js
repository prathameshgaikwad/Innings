import { object, string } from "yup";

export const signInSchema = object({
  email: string().email("Invalid email address").required("Required"),
  password: string().required("Required"),
});
