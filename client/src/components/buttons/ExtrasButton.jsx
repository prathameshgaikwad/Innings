/* eslint-disable react/prop-types */

import { Button, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import CustomRunsModal from "../notifications/modals/CustomRunsModal";
import { setOptimisticExtraRuns } from "../../state/match/matchManagementSlice";
import useLongPress from "../../hooks/useLongPress";
import { useParams } from "react-router-dom";
import { useState } from "react";

const ExtrasButton = ({ type, socket }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

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
      dispatch(setOptimisticExtraRuns(extraLogItem));
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
