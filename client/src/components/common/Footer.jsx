import { Box, Typography, useTheme } from "@mui/joy";

import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          p: 4,
          borderTop: "1px solid",
          borderColor: "divider",
        }}>
        <Typography
          level="body-sm"
          sx={{ display: "inline-flex", color: theme.palette.text.secondary }}
          startDecorator={<CopyrightIcon />}>
          {new Date().getFullYear()} Innings
        </Typography>
        |
        <Typography level="body-sm" sx={{ color: theme.palette.text.tertiary }}>
          The Ultimate Cricket Tournament Platform
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
