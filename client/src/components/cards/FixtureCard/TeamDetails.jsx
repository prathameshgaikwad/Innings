/* eslint-disable react/prop-types */

import { AspectRatio, Box, Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const TeamDetails = ({ color, logoURL, nameShort }) => {
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
          width: isMobile ? 45 : 65,
          borderRadius: "50%",
          outline: "3px solid",
          outlineColor: color,
        }}>
        <img src={logoURL} loading="lazy" />
      </AspectRatio>
      <Typography
        level={isMobile ? "title-sm" : "title-md"}
        sx={{ mt: isMobile ? 0.75 : 1 }}>
        {nameShort}
      </Typography>
    </Box>
  );
};

export default TeamDetails;
