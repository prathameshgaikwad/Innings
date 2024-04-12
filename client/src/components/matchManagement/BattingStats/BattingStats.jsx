/* eslint-disable react/prop-types */

import { Card, CardContent } from "@mui/joy";

import BattingStatsHeader from "./BattingStatsHeader";
import BattingStatsTable from "./BattingStatsTable";
import NoData from "../../NoData";
import { createPlayerOption } from "../../../utilities/helpers/createPlayerOption";
import { useSelector } from "react-redux";

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
  const battingTeam = useSelector((state) => state.matchManagement.battingTeam);
  const players = battingTeam && battingTeam.players;

  const rawPlayersData =
    players &&
    players.map((player) => createPlayerOption(player.playerName, player._id));

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
        <BattingStatsHeader
          isLoading={isLoading}
          rawPlayersData={rawPlayersData}
          batsmenCount={batsmenCount}
        />
        {isLoading || battingData.length === 0 ? (
          <NoData height={150} isSmall={true} />
        ) : (
          <BattingStatsTable battingData={battingData} />
        )}
      </CardContent>
    </Card>
  );
};

export default BattingStats;
