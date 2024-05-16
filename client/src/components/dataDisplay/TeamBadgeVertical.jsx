/* eslint-disable react/prop-types */

import { AspectRatio, Box, Tooltip, Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const TeamBadgeVertical = ({
  isSmall = false,
  color,
  logoURL,
  nameShort,
  name,
  widths = [45, 65],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Tooltip title={name} color="neutral" variant="outlined" size="sm" arrow>
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
            outline: `${isSmall ? 3 : 4}px solid`,
            outlineColor: color,
          }}>
          <img src={logoURL} loading="lazy" alt={`${name} logo`} />
        </AspectRatio>
        <Typography
          level={isSmall ? "title-md" : "h4"}
          sx={{ mt: isSmall ? 1 : 2 }}>
          {nameShort}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default TeamBadgeVertical;
