/* eslint-disable react/prop-types */

import { Card, Typography, useTheme } from "@mui/joy";

import { RiCopperCoinLine } from "react-icons/ri";

const TossNotConducted = () => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 300,
        width: "90%",
        my: 8,
      }}>
      <RiCopperCoinLine
        fontSize={92}
        style={{
          color: isDarkTheme
            ? theme.palette.neutral[700]
            : theme.palette.neutral[300],
        }}
      />
      <Typography color="neutral" level={"body-md"} mt={4}>
        Oops! Looks like the toss hasn&apos;t been conducted yet.
      </Typography>
    </Card>
  );
};

export default TossNotConducted;
