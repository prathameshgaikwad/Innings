/* eslint-disable react/prop-types */

import { Tooltip, Typography } from "@mui/joy";

type InfoItemProps = {
  tooltipTitle: string;
  content: React.ReactNode;
  startDecorator?: React.ReactNode;
};

const InfoItem: React.FC<InfoItemProps> = ({
  tooltipTitle,
  content,
  startDecorator,
}) => {
  return (
    <Tooltip title={tooltipTitle} variant="outlined">
      <Typography
        level="body-xs"
        fontWeight="md"
        textColor="text.secondary"
        startDecorator={startDecorator}>
        {content}
      </Typography>
    </Tooltip>
  );
};

export default InfoItem;
