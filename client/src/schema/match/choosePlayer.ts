import { mixed, object } from "yup";

export const choosePlayer = () =>
  object({
    player: mixed().required("Required"),
  });
