/* eslint-disable react/prop-types */

import { AspectRatio, Box, Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const TeamBadgeVertical = ({
  color,
  logoURL,
  nameShort,
  widths = [45, 65],
}) => {
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
          width: isMobile ? widths[0] : widths[1],
          borderRadius: "50%",
          outline: "4px solid",
          outlineColor: color,
        }}>
        <img src={logoURL} loading="lazy" alt="" />
      </AspectRatio>
      <Typography
        level={isMobile ? "title-md" : "title-lg"}
        sx={{ mt: isMobile ? 1 : 2 }}>
        {nameShort}
      </Typography>
    </Box>
  );
};

export default TeamBadgeVertical;
