/* eslint-disable react/prop-types */

import { Button, ButtonGroup, Card, Typography } from "@mui/joy";
import { useEffect, useState } from "react";

import CustomRunsModal from "../notifications/modals/CustomRunsModal";
import ExtrasButton from "../buttons/ExtrasButton";
import ScoreButton from "../buttons/ScoreButton";
import UndoButton from "../buttons/UndoButton";
import WicketButton from "../buttons/WicketButton";
import { useSelector } from "react-redux";

const ScoringButtonsPanel = ({ disabled, socket }) => {
  const [isValid, setIsValid] = useState(false);
  const [isCustomRuns, setIsCustomRuns] = useState(false);
  const batsmen = useSelector((state) => state.matchManagement.batsmen);
  const bowler = useSelector((state) => state.matchManagement.bowler);

  const isBowler = bowler._id && bowler._id.length > 0;

  let batsmanCount = 0;

  if (batsmen.onStrikeBatsman._id && batsmen.onStrikeBatsman._id.length > 0)
    batsmanCount++;
  if (batsmen.offStrikeBatsman._id && batsmen.offStrikeBatsman._id.length > 0)
    batsmanCount++;

  useEffect(() => {
    setIsValid(batsmanCount === 2 && isBowler);
  }, [batsmanCount, isBowler]);

  return (
    <Card
      variant="plain"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 320,
        p: 0,
      }}>
      <ButtonGroup spacing="0.8rem" disabled={!isValid || disabled}>
        <ScoreButton socket={socket} type={"dot"} />
        <ScoreButton socket={socket} score={"1"} />
        <ScoreButton socket={socket} score={"2"} />
      </ButtonGroup>
      <ButtonGroup spacing="0.8rem" disabled={!isValid || disabled}>
        <ScoreButton socket={socket} score={"3"} />
        <ScoreButton socket={socket} score={"4"} />
        <ScoreButton socket={socket} score={"6"} />
      </ButtonGroup>
      <ButtonGroup spacing="0.8rem" disabled={!isValid || disabled}>
        <Button
          sx={{ height: 50, flexGrow: 1 }}
          onClick={() => setIsCustomRuns(true)}>
          <Typography level="title-md">CUSTOM</Typography>
        </Button>
        <CustomRunsModal open={isCustomRuns} setOpen={setIsCustomRuns} />
        <ExtrasButton socket={socket} type={"WD"} />
        <ExtrasButton socket={socket} type={"NB"} />
      </ButtonGroup>
      <ButtonGroup spacing="0.8rem" disabled={!isValid || disabled}>
        <ExtrasButton socket={socket} type={"B"} />
        <ExtrasButton socket={socket} type={"LB"} />
        <ExtrasButton socket={socket} type={"P"} />
        <UndoButton />
      </ButtonGroup>
      <ButtonGroup disabled={!isValid || disabled}>
        <WicketButton />
      </ButtonGroup>
    </Card>
  );
};

export default ScoringButtonsPanel;
