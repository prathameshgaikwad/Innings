/* eslint-disable react/prop-types */

import { Button, Grid, Stack } from "@mui/joy";
import { Form, Formik } from "formik";

import CustomInput from "../formComponents/CustomInput";
import { createAccountSchema } from "../../schema/accounts/createAccount";
import { registerUser } from "../../state/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateAccountForm = ({
  setIsSuccessVisible,
  setIsFailedResponseVisible,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    dispatch(
      registerUser(
        values,
        resetForm,
        setIsFailedResponseVisible,
        setIsSuccessVisible,
        navigate
      )
    );
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
                  name="first_name"
                  type="text"
                  label="First Name"
                  placeholder="First Name"
                />
              </Grid>
              <Grid xs={12}>
                <CustomInput
                  name="last_name"
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
