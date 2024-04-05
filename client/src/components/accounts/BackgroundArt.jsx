import {
  BACKGROUND_ART_DARK_URL,
  BACKGROUND_ART_LIGHT_URL,
} from "../../utilities/constants";
import { Box, useTheme } from "@mui/joy";

const BackgroundArt = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        height: "100%",
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
        transition:
          "background-image var(--Transition-duration), left var(--Transition-duration) !important",
        transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
        backgroundColor: "background.level1",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${
          isDarkMode ? BACKGROUND_ART_DARK_URL : BACKGROUND_ART_LIGHT_URL
        })`,
      }}
    />
  );
};

export default BackgroundArt;
