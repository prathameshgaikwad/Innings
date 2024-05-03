/* eslint-disable react/prop-types */

import { Button, Typography } from "@mui/joy";

import CustomRunsModal from "../notifications/modals/CustomRunsModal";
import useLongPress from "../../hooks/useLongPress";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const ExtrasButton = ({ type, socket }) => {
  const { matchId } = useParams();
  const { bowler, bowlingTeam, current_innings_no } = useSelector(
    (state) => state.matchManagement
  );

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    const extraLogItem = {
      matchId,
      bowlingTeamId: bowlingTeam._id,
      bowler,
      extraType: type,
      runs: 1,
      innings_no: current_innings_no,
    };
    socket.emit("addExtra", extraLogItem);
  };

  const longPressEvent = useLongPress(handleClick);

  return (
    <Button sx={{ height: 50, flexGrow: 1 }} {...longPressEvent}>
      <Typography level="title-md">{type}</Typography>
      <CustomRunsModal open={open} setOpen={setOpen} />
    </Button>
  );
};

export default ExtrasButton;
