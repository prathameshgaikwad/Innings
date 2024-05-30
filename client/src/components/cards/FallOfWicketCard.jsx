/* eslint-disable react/prop-types */

import { Card, CardOverflow, Divider, Typography } from "@mui/joy";

import { useSelector } from "react-redux";

export const FallOfWicketCard = ({ data, isAdmin = false }) => {
  const { battingTeam } = useSelector((state) =>
    isAdmin ? state.matchManagement : state.match
  );
  const { players: battingTeamPlayers } = battingTeam;

  const batsman = battingTeamPlayers.find(
    (player) => player._id === data.on_strike_batsman_id
  );

  return (
    <Card
      size="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: 150,
        mx: 1,
        p: 1,
      }}>
      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 35,
          fontWeight: "bold",
        }}>
        <Typography level="body-sm">{`${data.total_runs} - ${data.wicket_number}`}</Typography>
      </CardOverflow>
      <Divider />
      <Typography level="body-xs" sx={{ mt: 1, color: "text.secondary" }}>
        {`${batsman.first_name} ${batsman.last_name}`}
      </Typography>
      <Typography level="body-xs" sx={{ color: "text.tertiary" }}>
        {`Overs ${data.over}.${data.ball}`}
      </Typography>
    </Card>
  );
};

export default FallOfWicketCard;
