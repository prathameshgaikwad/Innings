/* eslint-disable react/prop-types */

import { IconButton, Typography, useTheme } from "@mui/joy";

import InfoItem from "../dataDisplay/InfoItem";
import { LuClipboard } from "react-icons/lu";
import { LuClipboardCheck } from "react-icons/lu";

const handleShareButtonClick = ({ id, setIsCopied }) => {
  navigator.clipboard.writeText(id);
  setIsCopied(true);
  setTimeout(() => {
    setIsCopied(false);
  }, 4000);
};
const CopyButton = ({ isCopied, setIsCopied, id }) => {
  const theme = useTheme();
  return (
    <InfoItem
      tooltipTitle={"Copy tournament id"}
      content={
        <IconButton
          disabled={isCopied}
          size="sm"
          onClick={() => handleShareButtonClick({ id, setIsCopied })}>
          {isCopied ? (
            <Typography
              level="body-xs"
              startDecorator={
                <LuClipboardCheck
                  size={18}
                  style={{ color: theme.palette.success.plainColor }}
                />
              }>
              Copied!
            </Typography>
          ) : (
            <Typography
              level="body-xs"
              startDecorator={
                <LuClipboard
                  size={18}
                  style={{ color: theme.palette.primary.plainColor }}
                />
              }>
              Copy ID
            </Typography>
          )}
        </IconButton>
      }
    />
  );
};

export default CopyButton;
