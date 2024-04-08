/* eslint-disable react/prop-types */

import { Sheet, Table, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const BattingPerformance = ({ battingData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Sheet sx={{ width: "94%", overflow: "auto", my: 2 }}>
      <Table
        stickyHeader
        variant="outlined"
        sx={{
          "& thead th:nth-of-type(1)": {
            width: "6%",
          },
          "& thead th:nth-of-type(2)": {
            width: "15%",
          },
          "& thead th:nth-of-type(3)": {
            width: isMobile ? "20%" : "35%",
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
          {battingData.map((row) => (
            <tr key={row.sr_no}>
              <td>{row.sr_no}</td>
              {<td>{row.name}</td>}
              <td>{row.wicket}</td>
              <td>{row.runs}</td>
              <td>{row.balls}</td>
              <td>{row.fours}</td>
              <td>{row.sixes}</td>
              <td>{row.strikeRate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default BattingPerformance;
