import { Card, CardContent, Stack, Typography, useTheme } from "@mui/joy";

type ChaseStatsCardProps = {
  isAdmin: boolean;
};

const ChaseStatsCard: React.FC<ChaseStatsCardProps> = ({ isAdmin }) => {
  const theme = useTheme();
  const chasingTeam = "RCB";
  const runsNeeded = "216";
  const ballsRemaining = "120";
  const requiredRunRate = "10.8";
  return (
    <Card
      size="lg"
      variant="soft"
      color="neutral"
      sx={{
        my: isAdmin ? 4 : 0,
        mb: 1,
        p: isAdmin ? 1.5 : 2.5,
        border: "2px solid",
        borderColor: theme.palette.neutral.outlinedBorder,
      }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: isAdmin ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "start",
        }}>
        <Stack direction={"row"}>
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
        </Stack>
        <Stack direction={"row"}>
          <Typography level="body-xs">
            Required Run Rate:{" "}
            <Typography level="body-sm" color="warning">
              {requiredRunRate}
            </Typography>{" "}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ChaseStatsCard;
