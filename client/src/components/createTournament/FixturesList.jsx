import { Sheet, Table, useTheme } from "@mui/joy";

import NoData from "../NoData";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const FixturesList = () => {
  const theme = useTheme();
  const fixturesData = useSelector((state) => state.tournamentSetup.fixtures);

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
          <thead>
            <tr>
              <th>#</th>
              <th>Team 1</th>
              <th>Team 2</th>
              <th>Overs</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
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
