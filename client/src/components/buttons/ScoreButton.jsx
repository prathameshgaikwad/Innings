/* eslint-disable react/prop-types */

import { Button, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import { GoDotFill } from "react-icons/go";
import { setOptimisticInningsRuns } from "../../state/match/matchManagementSlice";
import { useParams } from "react-router-dom";

const ScoreButton = ({ score, type, socket }) => {
  const dispatch = useDispatch();
  const { matchId } = useParams();

  const { batsmen, bowler, battingTeam, bowlingTeam, current_innings_no } =
    useSelector((state) => state.matchManagement);

  const handleClick = () => {
    const runs_scored = type === "dot" ? 0 : parseInt(score);

    // DISPATCH AN OPTIMISTIC UPDATE FOR THE ADMIN USER
    dispatch(setOptimisticInningsRuns({ runs_scored }));

    // EMIT SOCKET EVENT TO UPDATE DATABASE
    const runLogData = {
      matchId,
      battingTeamId: battingTeam._id,
      bowlingTeamId: bowlingTeam._id,
      onStrikeBatsman: batsmen.onStrikeBatsman,
      offStrikeBatsman: batsmen.offStrikeBatsman,
      bowler,
      runs_scored,
      innings_no: current_innings_no,
    };
    socket.emit("addRun", runLogData);
  };

  return (
    <Button sx={{ height: 50, flexGrow: 1 }} onClick={handleClick}>
      {type === "dot" ? (
        <GoDotFill size={18} />
      ) : (
        <Typography level="title-md">{score}</Typography>
      )}
    </Button>
  );
};

export default ScoreButton;
