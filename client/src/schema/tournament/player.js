import { boolean, object, string } from "yup";

export const playerSchema = object({
  playerName: string().required("Required"),
  isCaptain: boolean().default(false),
});
