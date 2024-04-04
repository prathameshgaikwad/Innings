/* eslint-disable react/prop-types */

import { CardContent, Divider, Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const TopBar = ({ matchNo }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <CardContent>
        <Typography level={isMobile ? "title-sm" : "title-md"}>
          Match {matchNo}
        </Typography>
      </CardContent>
      <Divider inset="context" />
    </>
  );
};

export default TopBar;
