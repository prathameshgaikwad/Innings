import { Card, CardContent, Typography } from "@mui/joy";

const ChaseStatsCard = () => {
  const chasingTeam = "RCB";
  const runsNeeded = "216";
  const ballsRemaining = "120";
  const requiredRunRate = "10.8";
  return (
    <Card variant="soft" sx={{ my: 4, p: 1.5 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",
        }}>
        <Typography level="body-xs">
          {chasingTeam} needs{" "}
          <Typography level="body-sm" color="warning">
            {runsNeeded} runs
          </Typography>{" "}
          from{" "}
          <Typography level="body-sm" color="warning">
            {ballsRemaining} balls
          </Typography>{" "}
          to win.
        </Typography>
        <Typography level="body-xs">
          Required Run Rate:{" "}
          <Typography level="body-sm" color="warning">
            {requiredRunRate}
          </Typography>{" "}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ChaseStatsCard;
