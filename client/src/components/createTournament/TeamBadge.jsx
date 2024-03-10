/* eslint-disable react/prop-types */

import { Card, Typography } from "@mui/joy";

const TeamBadge = ({ teamName, teamColor }) => {
  return (
    <Card
      variant="solid"
      sx={{
        backgroundColor: teamColor,
        width: 90,
        height: 90,
        border: "3px solid",
        borderRadius: "50%",
      }}>
      <Typography
        margin="auto"
        level="title-lg"
        width="100%"
        noWrap
        textAlign="center">
        {teamName}
      </Typography>
    </Card>
  );
};
export default TeamBadge;
