/* eslint-disable react/prop-types */

import { Button, Typography } from "@mui/joy";

import { GoDotFill } from "react-icons/go";
import { useParams } from "react-router-dom";

const ScoreButton = ({ score, type, socket }) => {
  const { matchId } = useParams();

  const handleClick = () => {
    if (type === "extra") {
      const extraLogItem = {
        extraType: score,
        runs: 1,
      };
      socket.emit("addExtra", extraLogItem, matchId);
    } else {
      const runLogItem = {
        playerId: 1,
        score: type === "dot" ? 0 : parseInt(score),
        bowlerId: 2,
      };
      socket.emit("addRun", runLogItem, matchId);
    }
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
