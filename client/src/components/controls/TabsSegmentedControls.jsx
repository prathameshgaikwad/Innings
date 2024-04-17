/* eslint-disable react/prop-types */

import { Tab, TabList, Tabs, tabClasses } from "@mui/joy";

const TabsSegmentedControls = ({ setIndex, index, team1Name, team2Name }) => {
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
            bgcolor: "background.surface",
          },
        }}>
        <Tab disableIndicator>{team1Name} Innings</Tab>
        <Tab disableIndicator>{team2Name} Innings</Tab>
      </TabList>
    </Tabs>
  );
};

export default TabsSegmentedControls;
