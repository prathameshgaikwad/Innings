import { Box, Typography } from "@mui/joy";

const PageLoader: React.FC = () => {
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}>
      <Typography level="h4" color="neutral">
        Loading...
      </Typography>
    </Box>
  );
};

export default PageLoader;
