/* eslint-disable react/prop-types */

import { Sheet, Table, useTheme } from "@mui/joy";

import TableRow from "../../TableRow";
import { useMediaQuery } from "@mui/material";

const BowlingStatsTable = ({ bowlingData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dataKeys = ["name", "overs", "runs", "wickets", "economy", "dots"];

  return (
    <Sheet sx={{ width: "100%", overflow: "auto", my: 2 }}>
      <Table
        stickyHeader
        variant="outlined"
        sx={{
          "& thead th:nth-of-type(1)": {
            width: "36%",
          },
          fontSize: isMobile ? "0.85rem" : "",
        }}>
        <thead>
          <tr>
            <th>NAME</th>
            <th>OVERS</th>
            <th>RUNS</th>
            <th>WICKETS</th>
            <th>ECON</th>
            <th>DOTS</th>
          </tr>
        </thead>
        <tbody>
          {bowlingData.map((row, index) => (
            <TableRow key={index} data={row} dataKeys={dataKeys} />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default BowlingStatsTable;
