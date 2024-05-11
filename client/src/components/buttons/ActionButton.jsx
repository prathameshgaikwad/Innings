/* eslint-disable react/prop-types */

import { Button, Typography, useTheme } from "@mui/joy";

const ActionButton = ({ title, size, handleOnClick, color = "primary" }) => {
  const theme = useTheme();
  return (
    <Button
      color={color}
      variant="solid"
      size={size}
      onClick={() => handleOnClick()}>
      <Typography level="title-sm" noWrap color={theme.palette.common.white}>
        {title}
      </Typography>
    </Button>
  );
};

export default ActionButton;
