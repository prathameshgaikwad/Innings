/* eslint-disable react/prop-types */

import { Card, Typography, useTheme } from "@mui/joy";

const LogItem = ({ item, type, isSmall }) => {
  const theme = useTheme();

  const isSuccess = type === "success";
  const isDanger = type === "danger";
  const isWarning = type === "warning";

  return (
    <Card
      size="sm"
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
          (isDanger && theme.palette.danger.softActiveBg) ||
          (isSuccess && theme.palette.success.softActiveBg) ||
          (isWarning && theme.palette.warning.softActiveBg) ||
          theme.palette.neutral.outlinedBorder,
        backgroundColor:
          (isDanger && theme.palette.danger.outlinedBorder) ||
          (isSuccess && theme.palette.success.outlinedBorder) ||
          (isWarning && theme.palette.warning.outlinedBorder),
        p: isSmall ? 1.3 : 1,
      }}>
      <Typography level={"body-xs"}>{item}</Typography>
    </Card>
  );
};

export default LogItem;
