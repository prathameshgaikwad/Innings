/* eslint-disable react/prop-types */

import { Field, useField } from "formik";
import { FormControl, FormHelperText, FormLabel, Typography } from "@mui/joy";

const CustomSelect = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Field as="select" {...field} {...props} className="customSelect">
        {options.map((opt) => (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        ))}
      </Field>
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

export default CustomSelect;
