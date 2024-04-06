/* eslint-disable react/prop-types */

import { Button, ButtonGroup, useTheme } from "@mui/joy";

import CustomModal from "../modals/CustomModal";
import { IoPersonCircleSharp } from "react-icons/io5";
import { TbArrowsExchange } from "react-icons/tb";
import { TbSwitch3 } from "react-icons/tb";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";

const ActionsPane = ({ isLoading }) => {
  const [openSwitchModal, setOpenSwitchModal] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const innings = useSelector((state) => state.matchManagement.innings);
  const isSecondInnings = innings === "2";

  const handleStrikeChange = () => {
    alert("Changing Strikes");
  };

  return (
    <ButtonGroup
      spacing={isMobile ? 1 : 2}
      sx={{ width: "100%", minHeight: 50 }}>
      <Button
        variant="solid"
        color="primary"
        size={isMobile ? "sm" : "lg"}
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
        Change Strike
      </Button>
      <Button
        variant="solid"
        color="danger"
        size={isMobile ? "sm" : "lg"}
        fullWidth
        disabled={isLoading || isSecondInnings}
        onClick={() => setOpenSwitchModal(true)}
        endDecorator={<TbSwitch3 size={isMobile ? 18 : 21} />}>
        Switch Sides
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
