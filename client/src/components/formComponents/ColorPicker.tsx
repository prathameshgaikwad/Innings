import { Box, Button, Card, IconButton } from "@mui/joy";

import { ClickAwayListener } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { FaShuffle } from "react-icons/fa6";
import { HexColorPicker } from "react-colorful";
import randomColor from "randomcolor";
import { useState } from "react";

type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
  disabled?: boolean;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  disabled,
}) => {
  const [open, setOpen] = useState(false);

  const generateRandomColor = () => {
    const generatedColor = randomColor();
    onChange(generatedColor);
  };

  return (
    <>
      <IconButton disabled={disabled} sx={{ opacity: disabled ? 0.5 : 1 }}>
        <Box
          sx={{
            backgroundColor: color,
            cursor: "pointer",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid white",
            display: "flex",
          }}
          onClick={() => setOpen(!open)}>
          {open && (
            <CloseRoundedIcon
              sx={{
                color: "white",
                m: "auto",
              }}
            />
          )}
        </Box>
      </IconButton>
      {open && (
        <ClickAwayListener
          onClickAway={() => {
            setOpen(false);
          }}>
          <Card sx={{ position: "absolute", left: 380, zIndex: 10 }}>
            <HexColorPicker color={color} onChange={onChange} />
            <Button
              variant="solid"
              startDecorator={<FaShuffle />}
              onClick={generateRandomColor}>
              Randomize
            </Button>
          </Card>
        </ClickAwayListener>
      )}
    </>
  );
};

export default ColorPicker;
