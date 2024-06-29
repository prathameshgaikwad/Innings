import { object, string } from "yup";

export const teamSchema = object({
  teamName: string().required("Required"),
  teamColor: string().required("Required"),
});
