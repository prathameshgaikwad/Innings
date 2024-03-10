/* eslint-disable react/prop-types */

import { Button, ButtonGroup, useTheme } from "@mui/joy";

import CustomModal from "../modals/CustomModal";
import { FiCheckCircle } from "react-icons/fi";
import { TbSwitch3 } from "react-icons/tb";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";

const ActionsPane = ({ isLoading }) => {
  const [openSwitchModal, setOpenSwitchModal] = useState(false);
  const [openCompleteScoringModal, setOpenCompleteScoringModal] =
    useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const innings = useSelector((state) => state.matchManagement.innings);
  const isSecondInnings = innings === "2";

  return (
    <ButtonGroup
      spacing={isMobile ? 1 : 2}
      sx={{ width: "100%", minHeight: 50 }}>
      <Button
        variant="solid"
        color="primary"
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
      <Button
        variant="solid"
        color="success"
        size={isMobile ? "sm" : "lg"}
        fullWidth
        disabled={isLoading}
        onClick={() => setOpenCompleteScoringModal(true)}
        endDecorator={<FiCheckCircle size={isMobile ? 18 : 21} />}>
        Complete Scoring
      </Button>
      <CustomModal
        open={openCompleteScoringModal}
        setOpen={setOpenCompleteScoringModal}
        title={"Confirm Completion"}
        content={
          "Are you sure you have input all data and want to complete scoring for this match?"
        }
        useCase={"completeScoring"}
      />
    </ButtonGroup>
  );
};

export default ActionsPane;
