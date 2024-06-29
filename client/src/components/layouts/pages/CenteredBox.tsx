import { Box, BoxProps } from "@mui/joy";

import React from "react";

type CenteredBoxProps = {
  children: React.ReactNode;
  customStyles: BoxProps["sx"];
};

const CenteredBox: React.FC<CenteredBoxProps> = ({
  children,
  customStyles,
}) => {
  const defaultStyles: BoxProps["sx"] = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    mx: "auto",
  };
  return <Box sx={{ ...defaultStyles, ...customStyles }}>{children}</Box>;
};

export default CenteredBox;
