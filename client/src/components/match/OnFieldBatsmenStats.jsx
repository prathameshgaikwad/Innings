/* eslint-disable react/prop-types */

import { Card, Divider, useTheme } from "@mui/joy";
import {
  setOffStrikeBatsman,
  setOnStrikeBatsman,
} from "../../state/match/matchManagementSlice";

import OnFieldBatsmenStatsSkeleton from "../skeletons/OnFieldBatsmenStatsSkeleton";
import PlayerStatsWithSelector from "../dataDisplay/PlayerStatsWithSelector";
import SelectPlayer from "../matchManagement/SelectPlayer";
import SimpleTextFallback from "../fallbacks/SimpleTextFallback";
import { useSelector } from "react-redux";

const OnFieldBatsmenStats = ({ isSmall, data, isLoading, isAdmin = false }) => {
  const theme = useTheme();
  const { battingTeam } = useSelector((state) => state.matchManagement);
  const { onStrikeBatsman, offStrikeBatsman } = data;

  const noOnStrikeBatsman =
    !onStrikeBatsman.name || onStrikeBatsman.name.length === 0;

  const noOffStrikeBatsman =
    !offStrikeBatsman.name || offStrikeBatsman.name.length === 0;

  const isDarkTheme = theme.palette.mode === "dark";

  return (
    <Card
      variant="outlined"
      size="lg"
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        minHeight: 56,
        py: 0,
      }}>
      {isLoading ? (
        <OnFieldBatsmenStatsSkeleton isSmall={isSmall} />
      ) : (
        <>
          {data && (
            <>
              {noOnStrikeBatsman ? (
                isAdmin ? (
                  <SelectPlayer
                    playerType={"On-Strike Batsman"}
                    players={battingTeam.players}
                    dispatchTarget={setOnStrikeBatsman}
                    disabled={isLoading}
                  />
                ) : (
                  <SimpleTextFallback
                    content={"On-Strike batsman data will appear here."}
                  />
                )
              ) : (
                <PlayerStatsWithSelector
                  isSmall={isSmall}
                  playerName={onStrikeBatsman.name}
                  primaryStat={onStrikeBatsman.runs}
                  secondaryStat={onStrikeBatsman.ballsPlayed}
                  img_src={`/assets/batsman_icon_${
                    isDarkTheme ? "light" : "dark"
                  }.svg`}
                />
              )}
              <Divider orientation="vertical" sx={{ marginRight: 2 }} />
              <>
                {noOffStrikeBatsman ? (
                  isAdmin ? (
                    <SelectPlayer
                      playerType={"Off-Strike Batsman"}
                      players={battingTeam.players}
                      dispatchTarget={setOffStrikeBatsman}
                      disabled={isLoading}
                    />
                  ) : (
                    <SimpleTextFallback
                      content={"Off-Strike batsman data will appear here."}
                    />
                  )
                ) : (
                  <PlayerStatsWithSelector
                    isSmall={isSmall}
                    playerName={offStrikeBatsman.name}
                    primaryStat={offStrikeBatsman.runs}
                    secondaryStat={offStrikeBatsman.ballsPlayed}
                  />
                )}
              </>
            </>
          )}
        </>
      )}
    </Card>
  );
};

export default OnFieldBatsmenStats;
