import { Box, Divider, Link, Typography, useTheme } from "@mui/joy";

import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Box>
        <Link
          href="/"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            p: 4,
            borderTop: "1px solid",
            borderColor: "divider",
            "&:hover": {
              textDecoration: "none",
            },
          }}>
          <Typography
            level="body-sm"
            sx={{ display: "inline-flex", color: theme.palette.text.secondary }}
            startDecorator={<CopyrightIcon />}>
            {new Date().getFullYear()} Innings
          </Typography>
          <Divider
            orientation="vertical"
            sx={{
              "--Divider-thickness": "1px",
              color: theme.palette.text.tertiary,
            }}
          />
          <Typography
            level="body-sm"
            sx={{ color: theme.palette.text.tertiary }}>
            The Ultimate Cricket Tournament Platform
          </Typography>
        </Link>
      </Box>
    </>
  );
};

export default Footer;
