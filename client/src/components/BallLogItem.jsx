/* eslint-disable react/prop-types */

import { Card, Typography, useTheme } from "@mui/joy";

const BallLogItem = ({ item }) => {
  const theme = useTheme();

  const isWicket = item === "W";
  const isExtra = ["WD", "B", "LB", "NB"].includes(item);
  const isBoundary = [4, 6].includes(item);

  return (
    <Card
      size="xs"
      variant="soft"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: "2px solid",
        borderColor:
          (isWicket && theme.palette.danger.softActiveBg) ||
          (isBoundary && theme.palette.success.softActiveBg) ||
          (isExtra && theme.palette.warning.softActiveBg) ||
          theme.palette.neutral.outlinedBorder,
        backgroundColor:
          (isWicket && theme.palette.danger.outlinedBorder) ||
          (isBoundary && theme.palette.success.outlinedBorder) ||
          (isExtra && theme.palette.warning.outlinedBorder),
        p: 1,
      }}>
      <Typography level={"body-xs"}>{item}</Typography>
    </Card>
  );
};

export default BallLogItem;
