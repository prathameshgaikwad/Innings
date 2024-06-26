import { CardContent, Divider, Typography } from "@mui/joy";

import formatDate from "../../../utilities/helpers/formatDate";
import formatTime from "../../../utilities/helpers/formatTime";
import setTimeFromString from "../../../utilities/helpers/setTimeFromString";

type BottomBarProps = {
  overs: number;
  date: string;
  time: string;
};

const BottomBar: React.FC<BottomBarProps> = ({ overs, date, time }) => {
  return (
    <>
      <Divider inset="context" />
      <CardContent
        orientation="horizontal"
        sx={{ justifyContent: "space-evenly" }}>
        <Typography level="body-xs" textColor="text.tertiary">
          {overs} Overs
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body-xs" textColor="text.tertiary">
          {formatDate(date)}
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body-xs" textColor="text.tertiary">
          {formatTime(setTimeFromString(time))}
        </Typography>
      </CardContent>
    </>
  );
};

export default BottomBar;
