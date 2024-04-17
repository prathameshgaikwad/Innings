import { Box, Button, Card, Typography } from "@mui/joy";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomInput from "../formComponents/CustomInput";
import CustomToast from "../notifications/toasts/CustomToast";
import { addJoinedTournament } from "../../state/tournament/tournamentSlice";
import { joinTournamentSchema } from "../../schema/tournament/joinTournament";
import { tournamentPageApi } from "../../services/api";
import { useState } from "react";

const JoinATournament = () => {
  const dispatch = useDispatch();
  const initialValues = {
    tournament_id: "",
  };

  const token = useSelector((state) => state.user.token);
  const user_id = useSelector((state) => state.user.user._id);
  const joinedTournaments = useSelector(
    (state) => state.tournaments.joinedTournaments
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleJoinTournament = async (values, { resetForm }) => {
    try {
      dispatch(
        tournamentPageApi.joinTournament({
          user_id,
          token,
          tournament_id: values.tournament_id,
        })
      );
      dispatch(addJoinedTournament({ tournament_id: values.tournament_id }));
      resetForm();
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isOpen && (
        <CustomToast
          color={"success"}
          content={`You've joined the tournament!`}
          duration={3000}
        />
      )}
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
            {({ isSubmitting, dirty }) => (
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
                    name="tournament_id"
                    placeholder="Tournament ID or Link"
                    size="lg"
                  />
                  <Button
                    size="lg"
                    type="submit"
                    disabled={!dirty || isSubmitting}
                    endDecorator={<ArrowForwardIcon />}>
                    Join
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </Card>
    </>
  );
};

export default JoinATournament;
