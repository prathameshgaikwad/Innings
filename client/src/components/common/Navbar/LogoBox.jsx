import { Box, IconButton, Link, Typography, useTheme } from "@mui/joy";

const LogoBox = () => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";

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
        <Box
          sx={{
            gap: 2,
            display: "flex",
            alignItems: "center",
          }}>
          <IconButton size="lg">
            <img src={`/assets/logo_${isDarkTheme ? "light" : "dark"}.svg`} />
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
        </Box>
      </Link>
    </Box>
  );
};

export default LogoBox;
