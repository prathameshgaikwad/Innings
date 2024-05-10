/* eslint-disable react/prop-types */

import { Avatar, Card, Sheet, Table, useTheme } from "@mui/joy";

import TableHeader from "../layouts/tables/TableHeader";
import TeamPerformance from "../lists/TeamPerformance";
import { format } from "date-fns";
import { useMediaQuery } from "@mui/material";

const TeamPlayersSheet = ({ players, performance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const tableHeaders = [
    "#",
    "",
    "NAME",
    "DEBUT",
    "M",
    "RUNS",
    "S/R",
    "AVG",
    "HIGH",
    "4s",
    "6s",
  ];

  return (
    <Sheet sx={{ overflow: "auto", my: isMobile ? 2 : 4 }}>
      {performance && performance.length > 0 && (
        <Card variant="soft" size="lg" sx={{ mb: 3 }}>
          <TeamPerformance performance={performance} size={10} />
        </Card>
      )}
      <Table
        stickyHeader
        variant="outlined"
        sx={{
          "& thead th:nth-of-type(1)": {
            width: "4%",
          },
          "& thead th:nth-of-type(2)": {
            width: "7%",
          },
          "& thead th:nth-of-type(3)": {
            width: "22%",
          },
          fontSize: isMobile ? "0.85rem" : "",
        }}>
        <TableHeader headers={tableHeaders} />
        <tbody>
          {players.map((player, i) => (
            <tr key={player._id}>
              {<td>{i + 1}</td>}
              {
                <td>
                  <Avatar
                    src={player.picture_url}
                    color="neutral"
                    sx={{ border: "2px solid" }}
                  />
                </td>
              }
              {<td>{`${player.first_name} ${player.last_name}`}</td>}
              {<td>{format(player.debut, "yyyy")}</td>}
              {<td>{player.statistics.matches}</td>}
              {<td>{player.statistics.total_runs}</td>}
              {<td>{player.statistics.strike_rate.$numberDecimal}</td>}
              {<td>{player.statistics.average.$numberDecimal}</td>}
              {<td>{player.statistics.highest_score.runs}</td>}
              {<td>{player.statistics.fours}</td>}
              {<td>{player.statistics.sixes}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default TeamPlayersSheet;
