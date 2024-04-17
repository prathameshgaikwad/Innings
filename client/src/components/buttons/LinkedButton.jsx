/* eslint-disable react/prop-types */

import { Button, Link, Typography, useTheme } from "@mui/joy";

const LinkedButton = ({ title, link, size, width, my, color = "primary" }) => {
  const theme = useTheme();
  return (
    <Button
      variant="solid"
      color={color}
      size={size}
      sx={{ width: width, my: my }}>
      <Link
        href={link}
        overlay
        sx={{
          color: theme.palette.common.white,
          "&:hover": { textDecoration: "none" },
        }}>
        <Typography level="title-sm" noWrap color={theme.palette.common.white}>
          {title}
        </Typography>
      </Link>
    </Button>
  );
};

export default LinkedButton;
