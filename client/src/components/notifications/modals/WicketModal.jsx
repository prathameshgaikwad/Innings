/* eslint-disable react/prop-types */

import {
  Box,
  Button,
  Divider,
  Input,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";

const WicketModal = ({ open, setOpen }) => {
  const handleWicket = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description"
        sx={(theme) => ({
          [theme.breakpoints.only("xs")]: {
            top: "unset",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: "none",
            maxWidth: "unset",
          },
          width: 400,
        })}>
        <Typography level="h4" color="danger">
          Wicket Details
        </Typography>
        <Divider />
        <Input
          name="wicketComment"
          placeholder="c R.Jadeja b R.Ashwin"
          sx={{ fontSize: "sm", my: 2 }}
        />
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row-reverse" },
            justifyContent: "space-between",
          }}>
          <Button
            variant="solid"
            color="success"
            sx={{ flexGrow: 1 }}
            onClick={() => handleWicket()}>
            Confirm Wicket
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default WicketModal;
