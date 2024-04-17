/* eslint-disable react/prop-types */

import { Box, Button, Divider, Modal, ModalDialog, Typography } from "@mui/joy";

import ConfirmButton from "../buttons/ConfirmButton";
import ConfirmFinishTournamentSetup from "../buttons/ConfirmFinishTournamentSetup";
import DeleteTeamButton from "../buttons/DeleteTeamButton";
import { FiCheckCircle } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import LinkedConfirmButton from "../buttons/LinkedConfirmButton";
import { TbSwitch3 } from "react-icons/tb";

const CustomModal = ({
  color,
  open,
  setOpen,
  content,
  useCase,
  teamName,
  redirectLink,
  title,
}) => {
  const deleteTeam = useCase === "deleteTeam";
  const finishSetup = useCase === "finishSetup";
  const startMatch = useCase === "startMatch";
  const completeScoring = useCase === "completeScoring";
  const switchSides = useCase === "switchSides";

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
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
          minHeight: 230,
        })}>
        <Typography
          level="h3"
          startDecorator={
            (switchSides && <TbSwitch3 size={24} color="#0B6BCB" />) ||
            (completeScoring && (
              <FiCheckCircle size={24} color="#1F7A1F" />
            )) || <IoWarningOutline />
          }
          color={color}>
          {title}
        </Typography>
        <Divider />
        <Typography m={1.5} textColor="text.tertiary">
          {content}
        </Typography>
        {deleteTeam && (
          <Typography textColor="text.tertiary">
            This will delete the team:{" "}
            <Typography color="danger" variant="soft" level="title-md">
              {teamName}
            </Typography>
          </Typography>
        )}
        <Box
          sx={{
            mt: "auto",
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row-reverse" },
          }}>
          {startMatch && (
            <LinkedConfirmButton
              redirectLink={redirectLink}
              setOpen={setOpen}
            />
          )}
          {finishSetup && <ConfirmFinishTournamentSetup setOpen={setOpen} />}
          {deleteTeam && <DeleteTeamButton setOpen={setOpen} />}
          {completeScoring && (
            <ConfirmButton setOpen={setOpen} title={"Yes, Complete Scoring"} />
          )}
          {switchSides && (
            <ConfirmButton
              setOpen={setOpen}
              title={"Switch and Continue"}
              useCase="Switch"
            />
          )}
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(false)}>
            No, Go Back
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default CustomModal;
