/* eslint-disable react/prop-types */

import { Button } from "@mui/joy";
import { clearTempTeam } from "../../state/tournament/tournamentSetupSlice";
import { useDispatch } from "react-redux";

const DeleteTeamButton = ({ setOpen }) => {
  const dispatch = useDispatch();

  const handleDeleteTeam = async () => {
    dispatch(clearTempTeam());
    setOpen(false);
  };

  return (
    <Button variant="solid" color="success" onClick={() => handleDeleteTeam()}>
      Yes, I&apos;m Sure
    </Button>
  );
};

export default DeleteTeamButton;
