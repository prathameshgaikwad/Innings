import { Box, Button, Card, Stack, Typography, useTheme } from "@mui/joy";
import { Form, Formik } from "formik";
import {
  addPlayerToTeam,
  saveTeamToDb,
} from "../../state/tournament/tournamentSetupSlice";
import { useDispatch, useSelector } from "react-redux";

import CustomInput from "../formComponents/CustomInput";
import CustomModal from "../modals/CustomModal";
import CustomToast from "../cards/CustomToast";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import { HiOutlineSaveAs } from "react-icons/hi";
import { MdPersonAddAlt1 } from "react-icons/md";
import PlayersList from "./PlayersList";
import { playerSchema } from "../../schema/tournament/player";
import { useParams } from "react-router-dom";
import { useState } from "react";

const AddPlayersForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { tournamentId } = useParams();
  const token = useSelector((state) => state.user.token);
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const initialValues = {
    playerName: "",
    isCaptain: false,
  };

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

  const onSubmit = (values, { resetForm }) => {
    const data = { ...values };
    dispatch(addPlayerToTeam(data));
    resetForm();
  };

  const teamData = useSelector((state) => state.tournamentSetup.tempTeam);

  const handleSaveTeam = async () => {
    const data = { tournamentId, ...teamData };
    dispatch(saveTeamToDb({ data, token, setOpenToast, teamData }));
  };

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
      <Formik
        initialValues={initialValues}
        validationSchema={playerSchema}
        onSubmit={onSubmit}>
        {() => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0 20px",
              width: "100%",
            }}>
            <Typography
              level="h3"
              mx="auto"
              my={2}
              color="warning"
              startDecorator={<GroupsIcon />}
              sx={{ opacity: !buttonDisabled && 0.5 }}>
              Add Players to {!teamName && "..."}
              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                  ml: 1,
                  textDecoration: "underline",
                  textDecorationColor: teamColor,
                  textDecorationThickness: 4,
                  maxWidth: 300,
                }}
                noWrap>
                {teamName}
              </Typography>
            </Typography>
            <Stack
              my={8}
              mx="auto"
              direction="row"
              width="100%"
              justifyContent="space-between">
              <Stack
                direction="column"
                spacing={4}
                justifyContent="space-between">
                <CustomInput
                  name="playerName"
                  placeholder="Name"
                  type="text"
                  disabled={!buttonDisabled}
                  label="Player Name"
                />
                <CustomInput
                  name="isCaptain"
                  type="checkbox"
                  disabled={!buttonDisabled}
                  label="Make Captain?"
                />
                <Button
                  color="primary"
                  variant="solid"
                  type="submit"
                  disabled={!buttonDisabled}
                  startDecorator={<MdPersonAddAlt1 fontSize={21} />}>
                  Add Player
                </Button>
              </Stack>
              <PlayersList players={players} />
            </Stack>
            <Box
              sx={{
                my: 2,
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                flexDirection: { xs: "column", sm: "row-reverse" },
              }}>
              <Button
                variant="solid"
                color="success"
                size="lg"
                disabled={!buttonDisabled}
                onClick={() => handleSaveTeam()}
                startDecorator={<HiOutlineSaveAs fontSize={21} />}>
                Save Team
              </Button>
              <Button
                variant="outlined"
                color="danger"
                size="lg"
                disabled={!buttonDisabled}
                startDecorator={<DeleteOutlinedIcon />}
                onClick={() => setOpen(true)}>
                Discard
              </Button>
              <CustomModal
                color={"danger"}
                open={open}
                setOpen={setOpen}
                title={"Are you absolutely sure?"}
                content={
                  "This action cannot be undone. If you continue, the team will be permanently deleted."
                }
                useCase={"deleteTeam"}
                teamName={teamName}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default AddPlayersForm;
