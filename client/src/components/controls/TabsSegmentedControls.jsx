/* eslint-disable react/prop-types */

import { Tab, TabList, Tabs, Tooltip, tabClasses, useTheme } from "@mui/joy";

const TabsSegmentedControls = ({
  setIndex,
  index,
  battingTeam,
  bowlingTeam,
  current_innings_no,
}) => {
  const theme = useTheme();

  const isSecondTabDisabled = current_innings_no === 1;

  return (
    <Tabs
      aria-label="tabs"
      value={index}
      sx={{ bgcolor: "transparent" }}
      onChange={(event, value) => setIndex(value)}>
      <TabList
        disableUnderline
        sx={{
          p: 0.5,
          gap: 0.5,
          borderRadius: "xl",
          bgcolor: "background.level1",
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            color: theme.palette.neutral.plainColor,
            bgcolor: theme.palette.primary.plainActiveBg,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              bgcolor: theme.palette.primary.plainHoverBg,
            },
          },
        }}>
        <Tooltip
          title={battingTeam.name}
          placement="top"
          variant="outlined"
          arrow>
          <Tab disableIndicator>{battingTeam.name_short} Innings</Tab>
        </Tooltip>
        <Tooltip
          title={bowlingTeam.name}
          placement="top"
          variant="outlined"
          arrow>
          <Tab disabled={isSecondTabDisabled} disableIndicator>
            {bowlingTeam.name_short} Innings
          </Tab>
        </Tooltip>
      </TabList>
    </Tabs>
  );
};

export default TabsSegmentedControls;
