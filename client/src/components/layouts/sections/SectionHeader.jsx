/* eslint-disable react/prop-types */

import { Box, Divider, Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const SectionHeader = ({
  title,
  color = "primary",
  level = "h3",
  startDecorator: StartDecorator,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%", mb: isMobile ? 3 : 6 }}>
      <Divider
        sx={{
          "--Divider-lineColor": theme.palette.primary[500],
          "--Divider-thickness": "2px",
        }}>
        <Typography
          level={isMobile ? "h4" : level}
          sx={{ mx: 2 }}
          color={color}
          startDecorator={StartDecorator && <StartDecorator />}>
          {title}
        </Typography>
      </Divider>
    </Box>
  );
};

export default SectionHeader;
