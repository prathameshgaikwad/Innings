import { Sheet, Table, useTheme } from "@mui/joy";

import NoData from "../fallbacks/NoData";
import TableHeader from "../tableComponents/TableHeader";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const FixturesList = () => {
  const theme = useTheme();
  const fixturesData = useSelector((state) => state.tournamentSetup.fixtures);

  const tableHeaders = ["#", "Team 1", "Team 2", "Overs", "Date", "Time"];

  return (
    <Sheet sx={{ height: 200, width: "100%", overflow: "auto" }}>
      {fixturesData.length === 0 ? (
        <NoData height={200} />
      ) : (
        <Table
          variant="outlined"
          stickyHeader
          sx={{
            td: {
              fontSize: theme.fontSize.xs,
              color: theme.palette.text.secondary,
            },
            "& thead th:nth-of-type(1)": { width: "10%" },
            "& thead th:nth-of-type(2)": {},
          }}>
          <TableHeader headers={tableHeaders} />
          <tbody>
            {fixturesData.map((row, i) => (
              <tr key={i}>
                <td>{row.match_no}</td>
                <td>{row.team1Short}</td>
                <td>{row.team2Short}</td>
                <td>{row.overs}</td>
                <td>{format(row.date, "eee, d MMMM yyy")}</td>
                <td>
                  {format(
                    new Date(
                      1970,
                      0,
                      1,
                      parseInt(row.time.split(":")[0]),
                      parseInt(row.time.split(":")[1])
                    ),
                    "h:mm a"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Sheet>
  );
};

export default FixturesList;
