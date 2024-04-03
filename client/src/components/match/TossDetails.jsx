/* eslint-disable react/prop-types */

import { Card, Divider, Skeleton, Typography, useTheme } from "@mui/joy";

import { RiCopperCoinLine } from "react-icons/ri";

const TossDetails = ({ tossWinner, choice, isLoading }) => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
  return (
    <Divider
      sx={{
        "--Divider-lineColor": isLoading
          ? theme.palette.neutral[500]
          : isDarkTheme
          ? theme.palette.primary[800]
          : theme.palette.primary[100],
        "--Divider-thickness": "3px",
        mt: 6,
      }}>
      <Card
        size="sm"
        variant="soft"
        color={isLoading ? "neutral" : "primary"}
        sx={{ display: "flex", flexDirection: "row" }}>
        <RiCopperCoinLine size={24} />
        {isLoading ? (
          <Skeleton
            animation="wave"
            variant="text"
            level="body-md"
            width={250}
          />
        ) : (
          <Typography level="body-sm">
            {tossWinner} won the toss and chose to {choice}
          </Typography>
        )}
      </Card>
    </Divider>
  );
};

export default TossDetails;
