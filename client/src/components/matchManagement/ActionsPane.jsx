/* eslint-disable react/prop-types */

import { Button, ButtonGroup, Typography, useTheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import CustomModal from "../notifications/modals/CustomModal";
import { IoPersonCircleSharp } from "react-icons/io5";
import { TbArrowsExchange } from "react-icons/tb";
import { TbSwitch3 } from "react-icons/tb";
import { setStrikeChange } from "../../state/match/matchManagementSlice";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

const ActionsPane = ({ isLoading }) => {
  const [openSwitchModal, setOpenSwitchModal] = useState(false);

  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const innings = useSelector((state) => state.matchManagement.innings);
  const isSecondInnings = innings === "2";

  const handleStrikeChange = () => {
    dispatch(setStrikeChange());
  };

  return (
    <ButtonGroup
      spacing={isMobile ? 1 : 2}
      sx={{ width: "100%", minHeight: 50 }}>
      <Button
        variant="solid"
        color="primary"
        size={isMobile ? "sm" : "lg"}
        sx={{
          bgcolor: theme.palette.secondary.solidBg,
          "&:hover": {
            bgcolor: theme.palette.secondary.solidHoverBg,
          },
        }}
        fullWidth
        disabled={isLoading}
        onClick={() => handleStrikeChange()}
        endDecorator={
          <>
            <IoPersonCircleSharp size={isMobile ? 18 : 21} />
            <TbArrowsExchange
              size={isMobile ? 18 : 21}
              style={{ margin: "0 6px" }}
            />
            <IoPersonCircleSharp size={isMobile ? 18 : 21} />
          </>
        }>
        <Typography noWrap textColor={"common.white"}>
          Change Strike
        </Typography>
      </Button>
      <Button
        variant="solid"
        sx={{
          bgcolor: theme.palette.secondary.solidBg,
          "&:hover": {
            bgcolor: theme.palette.secondary.solidHoverBg,
          },
        }}
        size={isMobile ? "sm" : "lg"}
        fullWidth
        disabled={isLoading || isSecondInnings}
        onClick={() => setOpenSwitchModal(true)}
        endDecorator={<TbSwitch3 size={isMobile ? 18 : 21} color="white" />}>
        <Typography noWrap textColor={"common.white"}>
          Switch Sides
        </Typography>
      </Button>
      <CustomModal
        open={openSwitchModal}
        setOpen={setOpenSwitchModal}
        title={"Switch Sides"}
        content={
          "Are you sure you want to switch sides and start scoring for the second innings?"
        }
        useCase={"switchSides"}
      />
    </ButtonGroup>
  );
};

export default ActionsPane;
