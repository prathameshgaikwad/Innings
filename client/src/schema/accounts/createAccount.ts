import { object, string } from "yup";

export const createAccountSchema = object({
  first_name: string().required("Required"),
  last_name: string().required("Required"),
  email: string().email("Invalid email address").required("Required"),
  password: string().required("Required"),
});
