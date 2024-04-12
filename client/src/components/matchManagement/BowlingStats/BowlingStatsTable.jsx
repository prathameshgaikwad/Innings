/* eslint-disable react/prop-types */

import { Sheet, Table, Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const BowlingStatsTable = ({ bowlingData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
          {bowlingData.map((row) => (
            <tr key={row.name}>
              <td>
                {" "}
                <Typography level="body-xs">{row.name}</Typography>
              </td>
              <td>
                {" "}
                <Typography level="body-xs">{row.overs}</Typography>
              </td>
              <td>
                {" "}
                <Typography level="body-xs">{row.runs}</Typography>
              </td>
              <td>
                {" "}
                <Typography level="body-xs">{row.wickets}</Typography>
              </td>
              <td>
                {" "}
                <Typography level="body-xs">{row.economy}</Typography>
              </td>
              <td>
                {" "}
                <Typography level="body-xs">{row.dots}</Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default BowlingStatsTable;
