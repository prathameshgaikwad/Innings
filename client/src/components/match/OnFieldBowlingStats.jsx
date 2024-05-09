/* eslint-disable react/prop-types */

import "swiper/css";
import "swiper/css/pagination";
import "../../styles.css";

import { Box, Card, Divider } from "@mui/joy";

import BallLogList from "../lists/BallLog/BallLogList";
import { BiSolidCricketBall } from "react-icons/bi";
import OnFieldBowlingStatsSkeleton from "../skeletons/OnFieldBowlingStatsSkeleton";
import PlayerStatsWithSelector from "../dataDisplay/PlayerStatsWithSelector";
import SelectPlayer from "../matchManagement/SelectPlayer";
import SimpleTextFallback from "../fallbacks/SimpleTextFallback";
import { setBowler } from "../../state/match/matchManagementSlice";
import { useSelector } from "react-redux";

const OnFieldBowlingStats = ({
  ballLog,
  bowlerData,
  isLoading,
  isAdmin = false,
}) => {
  const { bowlingTeam } = useSelector((state) => state.matchManagement);
  const noBowler = !bowlerData.name || bowlerData.name.length === 0;

  return (
    <Card
      variant="outlined"
      size="lg"
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 72.8,
        py: 0,
      }}>
      {isLoading ? (
        <OnFieldBowlingStatsSkeleton />
      ) : (
        <>
          <Box width={"60%"} alignItems={"center"}>
            {noBowler ? (
              isAdmin ? (
                <SelectPlayer
                  playerType={"Bowler"}
                  players={bowlingTeam.players}
                  dispatchTarget={setBowler}
                />
              ) : (
                <SimpleTextFallback content={"Bowler data will appear here."} />
              )
            ) : (
              <PlayerStatsWithSelector
                playerName={bowlerData.name}
                primaryStat={`${bowlerData.runs_conceded || 0} - ${
                  bowlerData.wickets_taken || 0
                }`}
                secondaryStat={`${bowlerData.overs_bowled || 0}.${
                  bowlerData.balls_bowled || 0
                }`}
                startDecorator={BiSolidCricketBall}
              />
            )}
          </Box>
          <Divider orientation="vertical" />
          <BallLogList ballLog={ballLog} />
        </>
      )}
    </Card>
  );
};

export default OnFieldBowlingStats;
