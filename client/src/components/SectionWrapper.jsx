/* eslint-disable react/prop-types */

import { Box } from "@mui/joy";

const SectionWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}>
      {children}
    </Box>
  );
};

export default SectionWrapper;
