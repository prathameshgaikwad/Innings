/* eslint-disable react/prop-types */

import { Box, Button, Divider, Modal, ModalDialog, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import ActionButton from "../../buttons/ActionButton";
import { FiCheckCircle } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import LinkedConfirmButton from "../../buttons/LinkedConfirmButton";
import { TbSwitch3 } from "react-icons/tb";
import { clearTempTeam } from "../../../state/tournament/tournamentSetupSlice";
import { tournamentSetupApi } from "../../../services/api";
import { useNavigate } from "react-router-dom";

const CustomModal = ({
  color,
  open,
  setOpen,
  content,
  useCase,
  teamName,
  redirectLink,
  title,
  tournamentId,
  fixtures,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);

  const deleteTeam = useCase === "deleteTeam";
  const finishSetup = useCase === "finishSetup";
  const startMatch = useCase === "startMatch";
  const completeScoring = useCase === "completeScoring";
  const switchSides = useCase === "switchSides";

  const handleSwitch = () => {
    alert("Switching sides");
    setOpen(false);
  };

  const handleCompleteScoring = () => {
    alert("Completing scoring");
    setOpen(false);
  };

  const handleFinishSetup = async () => {
    dispatch(
      tournamentSetupApi.saveFixturesBatchToDb({
        tournamentId,
        token,
        fixtures,
        navigate,
        setOpen,
      })
    );
    //TODO: ATOMIZE above API call, and move it to its own component
  };

  const handleDeleteTeam = async () => {
    dispatch(clearTempTeam());
    setOpen(false);
  };

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
          {finishSetup && (
            <ActionButton
              handleOnClick={handleFinishSetup}
              color="success"
              title={"Yes, I'm Sure"}
            />
          )}
          {deleteTeam && (
            <ActionButton
              color="success"
              title="Yes, Delete this team"
              handleOnClick={handleDeleteTeam}
            />
          )}
          {completeScoring && (
            <ActionButton
              color="success"
              title="Yes, Complete Scoring"
              handleOnClick={handleCompleteScoring}
            />
          )}
          {switchSides && (
            <ActionButton
              color="success"
              title="Switch and Continue"
              handleOnClick={handleSwitch}
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
