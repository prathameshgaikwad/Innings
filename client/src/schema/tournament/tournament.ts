import { date, number, object, string } from "yup";

export const tournamentSchema = object({
  name: string().required("Required"),
  venue: string().required("Required"),
  start_date: date().required("Required"),
  end_date: date().required("Required"),
  overs: number().required("Required"),
  admin_id: string().required("Required"),
});
