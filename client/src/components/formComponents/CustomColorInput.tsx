import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
  Typography,
} from "@mui/joy";
import React, { useEffect } from "react";

import { useField } from "formik";

interface CustomColorInputProps extends Omit<InputProps, "color"> {
  label: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  color: string;
  name: string;
}

const CustomColorInput: React.FC<CustomColorInputProps> = ({
  label,
  setFieldValue,
  color,
  ...props
}) => {
  const [field, meta] = useField(props.name);

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
