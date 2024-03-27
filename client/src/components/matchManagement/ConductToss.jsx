/* eslint-disable react/prop-types */

import {
  Button,
  ButtonGroup,
  Card,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import { Form, Formik } from "formik";
import {
  getTossResult,
  saveTossResultToDb,
} from "../../state/match/matchManagement";
import { useDispatch, useSelector } from "react-redux";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomSelect from "../formComponents/CustomSelect";
import { tossSchema } from "../../schema/match/toss";
import { useMediaQuery } from "@mui/material";

function createOption(name, _id) {
  return {
    label: name,
    value: _id,
  };
}

const ConductToss = ({ matchId }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const token = useSelector((state) => state.user.token);

  const initialValues = {
    decision: "",
    winner_id: "",
  };

  const { team1, team2 } = useSelector((state) => state.matchManagement);

  const teamOptions = [
    createOption("Select team", ""),
    createOption(team1.name, team1._id),
    createOption(team2.name, team2._id),
  ];
  const decisionOptions = [
    createOption("Select choice", "default"),
    createOption("Bat", "bat"),
    createOption("Field", "field"),
  ];

  const onSubmit = async (values, { resetForm }) => {
    const { decision, winner_id } = values;
    const winner = winner_id === team1._id ? team1.nameShort : team2.nameShort;
    const loser = winner_id === team1._id ? team2.nameShort : team1.nameShort;

    const toss = { decision, winner_id, winner, loser };

    try {
      await dispatch(saveTossResultToDb({ matchId, toss, token }))
        .then(() => dispatch(getTossResult({ matchId, token })))
        .then(() => resetForm());
    } catch (error) {
      console.error("Error saving data to the database:", error);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "70vh",
        mt: isMobile ? 2 : 4,
        mb: 8,
      }}>
      <Formik
        initialValues={initialValues}
        validationSchema={tossSchema}
        onSubmit={onSubmit}>
        {({ isSubmitting, isValid, touched }) => (
          <Form style={{ height: "100%" }}>
            <Stack
              sx={{
                height: "100%",
                display: "flex",
                py: 4,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Typography level={isMobile ? "h3" : "h2"}>
                Conduct Toss
              </Typography>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                }}>
                <CustomSelect name={"winner_id"} options={teamOptions} />
                <Typography>won the toss and chose to</Typography>
                <CustomSelect name={"decision"} options={decisionOptions} />
              </Stack>
              <ButtonGroup
                spacing={2}
                sx={{
                  flexDirection: isMobile ? "column-reverse" : "row",
                  width: isMobile ? 300 : 500,
                }}>
                <Button
                  color="danger"
                  size="lg"
                  variant="solid"
                  sx={{
                    width: isMobile ? "100%" : 200,
                    mx: "auto",
                  }}
                  startDecorator={<ArrowBackIcon />}>
                  Go Back
                </Button>
                <Button
                  color="success"
                  size="lg"
                  variant="solid"
                  fullWidth
                  type="submit"
                  disabled={
                    !isValid || isSubmitting || !Object.keys(touched).length
                  }
                  endDecorator={<ArrowForwardIcon />}>
                  Start Scoring!
                </Button>
              </ButtonGroup>
            </Stack>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default ConductToss;
