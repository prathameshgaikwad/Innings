/* eslint-disable react/prop-types */

import { Card, CardOverflow, Divider, Typography } from "@mui/joy";

export const FallOfWicketCard = ({ data }) => {
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
        {`${data.on_strike_batsman.first_name} ${data.on_strike_batsman.last_name}`}
      </Typography>
      <Typography level="body-xs" sx={{ color: "text.tertiary" }}>
        {`Overs ${data.over}.${data.ball}`}
      </Typography>
    </Card>
  );
};

export default FallOfWicketCard;
