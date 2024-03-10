import { Box, useTheme } from "@mui/joy";

export const LiveIcon = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: "block",
          position: "relative",
          mr: 1,
          width: 16,
          height: 16,

          "&:before": {
            content: '""',
            position: "relative",
            display: "block",
            width: "250%",
            height: "250%",
            ml: "-75%",
            mt: "-75%",
            borderRadius: "45px",
            backgroundColor: theme.palette.danger.solidBg,
            animation:
              "pulse 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
          },

          "&:after": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            display: "block",
            width: "100%",
            height: "100%",
            backgroundColor: theme.palette.danger.solidBg,
            borderRadius: "50px",
            animation:
              "circle 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite",
          },

          "@keyframes pulse": {
            "0%": {
              transform: "scale(0.33)",
            },
            "80%, 100%": {
              opacity: 0,
            },
          },

          "@keyframes circle": {
            "0%": {
              transform: "scale(0.8)",
            },
            "50%": {
              transform: "scale(1)",
            },
            "100%": {
              transform: "scale(0.8)",
            },
          },
        }}
      />
    </>
  );
};

export const LiveIconDisabled = () => {
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
