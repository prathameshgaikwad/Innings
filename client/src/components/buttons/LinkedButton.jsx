/* eslint-disable react/prop-types */

import { Button, Link, Typography, useTheme } from "@mui/joy";

const LinkedButton = ({
  title,
  link,
  size,
  variant = "solid",
  color = "primary",
  startDecorator: StartDecorator,
  endDecorator: EndDecorator,
  customStyles,
}) => {
  const theme = useTheme();
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      sx={{ ...customStyles }}>
      <Link
        href={link}
        overlay
        sx={{
          color: theme.palette.common.white,
          "&:hover": { textDecoration: "none" },
        }}>
        <Typography
          level={`title-${size === "sm" ? "sm" : "md"}`}
          noWrap
          color={theme.palette.common.white}
          startDecorator={StartDecorator && <StartDecorator />}
          endDecorator={EndDecorator && <EndDecorator />}>
          {title}
        </Typography>
      </Link>
    </Button>
  );
};

export default LinkedButton;
