/* eslint-disable react/prop-types */

import { Card, Divider, Grid, Typography, useTheme } from "@mui/joy";
import {
  setOffStrikeBatsman,
  setOnStrikeBatsman,
} from "../../state/match/matchManagementSlice";

import OnFieldBatsmenStatsSkeleton from "../skeletons/OnFieldBatsmenStatsSkeleton";
import SelectPlayer from "../matchManagement/SelectPlayer";
import SimpleTextFallback from "../fallbacks/SimpleTextFallback";
import { useSelector } from "react-redux";

const OnFieldBatsmenStats = ({ isSmall, data, isLoading, isAdmin = false }) => {
  const { onStrikeBatsman, offStrikeBatsman } = data;
  const { battingTeam } = useSelector((state) => state.matchManagement);

  const noOnStrikeBatsman =
    !onStrikeBatsman.name || onStrikeBatsman.name.length === 0;

  const noOffStrikeBatsman =
    !offStrikeBatsman.name || offStrikeBatsman.name.length === 0;

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
  return (
    <Card
      variant="outlined"
      size="lg"
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        minHeight: 56,
        py: 0,
      }}>
      {isLoading ? (
        <OnFieldBatsmenStatsSkeleton isSmall={isSmall} />
      ) : (
        <>
          {data && (
            <Grid
              container
              sx={{
                width: "100%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Grid
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 2,
                  mr: 2,
                }}>
                <img
                  width={21}
                  src={`/assets/batsman_icon_${
                    isDarkTheme ? "light" : "dark"
                  }.svg`}
                />
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
                  <Typography level={isSmall ? "title-sm" : "title-md"}>
                    {onStrikeBatsman.name} - {onStrikeBatsman.runs || 0} (
                    {onStrikeBatsman.ballsPlayed || 0})
                  </Typography>
                )}
              </Grid>
              <Divider orientation="vertical" sx={{ marginRight: 2 }} />
              <Grid>
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
                  <Typography level={isSmall ? "body-xs" : "body-sm"}>
                    {offStrikeBatsman.name} - {offStrikeBatsman.runs || 0} (
                    {offStrikeBatsman.ballsPlayed || 0})
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Card>
  );
};

export default OnFieldBatsmenStats;
