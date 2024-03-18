/* eslint-disable react/prop-types */

import { Stack, Tooltip } from "@mui/joy";

import LogItem from "../LogItem";

const RecentTeamPerformance = ({ recentPerformance }) => {
  return (
    <Tooltip variant="outlined" title={"Recent Performance"}>
      <Stack direction={"row"} gap={1}>
        {recentPerformance.map((item, i) => {
          let type = "";
          switch (item) {
            case "W":
              type = "success";
              break;
            case "L":
              type = "danger";
              break;
            default:
              type = "neutral";
          }
          return <LogItem key={i} item={item} type={type} isSmall={true} />;
        })}
      </Stack>
    </Tooltip>
  );
};

export default RecentTeamPerformance;
