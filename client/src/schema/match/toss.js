import { object, string } from "yup";

export const tossSchema = () =>
  object({
    decision: string().required("Required").oneOf(["bat", "field"]),
    winner: string().required("Required"),
  });
