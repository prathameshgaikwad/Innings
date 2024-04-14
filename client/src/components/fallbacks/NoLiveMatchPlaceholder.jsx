import { Typography, useTheme } from "@mui/joy";

const NoLiveMatchPlaceholder = () => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
  return (
    <>
      <img
        src={`assets/no_live_match_placeholder_${
          isDarkTheme ? "dark" : "light"
        }.svg`}
        alt="No Live Match"
        height={400}
      />
      <Typography level="body-lg">No Matches are live right now!</Typography>
    </>
  );
};

export default NoLiveMatchPlaceholder;
