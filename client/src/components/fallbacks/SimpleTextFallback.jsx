/* eslint-disable react/prop-types */

import { Typography } from "@mui/joy";

const SimpleTextFallback = ({ height = 61.2, content, level = "body-xs" }) => {
  return (
    <Typography
      height={height}
      level={level}
      sx={{
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        opacity: 0.66,
      }}>
      {content}
    </Typography>
  );
};

export default SimpleTextFallback;
