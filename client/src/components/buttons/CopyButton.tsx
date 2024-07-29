import { IconButton, Typography, useTheme } from "@mui/joy";

import InfoItem from "../dataDisplay/InfoItem";
import { LuClipboard } from "react-icons/lu";
import { LuClipboardCheck } from "react-icons/lu";

type CopyButtonProps = {
  id: string;
  isCopied: boolean;
  setIsCopied: React.Dispatch<React.SetStateAction<boolean>>;
};

const CopyButton: React.FC<CopyButtonProps> = ({
  isCopied,
  setIsCopied,
  id,
}) => {
  const theme = useTheme();
  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(id);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 4000);
  };

  return (
    <InfoItem
      tooltipTitle={"Copy tournament id"}
      content={
        <IconButton
          disabled={isCopied}
          size="sm"
          onClick={() => handleCopyButtonClick()}>
          {isCopied ? (
            <Typography
              level="body-xs"
              textColor={"text.secondary"}
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
              textColor={"text.secondary"}
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
