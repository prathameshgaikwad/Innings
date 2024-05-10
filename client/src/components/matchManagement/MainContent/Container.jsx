/* eslint-disable react/prop-types */

import { Card, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const Container = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Card
      size="lg"
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        gap: isMobile ? 4 : 1.5,
        width: "100%",
        borderWidth: 3,
        p: 2,
      }}>
      {children}
    </Card>
  );
};

export default Container;
