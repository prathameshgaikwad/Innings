/* eslint-disable react/prop-types */

import { Table, useTheme } from "@mui/joy";

import TableHeader from "../../TableHeader";
import { useMediaQuery } from "@mui/material";

const ScheduleOfMatchesSheet = ({ rows }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const mobileHeader = ["#", "T1", "", "T2", "DATE", "TIME"];
  const regularHeader = ["#", "TEAM 1", "", "TEAM 2", "DATE", "TIME"];

  const tableHeader = isMobile ? mobileHeader : regularHeader;

  return (
    <Table
      stickyHeader
      variant="outlined"
      sx={{
        textAlign: "start",
        td: {
          color: theme.palette.text.secondary,
        },
        "& thead th:nth-of-type(1)": {
          width: isMobile ? "7.2%" : "5%",
        },
        "& thead th:nth-of-type(3)": {
          width: "6%",
        },
        "& thead th:nth-of-type(2)": {
          width: isMobile ? "12%" : "25%",
        },
        "& thead th:nth-of-type(4)": {
          width: isMobile ? "12%" : "25%",
        },
        fontSize: isMobile ? "0.85rem" : "",
      }}>
      <TableHeader headers={tableHeader} />
      <tbody>
        {rows.map((row) => (
          <tr key={row.match_no}>
            <td style={{ color: theme.palette.text.primary }}>
              {row.match_no}
            </td>
            {isMobile ? <td>{row.team1Short}</td> : <td>{row.team1}</td>}
            <td>vs</td>
            {isMobile ? <td>{row.team2Short}</td> : <td>{row.team2}</td>}
            <td>{row.date}</td>
            <td>{row.time}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ScheduleOfMatchesSheet;
