/* eslint-disable react/prop-types */

import { Card } from "@mui/joy";
import ChaseStatsCard from "../ChaseStatsCard";
import ScoreInfo from "../ScoreInfo";
import ScoringButtonsPanel from "../ScoringButtonsPanel";

const ScorePane = ({ isLoading, socket }) => {
  const secondInnings = "2";

  return (
    <Card
      variant="plain"
      sx={{
        justifyContent: "space-between",
        minHeight: "85vh",
      }}>
      <ScoreInfo isLoading={isLoading} />
      {secondInnings && <ChaseStatsCard isAdmin={true} />}
      <ScoringButtonsPanel socket={socket} disabled={isLoading} />
    </Card>
  );
};

export default ScorePane;
