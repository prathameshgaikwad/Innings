/* eslint-disable react/prop-types */

import { ListItem, Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

const CustomListItem = ({
  isSamePage,
  title,
  link,
  startDecorator: StartDecorator,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <ListItem
      component="a"
      href={link}
      sx={{
        textDecoration: "none",
        py: isMobile ? 1.5 : 3,
        borderBottom: isSamePage
          ? `3px solid ${theme.palette.primary[400]}`
          : "3px solid transparent",
        transition: "border 0.2s ease-in-out",
        "&:hover": {
          borderBottom: `3px solid ${theme.palette.primary[400]}`,
        },
      }}>
      <Typography
        level="title-md"
        color={isSamePage ? "primary" : "neutral"}
        startDecorator={StartDecorator && <StartDecorator />}>
        {title}
      </Typography>
    </ListItem>
  );
};

export default CustomListItem;
