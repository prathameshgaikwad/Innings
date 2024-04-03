/* eslint-disable react/prop-types */

import { Box, Divider, Sheet, Table, Typography, useTheme } from "@mui/joy";

import EventNoteIcon from "@mui/icons-material/EventNote";
import NoData from "../NoData";
import RectangularSkeleton from "../skeletons/RectangularSkeleton";
import formatLongDate from "../../services/helpers/formatLongDate";
import formatTime from "../../services/helpers/formatTime";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

function createData(fixture) {
  const date = new Date(
    1970,
    0,
    1,
    parseInt(fixture.time.split(":")[0]),
    parseInt(fixture.time.split(":")[1])
  );

  return {
    match_no: fixture.match_no,
    team1: fixture.team1Details.name,
    team1Short: fixture.team1Details.nameShort,
    vs: "vs",
    team2: fixture.team2Details.name,
    team2Short: fixture.team2Details.nameShort,
    time: formatTime(date),
    date: formatLongDate(fixture.date),
  };
}

const DataTable = ({ rows }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
      <thead>
        <tr>
          <th>#</th>
          <th>{isMobile ? "T1" : "TEAM 1"}</th>
          <th></th>
          <th>{isMobile ? "T2" : "TEAM 2"}</th>
          <th>DATE</th>
          <th>TIME</th>
        </tr>
      </thead>
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

const ScheduleOfMatches = ({ isLoading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const fixtures = useSelector((state) => state.tournamentPage.fixtures);

  const scheduleRows = fixtures.map((fixture) => createData(fixture));

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}>
      <Box sx={{ width: "100%", mb: isMobile ? 3 : 6 }}>
        <Divider>
          <Typography
            level={isMobile ? "h4" : "h3"}
            sx={{ mx: 2 }}
            color="warning"
            startDecorator={<EventNoteIcon />}>
            Schedule
          </Typography>
        </Divider>
      </Box>
      {isLoading ? (
        <RectangularSkeleton width="80%" height="200px" />
      ) : (
        <Sheet
          sx={{
            width: isMobile ? "90%" : "80%",
            overflow: "auto",
            maxHeight: 442,
            mx: "auto",
          }}>
          {scheduleRows.length === 0 ? (
            <NoData />
          ) : (
            <DataTable rows={scheduleRows} />
          )}
        </Sheet>
      )}
    </Box>
  );
};

export default ScheduleOfMatches;
