import AddPlayersForm from "./AddPlayersForm";
import { Card } from "@mui/joy";
import CustomToast from "../../notifications/toasts/CustomToast";
import { useSelector } from "react-redux";
import { useState } from "react";

const AddPlayers = () => {
  const [openToast, setOpenToast] = useState(false);

  const teamName = useSelector(
    (state) => state.tournamentSetup.tempTeam.teamName
  );
  const teamColor = useSelector(
    (state) => state.tournamentSetup.tempTeam.teamColor
  );

  const buttonDisabled = useSelector(
    (state) => state.tournamentSetup.tempTeam.isProcessing
  );

  const players = useSelector(
    (state) => state.tournamentSetup.tempTeam.players
  );

  const tempTeam = useSelector((state) => state.tournamentSetup.tempTeam);

  return (
    <Card
      variant="outlined"
      sx={{
        width: "auto",
        alignItems: "center",
      }}>
      {tempTeam && openToast && (
        <CustomToast
          color={"success"}
          content={`Saving Team ${tempTeam.teamName}...`}
          duration={1200}
        />
      )}
      <AddPlayersForm
        teamColor={teamColor}
        teamData={tempTeam}
        teamName={teamName}
        buttonDisabled={buttonDisabled}
        players={players}
        setOpenToast={setOpenToast}
      />
    </Card>
  );
};

export default AddPlayers;
