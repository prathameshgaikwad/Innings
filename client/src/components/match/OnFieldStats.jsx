/* eslint-disable react/prop-types */

import BallLogList from "../lists/BallLogList";
import BatsmenStats from "./BatsmenStats";

const OnFieldStats = ({ isLoading, batsmenData, ballLog, isSmall = true }) => {
  return (
    <>
      <BatsmenStats
        data={batsmenData}
        isSmall={isSmall}
        isLoading={isLoading}
      />
      <BallLogList isSmall={true} data={ballLog} isLoading={isLoading} />
    </>
  );
};

export default OnFieldStats;
