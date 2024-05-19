/* eslint-disable react/prop-types */

import { Tooltip, Typography } from "@mui/joy";

const InfoItem = ({ tooltipTitle, content, startDecorator }) => {
  return (
    <Tooltip title={tooltipTitle} variant="outlined">
      <Typography
        level="body-xs"
        fontWeight="md"
        textColor="text.tertiary"
        startDecorator={startDecorator}>
        {content}
      </Typography>
    </Tooltip>
  );
};

export default InfoItem;
