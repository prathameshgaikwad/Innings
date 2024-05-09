/* eslint-disable react/prop-types */

import { IconButton, Stack, Typography } from "@mui/joy";

import { HiSelector } from "react-icons/hi";

const PlayerStatsWithSelector = ({
  isSmall = true,
  img_src,
  startDecorator: StartDecorator,
  playerName,
  primaryStat,
  secondaryStat,
}) => {
  const handlePlayerChange = () => {
    alert("Requesting player change");
  };

  return (
    <Stack
      direction={"row"}
      width={"100%"}
      alignItems={"center"}
      spacing={0.5}
      justifyContent={"space-between"}>
      <Stack
        direction={"row"}
        spacing={1}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {img_src && <img width={18} src={img_src} />}
          <Typography
            level={isSmall ? "title-sm" : "title-md"}
            textColor={"text.secondary"}
            startDecorator={
              StartDecorator && (
                <StartDecorator fontSize={18} style={{ marginRight: 4 }} />
              )
            }>
            {playerName}
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
          <Typography
            level={isSmall ? "body-sm" : "body-md"}
            textColor={"text.tertiary"}>
            {primaryStat || 0}
          </Typography>
          <Typography
            level={isSmall ? "body-sm" : "body-md"}
            textColor={"text.tertiary"}>
            ({secondaryStat || 0})
          </Typography>
        </Stack>
      </Stack>
      <IconButton
        variant="plain"
        color="secondary"
        size="sm"
        onClick={() => handlePlayerChange()}>
        <HiSelector />
      </IconButton>
    </Stack>
  );
};

export default PlayerStatsWithSelector;
