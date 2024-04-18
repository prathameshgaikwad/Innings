/* eslint-disable react/prop-types */

import BallLogList from "../lists/BallLogList";
import OnFieldBatsmenStats from "./OnFieldBatsmenStats";

const OnFieldStats = ({ isLoading, batsmenData, ballLog, isSmall = true }) => {
  return (
    <>
      <OnFieldBatsmenStats
        data={batsmenData}
        isSmall={isSmall}
        isLoading={isLoading}
      />
      <BallLogList data={ballLog} isLoading={isLoading} />
    </>
  );
};

export default OnFieldStats;
