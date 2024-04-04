/* eslint-disable react/prop-types */

import { AspectRatio, Box, Typography, useTheme } from "@mui/joy";

import { MdSportsCricket } from "react-icons/md";
import { useMediaQuery } from "@mui/material";

const BattingTeam = ({ color, logoURL, nameShort }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <AspectRatio
        ratio="1"
        sx={{
          width: isMobile ? 66 : 90,
          borderRadius: "50%",
          outline: "4px solid",
          outlineColor: color,
        }}>
        <img src={logoURL} loading="lazy" alt="" />
      </AspectRatio>
      <Typography
        level={isMobile ? "title-md" : "title-lg"}
        sx={{ mt: isMobile ? 1 : 2 }}
        startDecorator={
          <MdSportsCricket color={theme.palette.primary[400]} fontSize={21} />
        }>
        {nameShort}
      </Typography>
    </Box>
  );
};

export default BattingTeam;
