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
        height: 250,
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
      <Typography color="neutral" level={"body-md"} mt={2}>
        Oops! Looks like the match hasn&apos;t begun yet.
      </Typography>
    </Card>
  );
};

export default TossNotConducted;
