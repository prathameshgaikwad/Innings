/* eslint-disable react/prop-types */

import { Sheet, Table, useTheme } from "@mui/joy";

import TableHeader from "../../layouts/tables/TableHeader";
import TableRow from "../../layouts/tables/TableRow";
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

  const tableHeaders = [
    "#",
    "NAME",
    "WICKET",
    "RUNS",
    "BALLS",
    "4s",
    "6s",
    "SR",
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
            width: isMobile ? "20%" : "27%",
          },
          fontSize: isMobile ? "0.85rem" : "",
        }}>
        <TableHeader headers={tableHeaders} />
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
