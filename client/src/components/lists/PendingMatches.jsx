/* eslint-disable react/prop-types */

import { Card, Stack, Typography, useTheme } from "@mui/joy";

import { LuHourglass } from "react-icons/lu";
import SimpleMatchCard from "../cards/SimpleMatchCard";

const PendingMatches = ({ pendingMatchesList }) => {
  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ borderWidth: 2, borderStyle: "solid" }}>
      <Typography
        level="h3"
        sx={{ mx: "auto", mt: 2 }}
        endDecorator={<LuHourglass color={theme.palette.warning[400]} />}>
        Pending Matches
      </Typography>
      <Stack
        sx={{
          p: 1,
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxHeight: 500,
          overflowY: "auto",
        }}>
        {pendingMatchesList.map((fixture) => {
          return (
            <SimpleMatchCard
              key={fixture.match_id}
              matchData={fixture}
              isTournamentManagementPage={true}
            />
          );
        })}
      </Stack>
    </Card>
  );
};

export default PendingMatches;
