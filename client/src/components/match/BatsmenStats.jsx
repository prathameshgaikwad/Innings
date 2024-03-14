/* eslint-disable react/prop-types */

import { Card, Divider, Typography } from "@mui/joy";

import BatsmenStatsSkeleton from "../skeletons/BatsmenStatsSkeleton";

const BatsmenStats = ({ isSmall, data, isLoading }) => {
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
        height: 56,
        mb: 1,
        py: 0,
      }}>
      {isLoading ? (
        <BatsmenStatsSkeleton isSmall={isSmall} />
      ) : (
        <>
          {(data && data.onStrikeBatsman.name.length === 0) ||
          data.offStrikeBatsman.name.length === 0 ? (
            <Typography
              height={isSmall ? 61.2 : 114.2}
              level={isSmall ? "body-xs" : "body-sm"}
              sx={{
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}>
              Batsmen data will appear here once the game has been played.
            </Typography>
          ) : (
            data && (
              <>
                <Typography level={isSmall ? "body-xs" : "body-sm"}>
                  {data.onStrikeBatsman.name} - {data.onStrikeBatsman.runs} (
                  {data.onStrikeBatsman.ballsPlayed})
                </Typography>
                <Divider orientation="vertical" />
                <Typography level={isSmall ? "body-xs" : "body-sm"}>
                  {data.offStrikeBatsman.name} - {data.offStrikeBatsman.runs} (
                  {data.offStrikeBatsman.ballsPlayed})
                </Typography>
              </>
            )
          )}
        </>
      )}
    </Card>
  );
};

export default BatsmenStats;
