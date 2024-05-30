/* eslint-disable react/prop-types */

import {
  Box,
  Button,
  Divider,
  Modal,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import { Form, Formik } from "formik";
import {
  getCompletedBallsInOver,
  getOversFromBallsCompleted,
} from "../../../utilities/helpers/matchMetrics";
import { useDispatch, useSelector } from "react-redux";

import CustomInput from "../../formComponents/CustomInput";
import CustomSelect from "../../formComponents/CustomSelect";
import { updateInningsFallOfWicketLog } from "../../../state/match/matchManagementSlice";
import { wicketSchema } from "../../../schema/match/wicket";

function createPlayerOption(player) {
  return {
    value: player._id,
    label: `${player.name}`.trim(),
  };
}

const WicketModal = ({ open, setOpen, socket }) => {
  const dispatch = useDispatch();
  const { batsmen, bowler, innings, current_innings_no, _id } = useSelector(
    (state) => state.matchManagement
  );
  const { onStrikeBatsman, offStrikeBatsman } = batsmen;
  const currentInningsData = innings[current_innings_no - 1]?.data;
  const { total_runs, total_wickets, balls_completed } =
    currentInningsData || {};

  const initialValues = {
    match_id: _id,
    on_strike_batsman_id: "",
    dismissal_comment: "",
    bowler_id: bowler._id,
    over: getOversFromBallsCompleted(balls_completed),
    ball: getCompletedBallsInOver(balls_completed),
    total_runs,
    wicket_number: total_wickets + 1,
  };

  const playerOptions = [
    createPlayerOption({ _id: "", name: "Select Player" }),
    createPlayerOption(onStrikeBatsman),
    createPlayerOption(offStrikeBatsman),
  ];

  const handleWicket = (values, { resetForm }) => {
    // UPDATE UI OPTIMISTICALLY
    dispatch(updateInningsFallOfWicketLog(values));

    // EMIT SOCKET EVENT TO ADD WICKET
    socket.emit("addWicket", values);
    resetForm();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        color="danger"
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
        <Formik
          initialValues={initialValues}
          validationSchema={wicketSchema}
          onSubmit={handleWicket}>
          {({ isSubmitting, isValid, touched }) => (
            <Form>
              <Stack direction={"column"} spacing={2} mb={6}>
                <CustomSelect
                  name="on_strike_batsman_id"
                  options={playerOptions}
                />
                <CustomInput
                  name="dismissal_comment"
                  placeholder="c R.Jadeja b R.Ashwin"
                  sx={{ fontSize: "sm", my: 2 }}
                />
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: { xs: "column", sm: "row-reverse" },
                  justifyContent: "space-between",
                }}>
                <Button
                  variant="solid"
                  color="danger"
                  type="submit"
                  sx={{ flexGrow: 1 }}
                  disabled={
                    !isValid ||
                    isSubmitting ||
                    (Object.keys(touched).length === 0 &&
                      touched.constructor === Object)
                  }>
                  Confirm Wicket
                </Button>
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </ModalDialog>
    </Modal>
  );
};

export default WicketModal;
