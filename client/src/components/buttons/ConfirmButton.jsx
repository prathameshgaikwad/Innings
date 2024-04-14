/* eslint-disable react/prop-types */

import {
  completeFirstInnings,
  setBattingTeam,
} from "../../state/match/matchManagementSlice";

import { Button } from "@mui/joy";
import { useDispatch } from "react-redux";

const ConfirmButton = ({ setOpen, title, useCase }) => {
  const isSwitch = useCase === "Switch";
  const dispatch = useDispatch();

  const handleSwitch = () => {
    dispatch(completeFirstInnings());
    dispatch(setBattingTeam());
    setOpen(false);
  };

  return (
    <Button
      variant="solid"
      color="success"
      onClick={() => (isSwitch ? handleSwitch() : setOpen(false))}>
      {title}
    </Button>
  );
};

export default ConfirmButton;
