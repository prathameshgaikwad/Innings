/* eslint-disable react/prop-types */

import {
  Card,
  CardContent,
  Sheet,
  Stack,
  Table,
  Typography,
  useTheme,
} from "@mui/joy";

import { MdSportsCricket } from "react-icons/md";
import NoData from "../NoData";
import SelectPlayer from "./SelectPlayer";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

function createOption(name, _id) {
  return { label: name, value: _id };
}

function createBattingData(
  sr_no,
  name,
  wicket,
  runs,
  balls,
  fours,
  sixes,
  strike_rate
) {
  return { sr_no, name, wicket, runs, balls, fours, sixes, strike_rate };
}

const BattingStats = ({ isLoading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const battingTeam = useSelector((state) => state.matchManagement.battingTeam);
  const players = battingTeam && battingTeam.players;

  const rawPlayersData =
    players &&
    players.map((player) => createOption(player.playerName, player._id));

  const batsmen = useSelector((state) => state.matchManagement.batsmen);

  let batsmenCount = 0;

  if (batsmen.onStrikeBatsman._id && batsmen.onStrikeBatsman._id.length > 0) {
    batsmenCount++;
  }
  if (batsmen.offStrikeBatsman._id && batsmen.offStrikeBatsman._id.length > 0) {
    batsmenCount++;
  }

  const battingData = [
    createBattingData(
      "1",
      batsmen.onStrikeBatsman.name,
      "",
      3,
      6,
      0,
      0,
      "50.00"
    ),
    createBattingData(
      "2",
      batsmen.offStrikeBatsman.name,
      "",
      83,
      45,
      6,
      6,
      "184.44"
    ),
  ];

  return (
    <Card variant="plain" sx={{ width: "100%" }}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Typography
            color="warning"
            level="title-md"
            startDecorator={<MdSportsCricket />}>
            BATTING
          </Typography>
          {rawPlayersData && batsmenCount !== 2 && (
            <SelectPlayer
              playerType={"Batsman"}
              rawPlayersData={rawPlayersData}
              disabled={isLoading}
            />
          )}
        </Stack>
        {isLoading || battingData.length === 0 ? (
          <NoData height={150} isSmall={true} />
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

export default BattingStats;
