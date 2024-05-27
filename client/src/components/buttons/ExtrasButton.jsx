/* eslint-disable react/prop-types */

import { Button, Typography } from "@mui/joy";

import CustomRunsModal from "../notifications/modals/CustomRunsModal";
import useLongPress from "../../hooks/useLongPress";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const ExtrasButton = ({ type, socket }) => {
  const [open, setOpen] = useState(false);

  const { matchId } = useParams();
  const { batsmen, bowler, bowlingTeam, battingTeam, current_innings_no } =
    useSelector((state) => state.matchManagement);

  const handleClick = () => {
    if (!open) {
      const extraLogItem = {
        matchId,
        bowlingTeamId: bowlingTeam._id,
        battingTeamId: battingTeam._id,
        onStrikeBatsman: batsmen.onStrikeBatsman,
        offStrikeBatsman: batsmen.offStrikeBatsman,
        bowler,
        extraType: type,
        innings_no: current_innings_no,
      };
      socket.emit("addExtra", extraLogItem);
    }

    if (type === "P") {
      setOpen(true);
    }
  };

  const handleLongPress = () => {
    setOpen(true);
  };

  const longPressEvent = useLongPress(handleLongPress);

  return (
    <Button
      sx={{ height: 50, flexGrow: 1 }}
      {...longPressEvent}
      onClick={handleClick}>
      <Typography level="title-md">{type}</Typography>
      <CustomRunsModal open={open} setOpen={setOpen} />
    </Button>
  );
};

export default ExtrasButton;
