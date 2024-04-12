/* eslint-disable react/prop-types */

import { Sheet, Table, useTheme } from "@mui/joy";

import TableRow from "../../TableRow";
import { useMediaQuery } from "@mui/material";

const BattingStatsTable = ({ battingData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dataKeys = [
    "sr_no",
    "name",
    "wicket",
    "runs",
    "balls",
    "fours",
    "sixes",
    "strike_rate",
  ];

  return (
    <Sheet sx={{ overflow: "auto", my: 2, minWidth: 660 }}>
      <Table
        stickyHeader
        variant="outlined"
        sx={{
          "& thead th:nth-of-type(1)": {
            width: "4%",
          },
          "& thead th:nth-of-type(2)": {
            width: "20%",
          },
          "& thead th:nth-of-type(3)": {
            width: isMobile ? "20%" : "30%",
          },
          fontSize: isMobile ? "0.85rem" : "",
        }}>
        <thead>
          <tr>
            <th>#</th>
            <th>NAME</th>
            <th>WICKET</th>
            <th>RUNS</th>
            <th>BALLS</th>
            <th>4s</th>
            <th>6s</th>
            <th>SR</th>
          </tr>
        </thead>
        <tbody>
          {battingData.map((row, index) => (
            <TableRow key={index} data={row} dataKeys={dataKeys} />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default BattingStatsTable;
