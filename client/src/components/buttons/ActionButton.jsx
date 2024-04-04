/* eslint-disable react/prop-types */

import { Button, Typography, useTheme } from "@mui/joy";

const ActionButton = ({ title, size, handleOnClick }) => {
  const theme = useTheme();
  return (
    <Button color="primary" size={size} onClick={() => handleOnClick()}>
      <Typography level="title-sm" noWrap color={theme.palette.common.white}>
        {title}
      </Typography>
    </Button>
  );
};

export default ActionButton;
