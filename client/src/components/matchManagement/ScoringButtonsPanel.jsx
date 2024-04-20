/* eslint-disable react/prop-types */

import { Button, ButtonGroup, Card, Typography, useTheme } from "@mui/joy";
import { useEffect, useState } from "react";

import CustomRunsModal from "../notifications/modals/CustomRunsModal";
import { GrUndo } from "react-icons/gr";
import ScoreButton from "../buttons/ScoreButton";
import WicketModal from "../notifications/modals/WicketModal";
import { useSelector } from "react-redux";

const ScoringButtonsPanel = ({ disabled, socket }) => {
  const theme = useTheme();
  const [isValid, setIsValid] = useState(false);
  const [isCustomRuns, setIsCustomRuns] = useState(false);
  const [isWicket, setIsWicket] = useState(false);
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
        <ScoreButton socket={socket} type={"extra"} score={"WD"} />
        <ScoreButton socket={socket} type={"extra"} score={"NB"} />
      </ButtonGroup>
      <ButtonGroup spacing="0.8rem" disabled={!isValid || disabled}>
        <ScoreButton socket={socket} type={"extra"} score={"B"} />
        <ScoreButton socket={socket} type={"extra"} score={"LB"} />
        <Button
          variant="solid"
          sx={{
            height: 50,
            flexGrow: 1,
            bgcolor: theme.palette.secondary.solidBg,
            "&:hover": {
              bgcolor: theme.palette.secondary.solidHoverBg,
            },
          }}>
          <GrUndo size={26} />
        </Button>
      </ButtonGroup>
      <ButtonGroup disabled={!isValid || disabled}>
        <Button
          color="danger"
          variant="solid"
          fullWidth
          sx={{ height: 50 }}
          onClick={() => setIsWicket(true)}>
          <Typography level="title-md" sx={{ color: "white" }}>
            WICKET
          </Typography>
        </Button>
        <WicketModal open={isWicket} setOpen={setIsWicket} />
      </ButtonGroup>
    </Card>
  );
};

export default ScoringButtonsPanel;
