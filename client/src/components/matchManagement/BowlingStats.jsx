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

import { BiSolidCricketBall } from "react-icons/bi";
import NoData from "../NoData";
import SelectPlayer from "./SelectPlayer";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

function createOption(name, _id) {
  return { label: name, value: _id };
}

function createBowlingData(name, overs, runs, wickets, economy, dots) {
  return { name, overs, runs, wickets, economy, dots };
}

const BowlingStats = ({ isLoading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const bowlingTeam = useSelector((state) => state.matchManagement.bowlingTeam);
  const players = bowlingTeam && bowlingTeam.players;

  const rawPlayersData =
    players &&
    players.map((player) => createOption(player.playerName, player._id));

  const bowler = useSelector((state) => state.matchManagement.bowler);
  const bowlerSelected = bowler && bowler._id.length !== 0;

  const bowlingData = [
    createBowlingData("Mohammad Siraj", 4, 30, 1, "7.50", 10),
    createBowlingData(bowler.name, 4, 48, 1, "12.00", 7),
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
            startDecorator={<BiSolidCricketBall />}>
            BOWLING
          </Typography>
          {rawPlayersData && !bowlerSelected && (
            <SelectPlayer
              playerType={"Bowler"}
              rawPlayersData={rawPlayersData}
              disabled={isLoading}
            />
          )}
        </Stack>
        {isLoading || bowlingData.length === 0 ? (
          <NoData height={150} isSmall={true} />
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

export default BowlingStats;
