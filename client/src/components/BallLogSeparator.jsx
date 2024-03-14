/* eslint-disable react/prop-types */

import { Stack, useTheme } from "@mui/joy";

import { RxBorderDashed } from "react-icons/rx";

const BallLogSeparator = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      sx={{
        display: "flex",
        alignItems: "center",
        height: 39.2,
      }}>
      <RxBorderDashed
        fontSize={18}
        style={{
          marginRight: 3,
          color: theme.palette.neutral.outlinedActiveBg,
        }}
      />
      <RxBorderDashed
        fontSize={18}
        style={{ color: theme.palette.neutral.outlinedActiveBg }}
      />
    </Stack>
  );
};

export default BallLogSeparator;
