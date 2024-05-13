import { useTheme } from "@mui/joy";

const VersusIcon = () => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";

  return (
    <img
      width={30}
      src={`/public/assets/versus_${isDarkTheme ? "dark" : "light"}.svg`}
    />
  );
};

export default VersusIcon;
