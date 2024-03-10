import { Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const NoLiveMatchPlaceholder = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <img
        src="assets/no_live_match_placeholder.svg"
        alt="No Live Match"
        height={400}
        width={isMobile && "100%"}
      />
      <Typography level="body-lg">No Matches are live now!</Typography>
    </>
  );
};

export default NoLiveMatchPlaceholder;
