/* eslint-disable react/prop-types */

import { Box, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const SwiperWrapper = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        width: isMobile ? "85vw" : "70vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "AppWorkspace",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: theme.palette.divider,
      }}>
      {children}
    </Box>
  );
};

export default SwiperWrapper;
