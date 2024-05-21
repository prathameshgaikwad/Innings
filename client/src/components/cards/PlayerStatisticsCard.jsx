/* eslint-disable react/prop-types */

import { CardContent, Grid } from "@mui/joy";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import DataChip from "../dataDisplay/DataChip";
import PlayerStatisticsCardSkeleton from "../skeletons/PlayerStatisticsCardSkeleton";
import Typography from "@mui/joy/Typography";
import { useState } from "react";

const PlayerStatisticsCard = ({ data, isUser }) => {
  const [isLoading, setIsLoading] = useState(true);

  //pName, teamName,  runs, avg, sr, high,  w, econ, imgURL, teamColor, [matches, debut, 50s, 100s, 4s, 6s,]
  const playerName = data[0];
  const playerTeamName = data[1];
  const runs = data[2];
  const average = data[3];
  const strikeRate = data[4];
  const highScore = data[5];
  const wickets = data[6];
  const economy = data[7];
  const playerImage = data[8];
  const teamColor = data[9];

  let chipData = [];

  if (isUser) {
    const extraInfo = data[10];

    let matches = extraInfo[0];
    let debut = extraInfo[1];
    let fifties = extraInfo[2];
    let centuries = extraInfo[3];
    let fours = extraInfo[4];
    let sixes = extraInfo[5];

    chipData = [
      ["Matches", matches],
      ["Debut", debut],
      ["Runs", runs],
      ["Avg", average],
      ["SR", strikeRate],
      ["High", highScore],
      ["50s", fifties],
      ["100s", centuries],
      ["4s", fours],
      ["6s", sixes],
      ["W", wickets],
      ["Econ", economy],
    ];
  } else {
    chipData = [
      ["Runs", runs],
      ["Avg", average],
      ["SR", strikeRate],
      ["High", highScore],
      ["W", wickets],
      ["Econ", economy],
    ];
  }

  return (
    <>
      {isLoading ? (
        <PlayerStatisticsCardSkeleton isUser={isUser} />
      ) : (
        <Card
          variant="soft"
          sx={{
            textAlign: "center",
            alignItems: "center",
            overflow: "auto",
            width: isUser ? 380 : 220,
          }}>
          <CardOverflow
            variant="soft"
            sx={{
              backgroundColor: teamColor,
            }}>
            <AspectRatio
              ratio="1"
              sx={{
                m: "auto",
                transform: "translateY(50%)",
                borderRadius: "50%",
                width: isUser ? 150 : 100,
                position: "relative",
              }}>
              {playerImage.length === 0 ? (
                <AccountCircleIcon sx={{ color: "whitesmoke" }} />
              ) : (
                <img src={playerImage} loading="lazy" />
              )}
            </AspectRatio>
          </CardOverflow>
          <CardContent sx={{ mt: isUser ? 10 : 7 }}>
            <Typography level={isUser ? "h2" : "h4"}>{playerName}</Typography>
            <Typography level={isUser ? "body-lg" : "body-sm"}>
              {playerTeamName}
            </Typography>
          </CardContent>
          <Grid
            container
            spacing={1}
            columns={isUser ? 12 : 8}
            sx={{ flexGrow: 1, my: 1, mx: 1 }}>
            {chipData.map((item, i) => {
              return <DataChip key={i} data={item} />;
            })}
          </Grid>
        </Card>
      )}
    </>
  );
};

export default PlayerStatisticsCard;
