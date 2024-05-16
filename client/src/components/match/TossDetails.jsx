/* eslint-disable react/prop-types */

import { Card, Divider, Skeleton, Typography, useTheme } from "@mui/joy";

import { BiSolidCricketBall } from "react-icons/bi";
import { RiCopperCoinLine } from "react-icons/ri";

const TossDetails = ({ tossWinner, decision, isLoading }) => {
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
          <Typography
            display={"flex"}
            level="body-sm"
            alignItems={"center"}
            textColor={"text.secondary"}
            gap={0.5}>
            <Typography fontWeight={"bold"} textColor={"text.primary"}>
              {tossWinner}
            </Typography>{" "}
            won the toss and chose to{" "}
            <Typography
              fontWeight={"bold"}
              textColor={"text.primary"}
              endDecorator={
                decision === "bat" ? (
                  <img
                    src="/public/assets/logo_light.svg"
                    style={{ height: 20 }}
                  />
                ) : (
                  <BiSolidCricketBall />
                )
              }>
              {decision === "bat" ? "Bat" : "Bowl"}
            </Typography>
          </Typography>
        )}
      </Card>
    </Divider>
  );
};

export default TossDetails;
