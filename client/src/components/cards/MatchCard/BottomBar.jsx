/* eslint-disable react/prop-types */

import { CardContent, Divider, LinearProgress, Typography } from "@mui/joy";

const BottomBar = ({ overs, venue, progress }) => {
  return (
    <>
      <Divider inset="context" />
      <CardContent orientation="horizontal">
        <Typography level="body-xs" textColor="text.secondary">
          {overs} Overs
        </Typography>
        <Divider orientation="vertical" />
        <Typography
          level="body-xs"
          textColor="text.secondary"
          noWrap
          sx={{ maxWidth: 150 }}>
          {venue}
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body-xs" textColor="text.secondary">
          Match progress:
        </Typography>
        <LinearProgress
          variant="soft"
          determinate
          color="success"
          value={progress}
        />
      </CardContent>
    </>
  );
};

export default BottomBar;
