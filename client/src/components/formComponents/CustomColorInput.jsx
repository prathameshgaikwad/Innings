/* eslint-disable react/prop-types */

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";

import { useEffect } from "react";
import { useField } from "formik";

const CustomColorInput = ({ label, setFieldValue, color, ...props }) => {
  const [field, meta] = useField(props);

  useEffect(() => {
    setFieldValue(field.name, color);
  }, [field.name, color, setFieldValue]);

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input {...field} {...props} />
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

export default CustomColorInput;
