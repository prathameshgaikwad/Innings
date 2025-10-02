import * as motion from "motion/react-client";

import { Box, BoxProps, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

type PageContainerProps = {
  children: React.ReactNode;
  customStyles?: BoxProps["sx"];
};

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  customStyles,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const defaultStyles: BoxProps["sx"] = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 73px)",
    pt: isMobile ? 4 : 6,
    maxWidth: isMobile ? "85vw" : "70vw",
    mx: "auto",
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}>
        {" "}
        <Box sx={{ ...defaultStyles, ...customStyles }}>{children}</Box>
      </motion.div>
    </>
  );
};

export default PageContainer;
