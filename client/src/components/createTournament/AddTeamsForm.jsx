import { Button, Card, Stack, Typography } from "@mui/joy";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import ColorPicker from "../formComponents/ColorPicker";
import CustomColorInput from "../formComponents/CustomColorInput";
import CustomInput from "../formComponents/CustomInput";
import GroupsIcon from "@mui/icons-material/Groups";
import { createTeam } from "../../state/tournament/tournamentSetupSlice";
import randomColor from "randomcolor";
import { teamSchema } from "../../schema/tournament/team";
import { useState } from "react";

const AddTeamsForm = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState(randomColor());

  const buttonDisabled = useSelector(
    (state) => state.tournamentSetup.tempTeam.isProcessing
  );

  const initialValues = {
    teamName: "",
    teamColor: "",
    isProcessing: false,
    players: [
      {
        playerName: "",
        isCaptain: false,
      },
    ],
  };

  const onSubmit = (values, { resetForm }) => {
    dispatch(createTeam(values));
    resetForm(setColor(randomColor()));
  };

  return (
    <Card
      variant="outlined"
      color={buttonDisabled ? "neutral" : "primary"}
      size="lg"
      sx={{
        height: "100%",
        alignItems: "center",
        borderWidth: buttonDisabled ? 1 : 3,
      }}>
      <Formik
        initialValues={initialValues}
        validationSchema={teamSchema}
        onSubmit={onSubmit}>
        {({ setFieldValue }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0 0px",
              height: "100%",
            }}>
            <Typography
              level="h3"
              mx="auto"
              mt={2}
              color="primary"
              startDecorator={<GroupsIcon />}
              sx={{ opacity: buttonDisabled && 0.5 }}>
              Add Team
            </Typography>
            <Stack direction="column" gap={4} my="auto">
              <CustomInput
                name="teamName"
                label="Team Name"
                disabled={buttonDisabled}
                placeholder="My Team"
                type="text"
              />
              <Stack direction="row" alignItems="end" gap={4}>
                <CustomColorInput
                  name="teamColor"
                  label="Team Color"
                  placeholder="Use the color picker"
                  type="text"
                  readOnly={true}
                  disabled={buttonDisabled}
                  setFieldValue={setFieldValue}
                  color={color}
                />
                <ColorPicker
                  color={color}
                  onChange={setColor}
                  disabled={buttonDisabled}
                />
              </Stack>
            </Stack>
            <Button
              size="lg"
              color="success"
              type="submit"
              disabled={buttonDisabled}
              endDecorator={<GroupsIcon />}
              sx={{ mt: "auto", mb: 2 }}>
              Create Team
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default AddTeamsForm;
