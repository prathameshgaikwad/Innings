import { Box, Button, Card, Typography } from "@mui/joy";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomInput from "../formComponents/CustomInput";
import { addJoinedTournament } from "../../state/tournament/tournamentSlice";
import { joinTournamentSchema } from "../../schema/tournament/joinTournament";

const JoinATournament = () => {
  const dispatch = useDispatch();
  const initialValues = {
    tournamentIdentifier: "",
  };

  const token = useSelector((state) => state.user.token);
  const user_id = useSelector((state) => state.user.user._id);
  const joinedTournaments = useSelector(
    (state) => state.tournaments.joinedTournaments
  );

  const handleJoinTournament = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:3000/tournaments/join", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          tournament_id: values.tournamentIdentifier,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to join tournament!");
      }

      dispatch(
        addJoinedTournament({ tournament_id: values.tournamentIdentifier })
      );
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      variant="outlined"
      color="neutral"
      orientation="horizontal"
      sx={{ gap: 2, textAlign: "left" }}>
      <AddIcon color="primary" fontSize="xl3" />
      <div>
        <Typography fontSize="xl" fontWeight="lg" sx={{ mb: 1 }}>
          Join a tournament
        </Typography>
        <Typography level="body-sm">
          Be a part of the action and catch all the updates!
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={joinTournamentSchema(joinedTournaments)}
          onSubmit={handleJoinTournament}>
          {({ isSubmitting, isValid }) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  my: 2,
                  flexWrap: "wrap",
                  "& > *": { flex: "auto" },
                  alignItems: "center",
                }}>
                <CustomInput
                  name="tournamentIdentifier"
                  placeholder="Tournament ID or Link"
                  size="lg"
                />
                <Button
                  size="lg"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  endDecorator={<ArrowForwardIcon />}>
                  Join
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </Card>
  );
};

export default JoinATournament;
