import { Box, Button, Card, Modal, ModalDialog, Typography } from "@mui/joy";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CreateTournamentModal from "../modals/CreateTournamentModal";
import DrawIcon from "@mui/icons-material/Draw";
import { useState } from "react";

const CreateTournamentCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <Card
      variant="outlined"
      color="neutral"
      orientation="horizontal"
      sx={{
        gap: 2,
        textAlign: "left",
        borderStyle: "dashed",
        borderWidth: 2,
      }}>
      <DrawIcon color="success" fontSize="xl3" />
      <div>
        <Typography fontSize="xl" fontWeight="lg" sx={{ mb: 1 }}>
          Create a new tournament
        </Typography>
        <Typography level="body-sm">
          Organize your cricket tournament and spark a competition!
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            my: 2,
            flexWrap: "wrap",
            "& > *": { flex: "auto" },
          }}>
          <Button
            size="lg"
            endDecorator={<ArrowForwardIcon fontSize="xl" />}
            color="success"
            onClick={() => setOpen(true)}>
            Create a tournament
          </Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog sx={{ p: 0 }}>
              <CreateTournamentModal setOpen={setOpen} />
            </ModalDialog>
          </Modal>
        </Box>
      </div>
    </Card>
  );
};

export default CreateTournamentCard;
