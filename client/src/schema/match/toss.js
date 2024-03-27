import { object, string } from "yup";

export const tossSchema = () =>
  object({
    decision: string().required("Required").oneOf(["bat", "field"]),
    winner_id: string().required("Required"),
  });
