import { Box, useTheme } from "@mui/joy";

import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import UserStatistics from "../../components/UserStatistics";
import { useMediaQuery } from "@mui/material";

const MyStatistics = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          minHeight: "calc(100vh - 73px)",
          maxWidth: isMobile ? "85vw" : "70vw",
          mx: "auto",
          gap: 2,
          mb: 8,
        }}>
        <UserStatistics />
      </Box>
      <Footer />
    </>
  );
};

export default MyStatistics;
