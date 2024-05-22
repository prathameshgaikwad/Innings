/* eslint-disable react/prop-types */

import { Button, Stack } from "@mui/joy";
import { Form, Formik } from "formik";

import CustomSelect from "../formComponents/CustomSelect";
import { choosePlayer } from "../../schema/match/choosePlayer";
import { createPlayerOption } from "../../utilities/helpers/createPlayerOption";
import { useDispatch } from "react-redux";

const SelectPlayer = ({
  playerType,
  players,
  disabled = false,
  dispatchTarget,
}) => {
  const dispatch = useDispatch();

  const rawPlayersData =
    players &&
    players.map((player) =>
      createPlayerOption({
        first_name: player.first_name,
        last_name: player.last_name,
        _id: player._id,
      })
    );

  const sortedPlayersData = rawPlayersData
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label));

  sortedPlayersData.unshift({ label: "Select", value: "0" });

  const initialValues = {
    player: {
      _id: "",
      name: "",
    },
  };

  const onSubmit = (values, { resetForm }) => {
    const selectedPlayerOption = sortedPlayersData.find((player) => {
      if (player.value === values.player._id) return player;
    });
    values.player.name = selectedPlayerOption.label;

    dispatch(dispatchTarget(values.player));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={choosePlayer}
      onSubmit={onSubmit}>
      {() => (
        <Form>
          <Stack
            gap={2}
            justifyContent="flex-start"
            alignItems={"center"}
            direction="row"
            my={2}>
            <CustomSelect name="player._id" options={sortedPlayersData} />
            <Button
              type="submit"
              size="sm"
              sx={{ fontSize: "xs", textWrap: "nowrap" }}
              disabled={disabled}>
              Choose {playerType}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default SelectPlayer;
