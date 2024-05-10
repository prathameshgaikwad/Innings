/* eslint-disable react/prop-types */

import ActionsPane from "../ActionsPane";
import { Card } from "@mui/joy";
import OnFieldStats from "../../match/OnFieldStats";
import PlayerStatsOverview from "../../match/PlayerStatsOverview";
import { useSelector } from "react-redux";

const MatchDetails = ({ isLoading }) => {
  const {
    innings,
    current_innings_no,
    batsmen: batsmenData,
    bowler: bowlerData,
  } = useSelector((state) => state.matchManagement) || {};

  const ballLog = innings[current_innings_no - 1]?.data?.ball_log || [];

  return (
    <Card
      variant="plain"
      sx={{
        width: "100%",
        maxHeight: "85vh",
        minHeight: "85vh",
        overflow: "auto",
        justifyContent: "space-between",
      }}>
      <ActionsPane isLoading={isLoading} />
      <OnFieldStats
        isLoading={isLoading}
        batsmenData={batsmenData || {}}
        bowlerData={bowlerData || {}}
        ballLog={ballLog}
        isAdmin={true}
      />
      <PlayerStatsOverview isLoading={isLoading} />
    </Card>
  );
};

export default MatchDetails;
