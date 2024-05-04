/* eslint-disable react/prop-types */

import { Sheet, Table, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const BowlingPerformance = ({ bowlingData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Sheet sx={{ width: "94%", overflow: "auto" }}>
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
          {bowlingData.map((row) => (
            <tr key={row.name}>
              {<td>{row.name}</td>}
              <td>{row.overs}</td>
              <td>{row.runs}</td>
              <td>{row.wickets}</td>
              <td>{row.economy}</td>
              <td>{row.dots}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default BowlingPerformance;
