import { Card, Grid, Skeleton, useTheme } from "@mui/joy";

const TournamentStatisticsCardSkeleton: React.FC = () => {
  const theme = useTheme();
  return (
    <Card
      variant="soft"
      size="sm"
      sx={{
        width: 310,
        borderRight: "5px solid",
        borderColor: theme.palette.neutral[600],
        boxShadow: " rgba(0, 0, 0, 0.3) 0px 2px 4px -2px",
      }}>
      <Grid
        container
        columnSpacing={2}
        columns={16}
        sx={{
          flexGrow: 1,
          m: "auto",
          width: "100%",
          alignItems: "center",
        }}>
        <Grid xs={6} sx={{ textAlign: "start" }}>
          <Skeleton variant="text" level="h4" animation="wave" />
          <Skeleton variant="text" level="body-xs" animation="wave" />
        </Grid>
        <Grid xs={10}>
          <Skeleton variant="text" level="h4" animation="wave" />
          <Skeleton variant="text" level="body-xs" animation="wave" />
        </Grid>
      </Grid>
    </Card>
  );
};

export default TournamentStatisticsCardSkeleton;
