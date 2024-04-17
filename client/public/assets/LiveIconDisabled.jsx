import { Box, useTheme } from "@mui/joy";

const LiveIconDisabled = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "block",
        position: "relative",
        mr: 1,
        width: 16,
        height: 16,
        borderRadius: "45px",
        backgroundColor: theme.palette.danger.solidDisabledColor,
      }}
    />
  );
};

export default LiveIconDisabled;
