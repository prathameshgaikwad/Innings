import { object, string } from "yup";

export const createAccountSchema = object({
  firstName: string().required("Required"),
  lastName: string().required("Required"),
  email: string().email("Invalid email address").required("Required"),
  password: string().required("Required"),
});
