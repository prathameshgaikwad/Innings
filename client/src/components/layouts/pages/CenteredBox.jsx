/* eslint-disable react/prop-types */

import { Box } from "@mui/joy";

const CenteredBox = ({ children, customStyles }) => {
  const defaultStyles = {
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
