/* eslint-disable react/prop-types */

import { Button, useTheme } from "@mui/joy";

import { GrUndo } from "react-icons/gr";
import { useSelector } from "react-redux";

const UndoButton = () => {
  const theme = useTheme();
  const { innings, current_innings_no } = useSelector(
    (state) => state.matchManagement
  );
  const ballLog = innings[current_innings_no - 1]?.data?.ball_log || [];
  return (
    <Button
      variant="solid"
      disabled={ballLog.length === 0}
      sx={{
        height: 50,
        flexGrow: 1,
        bgcolor: theme.palette.secondary.solidBg,
        "&:hover": {
          bgcolor: theme.palette.secondary.solidHoverBg,
        },
      }}>
      <GrUndo size={26} />
    </Button>
  );
};

export default UndoButton;
