/* eslint-disable react/prop-types */

import { Card, Divider } from "@mui/joy";

import BattingSection from "./BattingSection/BattingSection";
import BowlingSection from "./BowlingSection/BowlingSection";
import DidNotBatSection from "./DidNotBatSection";
import ExtrasSection from "./ExtrasSection";
import FallOfWicketsList from "./FallOfWicketsList";

const ScorecardContent = ({
  matchId,
  team,
  total,
  battingData,
  extras,
  bowlingData,
  fallOfWicketsData,
}) => {
  return (
    <Card
      variant="outlined"
      size="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        mt: 4,
        px: 6,
        borderWidth: 3,
      }}>
      <BattingSection team={team} total={total} battingData={battingData} />
      <Card
        variant="outlined"
        size="sm"
        sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
        <ExtrasSection extras={extras} />
        <Divider />
        <DidNotBatSection matchId={matchId} />
      </Card>
      <BowlingSection bowlingData={bowlingData} />
      <FallOfWicketsList data={fallOfWicketsData} />
    </Card>
  );
};

export default ScorecardContent;
