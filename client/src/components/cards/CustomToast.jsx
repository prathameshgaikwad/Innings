/* eslint-disable react/prop-types */

import { Alert, Box, LinearProgress, Typography, useTheme } from "@mui/joy";

import { IoIosWarning } from "react-icons/io";
import { IoMdDoneAll } from "react-icons/io";
import { IoMdInformationCircle } from "react-icons/io";
import { useMediaQuery } from "@mui/material";
import useToastAnimation from "../../hooks/useToastAnimation";

const CustomToast = ({ content, title, color, duration }) => {
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
            color="neutral"
            size={isMobile ? "sm" : "lg"}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 101,
              p: 2.5,
            }}>
            {title && (
              <Typography
                level={isMobile ? "title-md" : "title-lg"}
                sx={{
                  alignSelf: "start",
                  color:
                    (isSuccess && theme.palette.success[400]) ||
                    (isWarning && theme.palette.warning[400]) ||
                    theme.palette.neutral[300],
                }}>
                {title}
              </Typography>
            )}
            <Typography
              level={isMobile ? "body-sm" : "body-md"}
              sx={{
                color:
                  (isSuccess && theme.palette.success[300]) ||
                  (isWarning && theme.palette.warning[300]) ||
                  theme.palette.neutral[400],
              }}
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
              }}
            />
          </Alert>
        </Box>
      )}
    </>
  );
};

export default CustomToast;
