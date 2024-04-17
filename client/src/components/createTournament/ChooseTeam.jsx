/* eslint-disable react/prop-types */

import { Stack, useTheme } from "@mui/joy";

import CustomSelect from "../formComponents/CustomSelect";
import TeamBadgeCircular from "../dataDisplay/TeamBadgeCircular";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";

function createOption(name, _id, team_color) {
  return {
    label: name,
    value: _id,
    color: team_color,
  };
}

const ChooseTeam = ({ id, name }) => {
  const formik = useFormikContext();
  const theme = useTheme();
  const rawTeamsData =
    useSelector((state) => state.tournamentSetup.teams) || [];

  let allTeamsList = rawTeamsData.map((team) =>
    createOption(team.name, team._id, team.team_color)
  );

  const defaultOption = createOption("Select one", "default", "#90a4ae");
  allTeamsList = allTeamsList.sort((a, b) => (a.label > b.label ? 1 : -1));
  allTeamsList = [defaultOption, ...allTeamsList];

  const selectedTeamId = id === 1 ? formik.values.team1 : formik.values.team2;
  const selectedTeam = selectedTeamId
    ? rawTeamsData.find((team) => team._id === selectedTeamId)?.name_short
    : "";

  const teamColor = selectedTeamId
    ? rawTeamsData.find((team) => team._id === selectedTeamId)?.team_color
    : theme.palette.neutral;

  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <TeamBadgeCircular teamName={selectedTeam} teamColor={teamColor} />
      <CustomSelect name={name} options={allTeamsList} />
    </Stack>
  );
};

export default ChooseTeam;
