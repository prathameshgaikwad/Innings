/* eslint-disable react/prop-types */

import { Tab, TabList, Tabs, tabClasses, useTheme } from "@mui/joy";

const TabsSegmentedControls = ({
  setIndex,
  index,
  battingTeamName,
  bowlingTeamName,
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
          },
          [`& .${tabClasses.root}[aria-disabled="true"]`]: {
            color: theme.palette.neutral.solidDisabledColor,
            bgcolor: theme.palette.neutral.solidDisabledBg,
          },
        }}>
        <Tab disableIndicator>{battingTeamName} Innings</Tab>
        <Tab disabled={isSecondTabDisabled} disableIndicator>
          {bowlingTeamName} Innings
        </Tab>
      </TabList>
    </Tabs>
  );
};

export default TabsSegmentedControls;
