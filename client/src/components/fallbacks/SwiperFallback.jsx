/* eslint-disable react/prop-types */

import { Box, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const SwiperFallback = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minWidth: isMobile ? "85vw" : "70vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "AppWorkspace",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: theme.palette.divider,
        p: 4,
        gap: 2,
      }}>
      {children}
    </Box>
  );
};

export default SwiperFallback;
