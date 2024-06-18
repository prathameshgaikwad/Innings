import { Button } from "@mui/joy";
import CustomModal from "../notifications/modals/CustomModal";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const FinishSetup = () => {
  const [open, setOpen] = useState(false);
  const { fixtures } = useSelector((state) => state.tournamentSetup);
  const { tournamentId } = useParams();
  const disabledButton = fixtures.length === 0;

  return (
    <>
      <Button
        size="lg"
        color="success"
        type="submit"
        disabled={disabledButton}
        endDecorator={<TaskAltIcon />}
        onClick={() => setOpen(true)}
        sx={{ py: 2, fontSize: "large", width: "80%", my: 12 }}>
        Finish Tournament Setup
      </Button>
      <CustomModal
        color={"warning"}
        open={open}
        setOpen={setOpen}
        title={"Are you absolutely sure?"}
        content={
          "This action cannot be undone. This will permanently complete the tournament setup and you can no longer create teams, or set fixtures."
        }
        useCase={"finishSetup"}
        tournamentId={tournamentId}
        fixtures={fixtures}
      />
    </>
  );
};

export default FinishSetup;
