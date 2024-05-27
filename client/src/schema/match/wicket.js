import { mixed, object, string } from "yup";

export const wicketSchema = () =>
  object({
    player_id: mixed().required("Required"),
    bowler_id: mixed().required("Required"),
    wicket_comment: string().required("Required"),
  });
