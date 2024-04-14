/* eslint-disable react/prop-types */

import { Sheet, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const TableWrapper = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Sheet
      sx={{
        width: isMobile ? "90%" : "80%",
        overflow: "auto",
        borderRadius: 8,
        maxHeight: 442,
      }}>
      {children}
    </Sheet>
  );
};

export default TableWrapper;
