/* eslint-disable react/prop-types */

import {
  SAMPLE_SCORECARD_BATTING_DATA_1,
  SAMPLE_SCORECARD_BOWLING_DATA_1,
} from "../../../utilities/constants";

import CenteredBox from "../../layouts/pages/CenteredBox";
import ScorecardContent from "./ScorecardContent";
import ScorecardSkeleton from "../../skeletons/ScorecardSkeleton";
import SectionHeader from "../../layouts/sections/SectionHeader";
import TabsSegmentedControls from "../../controls/TabsSegmentedControls";
import { useSelector } from "react-redux";
import { useState } from "react";

const Scorecard = ({
  matchId,
  isAdmin,
  isLoading,
  innings,
  current_innings_no,
  fallOfWicketsData,
}) => {
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

  const battingData = SAMPLE_SCORECARD_BATTING_DATA_1;
  const bowlingData = SAMPLE_SCORECARD_BOWLING_DATA_1;

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
            battingTeam={battingTeam}
            bowlingTeam={bowlingTeam}
            current_innings_no={current_innings_no}
          />
          <ScorecardContent
            matchId={matchId}
            team={team}
            total={total}
            battingData={battingData}
            bowlingData={bowlingData}
            extras={extras}
            fallOfWicketsData={fallOfWicketsData}
          />
        </CenteredBox>
      )}
    </>
  );
};

export default Scorecard;
