import { Box, IconButton, Typography } from "@mui/joy";

import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";

const LogoHeader = () => {
  return (
    <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
      <IconButton variant="soft" color="primary" size="sm">
        <BadgeRoundedIcon />
      </IconButton>
      <Typography level="title-lg">Innings</Typography>|
      <Typography level="body-md" color="neutral">
        Live Cricket Score & More
      </Typography>
    </Box>
  );
};

export default LogoHeader;
