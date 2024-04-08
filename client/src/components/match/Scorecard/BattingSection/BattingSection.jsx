import BattingPerformance from "./BattingPerformance";
import BattingSummary from "./BattingSummary";

/* eslint-disable react/prop-types */
const BattingSection = ({ team, total, battingData }) => {
  return (
    <>
      <BattingSummary team={team} total={total} />
      <BattingPerformance battingData={battingData} />
    </>
  );
};
export default BattingSection;
