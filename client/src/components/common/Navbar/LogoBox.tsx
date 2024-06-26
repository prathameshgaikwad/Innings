import { Box, IconButton, Link, Typography, useTheme } from "@mui/joy";

import CenteredBox from "../../layouts/pages/CenteredBox";

const LogoBox = () => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";

  const logoURL = `/assets/logo_${isDarkTheme ? "light" : "dark"}.svg`;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "left",
        justifyContent: "space-between",
        minWidth: 200,
      }}>
      <Link
        sx={{
          "&:hover": {
            textDecoration: "none",
          },
        }}
        href="/">
        <CenteredBox customStyles={{ gap: 2, flexDirection: "row" }}>
          <IconButton size="lg">
            <img src={logoURL} />
          </IconButton>
          <Typography
            level="title-lg"
            component="h1"
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.text.primary,
              },
            }}>
            Innings
          </Typography>
        </CenteredBox>
      </Link>
    </Box>
  );
};

export default LogoBox;
