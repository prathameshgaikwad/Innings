/* eslint-disable react/prop-types */

import Card from "@mui/joy/Card";
import { Grid } from "@mui/joy";
import TournamentStatisticsCardSkeleton from "../skeletons/TournamentStatisticsCardSkeleton";
import Typography from "@mui/joy/Typography";
import { useState } from "react";

const TournamentStatisticsCard = ({ data }) => {
  const playerTeamName = "Gujarat Titans";
  const teamColor = "yellow";
  const title = data[0];
  const value = data[1];
  const playerName = data[2];

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <TournamentStatisticsCardSkeleton />
      ) : (
        <Card
          variant="soft"
          size="sm"
          sx={{
            width: 310,
            borderRight: "5px solid",
            borderColor: teamColor,
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
              <Typography level="h4">{value}</Typography>
              <Typography level="body-xs">{title}</Typography>
            </Grid>
            <Grid xs={10} sx={{ textAlign: "end" }}>
              <Typography level="title-md">{playerName}</Typography>
              <Typography level="body-xs">{playerTeamName}</Typography>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default TournamentStatisticsCard;
