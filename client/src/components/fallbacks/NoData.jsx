/* eslint-disable react/prop-types */

import { Card, Typography, useTheme } from "@mui/joy";

import { RiEmotionSadLine } from "react-icons/ri";

const NoData = ({ height, isSmall }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: height || 300,
        width: "100%",
      }}>
      <RiEmotionSadLine
        fontSize={isSmall ? 64 : 92}
        style={{ color: theme.palette.neutral[800] }}
      />
      <Typography color="neutral" level={isSmall ? "body-xs" : "body-md"}>
        No data to display
      </Typography>
    </Card>
  );
};

export default NoData;
