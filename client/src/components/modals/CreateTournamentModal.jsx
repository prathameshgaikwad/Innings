/* eslint-disable react/prop-types */

import { Button, Card, Grid, Stack, Typography } from "@mui/joy";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import { CgDetailsMore } from "react-icons/cg";
import CustomInput from "../formComponents/CustomInput";
import { addCreatedTournament } from "../../state/tournament/tournamentSlice";
import { tournamentSchema } from "../../schema/tournament/tournament";
import { useNavigate } from "react-router-dom";

const CreateTournamentModal = ({ setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);
  const token = useSelector((state) => state.user.token);

  const initialValues = {
    name: "",
    venue: "",
    start_date: "",
    end_date: "",
    overs: "",
    admin_id: userId,
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:3000/tournaments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Fetching error");
      }

      const responseData = await response.json();

      dispatch(addCreatedTournament(responseData._id));

      resetForm();
      setOpen(false);
      navigate(`/tournaments/${responseData._id}/setup`);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        p: 6,
        width: 500,
      }}>
      <Formik
        initialValues={initialValues}
        validationSchema={tournamentSchema}
        onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form style={{ width: "100%" }}>
            <Stack gap={4}>
              <Typography
                level="h3"
                mx="auto"
                color="warning"
                startDecorator={<CgDetailsMore fontSize={32} />}>
                Basic Details
              </Typography>
              <CustomInput
                name="name"
                label="Tournament Name"
                type="text"
                placeholder="Tournament Name"
              />
              <Grid container justifyContent="space-between" columns={18}>
                <Grid xs={10}>
                  <CustomInput
                    name="venue"
                    label="Venue"
                    type="text"
                    placeholder="Where is it taking place?"
                  />
                </Grid>
                <Grid xs={6}>
                  <CustomInput
                    name="overs"
                    label="Overs"
                    type="number"
                    placeholder="Overs"
                  />
                </Grid>
              </Grid>
              <Stack direction="row" justifyContent="space-between">
                <CustomInput name="start_date" label="Start Date" type="date" />
                <CustomInput name="end_date" label="End Date" type="date" />
              </Stack>
            </Stack>
            <Button
              variant="solid"
              color="success"
              type="submit"
              size="lg"
              disabled={isSubmitting}
              startDecorator={<AddIcon />}
              sx={{ width: "100%", mt: 6 }}>
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default CreateTournamentModal;
