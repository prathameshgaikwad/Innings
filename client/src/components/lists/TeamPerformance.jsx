/* eslint-disable react/prop-types */

import { Stack, Tooltip } from "@mui/joy";

import LogItem from "../LogItem";

const TeamPerformance = ({ performance, size }) => {
  // CHOOSE A MAXIMUM OF "SIZE" NUMBER OF ENTRIES
  if (size) {
    if (performance.length > size) {
      const len = performance.length;
      performance = performance.slice(len - size, len);
    }
  }

  return (
    <Tooltip variant="outlined" title={"Recent Performance"}>
      <Stack direction={"row"} gap={1}>
        {performance.map((item, i) => {
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

export default TeamPerformance;
