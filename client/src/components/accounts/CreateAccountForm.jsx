/* eslint-disable react/prop-types */

import { Button, Grid, Stack } from "@mui/joy";
import { Form, Formik } from "formik";

import CustomInput from "../formComponents/CustomInput";
import { createAccountSchema } from "../../schema/accounts/createAccount";
import { useNavigate } from "react-router-dom";

const CreateAccountForm = ({
  setIsSuccessVisible,
  setIsFailedResponseVisible,
}) => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setIsSuccessVisible(true);
        const responseData = await response.json();

        if (responseData) {
          setTimeout(() => {
            resetForm();
            navigate("/accounts/sign-in");
          }, 2000);
        }
      } else {
        if (response.status === 400) {
          setIsFailedResponseVisible(true);
          setTimeout(() => {
            setIsFailedResponseVisible(false);
            resetForm();
          }, 2400);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createAccountSchema}
      onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Stack direction="column" gap={2}>
            <Grid container columns={25} justifyContent="space-between">
              <Grid xs={12}>
                <CustomInput
                  name="firstName"
                  type="text"
                  label="First Name"
                  placeholder="First Name"
                />
              </Grid>
              <Grid xs={12}>
                <CustomInput
                  name="lastName"
                  type="text"
                  label="Last Name"
                  placeholder="Last Name"
                />
              </Grid>
            </Grid>
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
              Create an account
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default CreateAccountForm;
