import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
  Typography,
} from "@mui/joy";

import { useField } from "formik";

interface CustomInputProps extends Omit<InputProps, "name"> {
  label: string;
  name: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);

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
