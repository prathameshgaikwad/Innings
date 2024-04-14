/* eslint-disable react/prop-types */

import { Alert, Box, LinearProgress, Typography, useTheme } from "@mui/joy";

import { IoIosWarning } from "react-icons/io";
import { IoMdDoneAll } from "react-icons/io";
import { IoMdInformationCircle } from "react-icons/io";
import { useMediaQuery } from "@mui/material";
import useToastAnimation from "../../hooks/useToastAnimation";

const CustomToast = ({ content, color, duration }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { isVisible, progressValue } = useToastAnimation(duration);

  const isSuccess = color === "success";
  const isWarning = color === "warning";
  const isNeutral = color === "neutral";

  return (
    <>
      {isVisible && (
        <Box
          style={{
            position: "fixed",
            zIndex: 1000,
            bottom: isMobile ? 15 : 30,
            right: isMobile ? 15 : 30,
          }}>
          <Alert
            variant="soft"
            color={"warning"}
            size={isMobile ? "sm" : "md"}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 101,
              p: 2,
            }}>
            <Typography
              level={"body-sm"}
              sx={{ color: "text.primary" }}
              startDecorator={
                (isSuccess && <IoMdDoneAll fontSize={18} />) ||
                (isWarning && <IoIosWarning fontSize={18} />) ||
                (isNeutral && <IoMdInformationCircle fontSize={18} />)
              }>
              {content}
            </Typography>
            <LinearProgress
              determinate
              size="sm"
              color={color}
              value={progressValue * 100}
              sx={{
                width: "100%",
                position: "absolute",
                bottom: 0,
                transform: "rotate(180deg)",
                borderRadius: 0,
              }}
            />
          </Alert>
        </Box>
      )}
    </>
  );
};

export default CustomToast;
