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

import CustomInput from "../../formComponents/CustomInput";
import CustomSelect from "../../formComponents/CustomSelect";
import { useSelector } from "react-redux";
import { wicketSchema } from "../../../schema/match/wicket";

function createPlayerOption(player) {
  return {
    value: player._id,
    label: `${player.name}`.trim(),
  };
}

const WicketModal = ({ open, setOpen }) => {
  const { batsmen, bowler } = useSelector((state) => state.matchManagement);

  const { onStrikeBatsman, offStrikeBatsman } = batsmen;

  const initialValues = {
    player_id: "",
    wicket_comment: "",
    bowler_id: bowler._id,
  };

  const playerOptions = [
    createPlayerOption({ _id: "", name: "Select Player" }),
    createPlayerOption(onStrikeBatsman),
    createPlayerOption(offStrikeBatsman),
  ];

  const handleWicket = (values, { resetForm }) => {
    alert(JSON.stringify(values));
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
                <CustomSelect name="player_id" options={playerOptions} />
                <CustomInput
                  name="wicket_comment"
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
