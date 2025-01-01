/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/joy";
import { addJoinedTournament } from "../../state/tournament/tournamentSlice";
import { tournamentPageApi } from "../../services/api";

const handleJoinTournament = async ({
  dispatch,
  user_id,
  token,
  tournament_id,
  setIsOpen,
}) => {
  try {
    dispatch(
      tournamentPageApi.joinTournament({ user_id, token, tournament_id })
    );
    dispatch(addJoinedTournament(tournament_id));
    setIsOpen(true);

    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  } catch (error) {
    console.log(error);
  }
};

const JoinTournamentButton = ({
  user_id,
  token,
  tournament_id,
  setIsOpen,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { joinedTournaments, createdTournaments } = useSelector(
    (state) => state.tournaments
  );

  let buttonDisplay = !isLoading ? "flex" : "none";

  if (joinedTournaments.includes(tournament_id)) buttonDisplay = "none";
  if (createdTournaments.includes(tournament_id)) buttonDisplay = "none";

  return (
    <Button
      sx={{
        height: 90,
        width: 90,
        borderRadius: 50,
        position: "absolute",
        bottom: -45,
        right: 100,
        overflow: "hidden",
        display: buttonDisplay,
        border: "2px solid",
        transition: "all 0.2s ease-in-out",
        zIndex: 20,
        "&:hover": {
          borderWidth: 4,
          backgroundColor: "var(--joy-palette-primary-solidBg)",
          "&:after ": {
            left: "130%",
            transition: " all 550ms cubic-bezier(0.19, 1, 0.22, 1)",
          },
        },
        "&:after": {
          background: "#fff",
          content: '""',
          height: "155px",
          left: "-65px",
          opacity: ".2",
          position: "absolute",
          top: "-40px",
          transform: "rotate(35deg)",
          transition: "all 550ms cubic-bezier(0.19, 1, 0.22, 1)",
          width: "50px",
          zIndex: -10,
        },
      }}
      endDecorator={<ArrowForwardIcon />}
      onClick={() =>
        handleJoinTournament({
          dispatch,
          user_id,
          tournament_id,
          token,
          setIsOpen,
        })
      }>
      Join
    </Button>
  );
};

export default JoinTournamentButton;
