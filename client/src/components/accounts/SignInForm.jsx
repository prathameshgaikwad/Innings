import { Form, Formik } from "formik";

import { Button } from "@mui/joy";
import CustomInput from "../formComponents/CustomInput";
import { signInSchema } from "../../schema/accounts/signIn";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../services/api";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    dispatch(userApi.signInUser(values, resetForm, navigate));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <CustomInput
            name="email"
            type="email"
            label="Email"
            placeholder="email"
          />
          <CustomInput
            name="password"
            type="password"
            label="Password"
            placeholder="password"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            fullWidth
            sx={{ mt: 4 }}>
            Sign in
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
