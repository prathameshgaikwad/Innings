import { mixed, object, string } from "yup";

export const wicketSchema = () =>
  object({
    on_strike_batsman_id: mixed().required("Required"),
    bowler_id: mixed().required("Required"),
    dismissal_comment: string().required("Required"),
  });
