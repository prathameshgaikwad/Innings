import { Box, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

type SwiperWrapperProps = {
  children: React.ReactNode;
};

const SwiperWrapper: React.FC<SwiperWrapperProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        width: isMobile ? "85vw" : "70vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "AppWorkspace",
      }}>
      {children}
    </Box>
  );
};

export default SwiperWrapper;
