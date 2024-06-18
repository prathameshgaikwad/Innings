import { Button, Card, Grid, Stack, Typography } from "@mui/joy";
import { Form, Formik } from "formik";
import {
  addFixture,
  clearFixtures,
} from "../../state/tournament/tournamentSetupSlice";
import { useDispatch, useSelector } from "react-redux";

import ChooseTeam from "./ChooseTeam";
import CustomInput from "../formComponents/CustomInput";
import CustomToast from "../notifications/toasts/CustomToast";
import { FaUndo } from "react-icons/fa";
import FixturesList from "./FixturesList";
import { HiMiniAdjustmentsVertical } from "react-icons/hi2";
import { HiOutlineSaveAs } from "react-icons/hi";
import VersusIcon from "../icons/VersusIcon";
import { fixtureSchema } from "../../schema/tournament/fixture";
import { useState } from "react";

const CreateFixturesForm = () => {
  const dispatch = useDispatch();
  const fixtures = useSelector((state) => state.tournamentSetup.fixtures);
  const teams = useSelector((state) => state.tournamentSetup.teams);
  const [isOpen, setIsOpen] = useState(false);
  const disabledButton = fixtures.length === 0;
  const existingMatchNumbers = fixtures.map((fixture) => fixture.match_no);

  const initialValues = {
    matchNumber: "",
    team1: "",
    team2: "",
    overs: "",
    matchDate: "",
    matchTime: "",
  };

  const onSubmit = (values, { resetForm }) => {
    setIsOpen(true);
    dispatch(addFixture(values));
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
    resetForm();
  };

  return (
    <Card
      variant="outlined"
      size="lg"
      sx={{
        width: "80%",
      }}>
      {isOpen && (
        <CustomToast
          color={"success"}
          content={`Fixture Saved`}
          duration={1500}
        />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={fixtureSchema(teams, existingMatchNumbers)}
        onSubmit={onSubmit}>
        {({ isSubmitting, dirty, isValid }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography
              level="h3"
              mx="auto"
              my={4}
              color="primary"
              startDecorator={<HiMiniAdjustmentsVertical />}>
              Create Fixtures
            </Typography>
            <Stack
              direction="column"
              gap={4}
              alignItems="center"
              width="80%"
              maxWidth={600}
              mt={4}>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                gap={4}
                width="100%"
                alignItems="center">
                <ChooseTeam name="team1" id={1} />
                <VersusIcon />
                <ChooseTeam name="team2" id={2} />
              </Stack>
              <Grid
                container
                gap={4}
                justifyContent="space-between"
                width="100%">
                <Grid xs={5}>
                  <CustomInput
                    name="matchNumber"
                    label="Match Number"
                    placeholder="#"
                    type="number"
                  />
                </Grid>
                <Grid xs={5}>
                  <CustomInput
                    name="overs"
                    label="Choose Overs"
                    placeholder="Overs"
                    type="number"
                  />
                </Grid>
              </Grid>

              <Grid
                container
                gap={4}
                justifyContent="space-between"
                width="100%">
                <Grid xs={5}>
                  <CustomInput
                    name="matchDate"
                    label="Match Date"
                    type="date"
                  />
                </Grid>
                <Grid xs={5}>
                  <CustomInput
                    name="matchTime"
                    label="Match Time"
                    type="time"
                  />
                </Grid>
              </Grid>
            </Stack>
            <Grid
              container
              columns={25}
              width="80%"
              my={8}
              gap={2}
              justifyContent="space-around">
              <Grid xs={8}>
                <Button
                  size="lg"
                  color="danger"
                  variant="outlined"
                  disabled={disabledButton}
                  fullWidth
                  onClick={() => dispatch(clearFixtures())}
                  startDecorator={<FaUndo />}
                  sx={{ whiteSpace: "nowrap" }}>
                  Reset All Fixtures
                </Button>
              </Grid>
              <Grid xs={16}>
                <Button
                  size="lg"
                  color="success"
                  type="submit"
                  disabled={isSubmitting || !dirty || !isValid}
                  fullWidth
                  startDecorator={<HiOutlineSaveAs fontSize={21} />}>
                  Save Fixture
                </Button>
              </Grid>
            </Grid>
            <FixturesList />
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default CreateFixturesForm;
