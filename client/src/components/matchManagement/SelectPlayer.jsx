/* eslint-disable react/prop-types */

import { Button, Stack } from "@mui/joy";
import { Form, Formik } from "formik";
import {
  setBowler,
  setOffStrikeBatsman,
  setOnStrikeBatsman,
} from "../../state/match/matchManagementSlice";
import { useDispatch, useSelector } from "react-redux";

import CustomSelect from "../formComponents/CustomSelect";
import { choosePlayer } from "../../schema/match/choosePlayer";

const SelectPlayer = ({ playerType, rawPlayersData, disabled }) => {
  const dispatch = useDispatch();
  const batsmen = useSelector((state) => state.matchManagement.batsmen);

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
    const name = sortedPlayersData.find((player) => {
      if (player.value === values.player._id) return player;
    });
    values.player.name = name.label;

    if (batsmen.onStrikeBatsman._id.length === 0) {
      dispatch(setOnStrikeBatsman(values.player));
    } else if (batsmen.offStrikeBatsman._id.length === 0) {
      dispatch(setOffStrikeBatsman(values.player));
    } else {
      dispatch(setBowler(values.player));
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={choosePlayer}
      onSubmit={onSubmit}>
      {() => (
        <Form>
          <Stack spacing={2} justifyContent="flex-start" direction="row" my={2}>
            <CustomSelect name="player._id" options={sortedPlayersData} />
            <Button type="submit" disabled={disabled}>
              Choose {playerType}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default SelectPlayer;
