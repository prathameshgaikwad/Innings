import { ListItem, Theme, Typography, useTheme } from "@mui/joy";

import { useMediaQuery } from "@mui/material";

type CustomListItemProps = {
  isSamePage: boolean;
  title: string;
  link: string;
  startDecorator?: React.ComponentType;
};

const CustomListItem: React.FC<CustomListItemProps> = ({
  isSamePage,
  title,
  link,
  startDecorator: StartDecorator,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
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
