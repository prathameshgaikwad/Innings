/* eslint-disable react/prop-types */

import { Box, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const PageContainer = ({ children, customStyles }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const defaultStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 73px)",
    pt: isMobile ? 4 : 6,
    maxWidth: isMobile ? "85vw" : "70vw",
    mx: "auto",
  };
  return <Box sx={{ ...defaultStyles, ...customStyles }}>{children}</Box>;
};

export default PageContainer;
