/* eslint-disable react/prop-types */

import { Sheet, Table, useTheme } from "@mui/joy";

import TableHeader from "../../layouts/tables/TableHeader";
import TableRow from "../../layouts/tables/TableRow";
import { useMediaQuery } from "@mui/material";

const BowlingStatsTable = ({ bowlingData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dataKeys = [
    "sr_no",
    "name",
    "overs",
    "runs",
    "wickets",
    "economy",
    "dots",
    "maidens",
  ];
  const tableHeaders = ["#", "NAME", "OVERS", "RUNS", "W", "ECON", "DOTS", "M"];

  return (
    <Sheet sx={{ width: "100%", overflow: "auto", my: 2 }}>
      <Table
        stickyHeader
        variant="outlined"
        sx={{
          "& thead th:nth-of-type(1)": {
            width: "4%",
          },
          "& thead th:nth-of-type(2)": {
            width: "36%",
          },
          fontSize: isMobile ? "0.85rem" : "",
        }}>
        <TableHeader headers={tableHeaders} />
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
