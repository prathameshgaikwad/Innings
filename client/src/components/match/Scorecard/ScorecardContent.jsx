/* eslint-disable react/prop-types */

import BattingSection from "./BattingSection/BattingSection";
import BowlingSection from "./BowlingSection/BowlingSecton";
import { Card } from "@mui/joy";
import DidNotBatSection from "./DidNotBatSection";
import ExtrasSection from "./ExtrasSection";
import FallOfWicketsList from "./FallOfWicketsList";

const ScorecardContent = ({
  team,
  total,
  battingData,
  extras,
  extrasDetails,
  nonBattingData,
  bowlingData,
  fallOfWicketsData,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 4,
        py: 3,
        px: 6,
      }}>
      <BattingSection team={team} total={total} battingData={battingData} />
      <ExtrasSection extras={extras} extrasDetails={extrasDetails} />
      <DidNotBatSection nonBattingData={nonBattingData} />
      <BowlingSection bowlingData={bowlingData} />
      <FallOfWicketsList data={fallOfWicketsData} />
    </Card>
  );
};

export default ScorecardContent;
