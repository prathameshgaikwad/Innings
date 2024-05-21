/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import IconButton from "@mui/joy/IconButton";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useColorScheme } from "@mui/joy/styles";

export default function ColorSchemeToggle(props) {
  const [mounted, setMounted] = useState(false);
  const { mode, setMode } = useColorScheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  const { onClick, ...other } = props;

  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
  }

  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="primary"
      sx={{ width: 40, height: 40 }}
      aria-label="toggle light/dark mode"
      {...other}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}>
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}
