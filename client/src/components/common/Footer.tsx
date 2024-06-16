import { Box, Divider, Link, Typography, useTheme } from "@mui/joy";

import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          p: 4,
          borderTop: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Link
          href="/"
          sx={{
            gap: 1,
            "&:hover": {
              textDecoration: "none",
            },
          }}>
          <Typography
            level="body-sm"
            sx={{
              display: "inline-flex",
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.text.primary,
              },
            }}
            startDecorator={<CopyrightIcon />}>
            {new Date().getFullYear()} Innings
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body-sm"
            sx={{
              color: theme.palette.text.tertiary,
              "&:hover": {
                color: theme.palette.text.secondary,
              },
            }}>
            The Ultimate Cricket Tournament Platform
          </Typography>
        </Link>
      </Box>
    </>
  );
};

export default Footer;
