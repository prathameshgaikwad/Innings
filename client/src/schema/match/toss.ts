import { object, string } from "yup";

export const tossSchema = () =>
  object({
    decision: string().required("Required").oneOf(["bat", "field"]),
    winnerId: string().required("Required"),
  });
