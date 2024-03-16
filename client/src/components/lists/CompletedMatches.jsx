/* eslint-disable react/prop-types */

import { Card, Stack, Typography, useTheme } from "@mui/joy";

import { FiCheckCircle } from "react-icons/fi";
import SimpleMatchCard from "../cards/SimpleMatchCard";

const CompletedMatches = ({ completedMatchesList }) => {
  const theme = useTheme();
  return (
    <Card
      variant="outlined"
      sx={{
        borderWidth: 2,
        borderStyle: "dashed",
      }}>
      <Typography
        level="h3"
        sx={{ mx: "auto", mt: 2 }}
        endDecorator={<FiCheckCircle color={theme.palette.success[400]} />}>
        Matches Completed
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
        {completedMatchesList.map((fixture) => {
          return (
            <SimpleMatchCard
              key={fixture.matchNumber}
              matchData={fixture}
              isTournamentManagementPage={true}
            />
          );
        })}
      </Stack>
    </Card>
  );
};

export default CompletedMatches;
