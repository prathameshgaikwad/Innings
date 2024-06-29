import {
  Alert,
  AlertProps,
  Box,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/joy";

import { IoIosWarning } from "react-icons/io";
import { IoMdDoneAll } from "react-icons/io";
import { IoMdInformationCircle } from "react-icons/io";
import { MdDangerous } from "react-icons/md";
import { TOAST_BOX_SHADOW } from "../../../utilities/constants";
import { useMediaQuery } from "@mui/material";
import useToastAnimation from "../../../hooks/useToastAnimation";

type CustomToastProps = {
  content: string;
  color: AlertProps["color"];
  duration: number;
};

const CustomToast: React.FC<CustomToastProps> = ({
  content,
  color,
  duration,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { isVisible, progressValue } = useToastAnimation(duration);

  const isSuccess = color === "success";
  const isWarning = color === "warning";
  const isDanger = color === "danger";
  const isNeutral = color === "neutral";

  return (
    <>
      {isVisible && (
        <Box
          style={{
            position: "fixed",
            zIndex: 1000,
            bottom: isMobile ? 15 : 20,
            right: isMobile ? 15 : 20,
          }}>
          <Alert
            variant="soft"
            color={color}
            size={isMobile ? "sm" : "md"}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 101,
              p: 2,
              boxShadow: TOAST_BOX_SHADOW,
            }}>
            <Typography
              level={"body-sm"}
              sx={{ color: "text.primary" }}
              startDecorator={
                (isSuccess && <IoMdDoneAll fontSize={18} />) ||
                (isWarning && <IoIosWarning fontSize={18} />) ||
                (isDanger && <MdDangerous fontSize={18} />) ||
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
