/* eslint-disable react/prop-types */

import BowlingHeader from "./BowlingHeader";
import BowlingPerformance from "./BowlingPerformance";

const BowlingSection = ({ bowlingData }) => {
  return (
    <>
      <BowlingHeader />
      <BowlingPerformance bowlingData={bowlingData} />
    </>
  );
};

export default BowlingSection;
