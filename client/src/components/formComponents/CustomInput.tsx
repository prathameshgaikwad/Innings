import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputProps,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useField } from "formik";

interface CustomInputProps extends Omit<InputProps, "name"> {
  label: string;
  name: string;
  type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type = "text",
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormControl>
      <FormLabel sx={{ whiteSpace: "nowrap" }}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        type={type === "password" && showPassword ? "text" : type}
        autoComplete="off"
        value={field.value || ""}
        endDecorator={
          type === "password" ? (
            <IconButton onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ) : null
        }
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
