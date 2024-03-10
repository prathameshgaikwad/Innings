/* eslint-disable react/prop-types */

import { Sheet, Table, Typography, useTheme } from "@mui/joy";
import { useEffect, useState } from "react";

import NoData from "../NoData";
import { useSelector } from "react-redux";

function createPlayerData(playerName, isCaptain = false) {
  return { playerName, isCaptain };
}

const DataTable = () => {
  const theme = useTheme();

  const teamPlayers = useSelector(
    (state) => state.tournamentSetup.tempTeam.players
  );

  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    const newData = teamPlayers.map((player) =>
      createPlayerData(player.playerName, player.isCaptain)
    );
    setPlayersData(newData);
  }, [teamPlayers]);

  return (
    <Table
      variant="outlined"
      stickyHeader
      stickyFooter
      sx={{
        td: {
          fontSize: theme.fontSize.xs,
          color: theme.palette.text.secondary,
        },
        "& thead th:nth-of-type(1)": { width: "10%" },
        "& thead th:nth-of-type(2)": { width: "60%" },
      }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Player Name</th>
        </tr>
      </thead>
      <tbody>
        {playersData.map((row, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>
              {row.isCaptain && "(C)"} {row.playerName}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={2}>
            <Typography
              level="body-sm"
              fontWeight={500}
              color={theme.palette.common.white}>
              {`Total: ${playersData.length} players`}
            </Typography>
          </th>
        </tr>
      </tfoot>
    </Table>
  );
};

const PlayersList = ({ players }) => {
  return (
    <Sheet sx={{ height: 230, width: 350, overflow: "auto" }}>
      {players === undefined ? <NoData height={230} /> : <DataTable />}
    </Sheet>
  );
};

export default PlayersList;
