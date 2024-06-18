import AddPlayersForm from "./AddPlayersForm";
import { Card } from "@mui/joy";
import CustomToast from "../../notifications/toasts/CustomToast";
import { useSelector } from "react-redux";
import { useState } from "react";

const AddPlayers = () => {
  const [openToast, setOpenToast] = useState(false);

  const { tempTeam } = useSelector((state) => state.tournamentSetup);

  const { teamName, teamColor, isProcessing, players } = tempTeam;

  return (
    <Card
      variant="outlined"
      size="lg"
      color={isProcessing ? "primary" : "neutral"}
      sx={{
        width: "auto",
        alignItems: "center",
        borderWidth: isProcessing ? 3 : 1,
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
        buttonDisabled={isProcessing}
        players={players}
        setOpenToast={setOpenToast}
      />
    </Card>
  );
};

export default AddPlayers;
