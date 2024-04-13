/* eslint-disable react/prop-types */

import { Card, Divider, Grid, Typography, useTheme } from "@mui/joy";

import BatsmenStatsSkeleton from "../skeletons/BatsmenStatsSkeleton";
import SimpleTextFallback from "../fallbacks/SimpleTextFallback";

const BatsmenStats = ({ isSmall, data, isLoading }) => {
  const { onStrikeBatsman, offStrikeBatsman } = data;
  const isEmpty =
    !data.onStrikeBatsman.name ||
    onStrikeBatsman.name.length === 0 ||
    offStrikeBatsman.name.length === 0;

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
        <BatsmenStatsSkeleton isSmall={isSmall} />
      ) : (
        <>
          {isEmpty ? (
            <SimpleTextFallback
              height={isSmall ? 61.2 : 114.2}
              level={isSmall ? "body-xs" : "body-sm"}
              content={
                "Batsmen data will appear here once the game has been played."
              }
            />
          ) : (
            data && (
              <Grid
                container
                columns={16}
                sx={{
                  width: "100%",
                  alignItems: "center",
                }}>
                <Grid
                  xs={9}
                  sx={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
                  <img
                    width={21}
                    src={`/assets/batsman_icon_${
                      isDarkTheme ? "light" : "dark"
                    }.svg`}
                  />
                  <Typography level={isSmall ? "title-sm" : "title-md"}>
                    {onStrikeBatsman.name} - {onStrikeBatsman.runs || 0} (
                    {onStrikeBatsman.ballsPlayed || 0})
                  </Typography>
                </Grid>
                <Divider orientation="vertical" sx={{ marginRight: 2 }} />
                <Grid xs={6}>
                  <Typography level={isSmall ? "body-xs" : "body-sm"}>
                    {offStrikeBatsman.name} - {offStrikeBatsman.runs || 0} (
                    {offStrikeBatsman.ballsPlayed || 0})
                  </Typography>
                </Grid>
              </Grid>
            )
          )}
        </>
      )}
    </Card>
  );
};

export default BatsmenStats;
