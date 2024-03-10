import { Form, Formik } from "formik";

import { Button } from "@mui/joy";
import CustomInput from "../formComponents/CustomInput";
import { setLogin } from "../../state/user/userSlice";
import { signInSchema } from "../../schema/accounts/signIn";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(`http://localhost:3000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const responseData = await response.json();
        resetForm();

        if (responseData) {
          dispatch(
            setLogin({
              user: responseData.user,
              token: responseData.token,
            })
          );
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
