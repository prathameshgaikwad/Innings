/* eslint-disable react/prop-types */

import {
  SAMPLE_SCORECARD_BATTING_DATA_1,
  SAMPLE_SCORECARD_BATTING_DATA_2,
  SAMPLE_SCORECARD_BOWLING_DATA_1,
  SAMPLE_SCORECARD_BOWLING_DATA_2,
  SAMPLE_SCORECARD_FALL_OF_WICKETS_DATA_1,
  SAMPLE_SCORECARD_FALL_OF_WICKETS_DATA_2,
} from "../../../utilities/constants";

import CenteredBox from "../../layouts/pages/CenteredBox";
import ScorecardContent from "./ScorecardContent";
import ScorecardSkeleton from "../../skeletons/ScorecardSkeleton";
import SectionHeader from "../../layouts/sections/SectionHeader";
import TabsSegmentedControls from "../../controls/TabsSegmentedControls";
import { useSelector } from "react-redux";
import { useState } from "react";

const battingData1 = SAMPLE_SCORECARD_BATTING_DATA_1;
const battingData2 = SAMPLE_SCORECARD_BATTING_DATA_2;
const bowlingData1 = SAMPLE_SCORECARD_BOWLING_DATA_1;
const bowlingData2 = SAMPLE_SCORECARD_BOWLING_DATA_2;
const nonBattingData1 = [
  "Matheesha Pathirana",
  "Maheesh Theekshana",
  "Tushar Deshpande",
  "Akash Singh",
];
const nonBattingData2 = [
  "Harshal Patel",
  "Vyshak Vijaykumar",
  "Mohammed Siraj",
];
const fallOfWicketsData1 = SAMPLE_SCORECARD_FALL_OF_WICKETS_DATA_1;
const fallOfWicketsData2 = SAMPLE_SCORECARD_FALL_OF_WICKETS_DATA_2;

const Scorecard = ({ isAdmin, isLoading, innings, current_innings_no }) => {
  const [index, setIndex] = useState(0);

  const battingTeam = useSelector((state) =>
    isAdmin ? state.matchManagement.battingTeam : state.match.battingTeam
  );
  const bowlingTeam = useSelector((state) =>
    isAdmin ? state.matchManagement.bowlingTeam : state.match.bowlingTeam
  );

  const latestInningsData = innings[current_innings_no - 1]?.data;
  const previousInningsData = innings[current_innings_no - 2]?.data;
  const inningsData = index === 0 ? latestInningsData : previousInningsData;

  const total = `${inningsData?.total_runs}/${inningsData?.total_wickets}`;
  const extras = inningsData?.extras;
  const team = index === 0 ? battingTeam : bowlingTeam;

  const battingData = index === 0 ? battingData1 : battingData2;
  const nonBattingData = index === 0 ? nonBattingData1 : nonBattingData2;
  const bowlingData = index === 0 ? bowlingData1 : bowlingData2;
  const fallOfWicketsData =
    index === 0 ? fallOfWicketsData1 : fallOfWicketsData2;

  return (
    <>
      {isLoading ? (
        <ScorecardSkeleton />
      ) : (
        <CenteredBox customStyles={{ mt: 8 }}>
          <SectionHeader title={"Scorecard"} />
          <TabsSegmentedControls
            setIndex={setIndex}
            index={index}
            battingTeamName={battingTeam.name_short}
            bowlingTeamName={bowlingTeam.name_short}
            current_innings_no={current_innings_no}
          />
          <ScorecardContent
            team={team}
            total={total}
            battingData={battingData}
            bowlingData={bowlingData}
            nonBattingData={nonBattingData}
            extras={extras}
            fallOfWicketsData={fallOfWicketsData}
          />
        </CenteredBox>
      )}
    </>
  );
};

export default Scorecard;
