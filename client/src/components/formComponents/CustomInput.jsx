/* eslint-disable react/prop-types */

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";

import { useField } from "formik";

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl>
      <FormLabel sx={{ whiteSpace: "nowrap" }}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        autoComplete="off"
        value={field.value || ""}
        sx={{ fontSize: "sm" }}
      />
      {meta.touched && meta.error && (
        <FormHelperText>
          <Typography level="body-xs" color="danger">
            {meta.error}
          </Typography>
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomInput;
