import { CardContent, Divider, Typography } from "@mui/joy";

import formatDate from "../../../utilities/helpers/formatDate";
import formatTime from "../../../utilities/helpers/formatTime";
import setTimeFromString from "../../../utilities/helpers/setTimeFromString";

type BottomBarProps = {
  overs: number;
  date: string;
  time: string;
};

const SmallText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Typography
      level="body-xs"
      textColor="text.tertiary"
      sx={{ transform: "scale(0.9)" }}>
      {children}
    </Typography>
  );
};

const BottomBar: React.FC<BottomBarProps> = ({ overs, date, time }) => {
  return (
    <>
      <Divider inset="context" />
      <CardContent
        orientation="horizontal"
        sx={{ justifyContent: "space-evenly" }}>
        <SmallText>{overs} Overs</SmallText>
        <Divider orientation="vertical" />
        <SmallText>{formatDate(date)}</SmallText>
        <Divider orientation="vertical" />
        <SmallText>{formatTime(setTimeFromString(time))}</SmallText>
      </CardContent>
    </>
  );
};

export default BottomBar;
