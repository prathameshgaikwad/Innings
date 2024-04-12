/* eslint-disable react/prop-types */

import { Sheet, Table, Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const BattingStatsTable = ({ battingData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
          {battingData.map((row) => (
            <tr key={row.sr_no}>
              <td>
                <Typography level="body-xs">{row.sr_no}</Typography>
              </td>
              {
                <td>
                  <Typography level="body-xs">{row.name}</Typography>
                </td>
              }
              <td>
                <Typography level="body-xs">{row.wicket}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{row.runs}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{row.balls}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{row.fours}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{row.sixes}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{row.strike_rate}</Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default BattingStatsTable;
