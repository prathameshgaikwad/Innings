/* eslint-disable react/prop-types */

import { Box, Card, Typography, useTheme } from "@mui/joy";

import { RiCopperCoinLine } from "react-icons/ri";
import TeamCard from "../cards/TeamCard";

const TossNotConducted = ({ isLoading, battingTeam, bowlingTeam }) => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";

  return (
    <>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 250,
          width: "90%",
          my: 8,
        }}>
        <RiCopperCoinLine
          fontSize={92}
          style={{
            color: isDarkTheme
              ? theme.palette.neutral[700]
              : theme.palette.neutral[300],
          }}
        />
        <Typography color="neutral" level={"body-md"} mt={2}>
          Oops! Looks like the match hasn&apos;t begun yet.
        </Typography>
      </Card>
      {!isLoading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 6,
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <TeamCard team={battingTeam} isLoading={isLoading} />
          <Typography level="body-lg">vs</Typography>
          <TeamCard team={bowlingTeam} isLoading={isLoading} />
        </Box>
      )}
    </>
  );
};

export default TossNotConducted;
