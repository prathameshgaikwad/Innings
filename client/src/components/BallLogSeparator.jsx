/* eslint-disable react/prop-types */

import { Stack, useTheme } from "@mui/joy";

import { RxBorderDashed } from "react-icons/rx";

const BallLogSeparator = ({ isSmall }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      sx={{
        display: "flex",
        alignItems: "center",
        height: isSmall ? 34.2 : 44.2,
      }}>
      <RxBorderDashed
        fontSize={isSmall ? 18 : 21}
        style={{
          marginRight: 3,
          color: theme.palette.neutral.outlinedActiveBg,
        }}
      />
      <RxBorderDashed
        fontSize={isSmall ? 18 : 21}
        style={{ color: theme.palette.neutral.outlinedActiveBg }}
      />
    </Stack>
  );
};

export default BallLogSeparator;
