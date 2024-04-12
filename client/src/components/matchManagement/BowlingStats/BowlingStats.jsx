/* eslint-disable react/prop-types */

import { Card, CardContent } from "@mui/joy";

import BowlingStatsHeader from "./BowlingStatsHeader";
import BowlingStatsTable from "./BowlingStatsTable";
import NoData from "../../NoData";
import { createPlayerOption } from "../../../utilities/helpers/createPlayerOption";
import { useSelector } from "react-redux";

function createBowlingData(name, overs, runs, wickets, economy, dots) {
  return { name, overs, runs, wickets, economy, dots };
}

const BowlingStats = ({ isLoading }) => {
  const bowlingTeam = useSelector((state) => state.matchManagement.bowlingTeam);
  const players = bowlingTeam && bowlingTeam.players;

  const rawPlayersData =
    players &&
    players.map((player) => createPlayerOption(player.playerName, player._id));

  const bowler = useSelector((state) => state.matchManagement.bowler);
  const isBowlerSelected = bowler._id && bowler._id.length !== 0;

  const bowlingData = [
    createBowlingData("Mohammad Siraj", 4, 30, 1, "7.50", 10),
    createBowlingData(bowler.name, 4, 48, 1, "12.00", 7),
  ];

  return (
    <Card variant="plain" sx={{ width: "100%" }}>
      <CardContent>
        <BowlingStatsHeader
          isLoading={isLoading}
          isBowlerSelected={isBowlerSelected}
          rawPlayersData={rawPlayersData}
        />
        {isLoading || bowlingData.length === 0 ? (
          <NoData height={150} isSmall={true} />
        ) : (
          <BowlingStatsTable bowlingData={bowlingData} />
        )}
      </CardContent>
    </Card>
  );
};

export default BowlingStats;
