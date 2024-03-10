/* eslint-disable react/prop-types */

import { Button, Typography } from "@mui/joy";

import { GoDotFill } from "react-icons/go";

const ScoreButton = ({ score, type }) => {
  return (
    <Button sx={{ height: 50, flexGrow: 1 }}>
      {type === "dot" ? (
        <GoDotFill size={18} />
      ) : (
        <Typography level="title-md">{score}</Typography>
      )}
    </Button>
  );
};

export default ScoreButton;
