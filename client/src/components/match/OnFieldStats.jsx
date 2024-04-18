/* eslint-disable react/prop-types */

import BallLogList from "../lists/BallLogList";
import CenteredBox from "../layouts/pages/CenteredBox";
import OnFieldBatsmenStats from "./OnFieldBatsmenStats";

const OnFieldStats = ({ isLoading, batsmenData, ballLog, isSmall = true }) => {
  return (
    <CenteredBox customStyles={{ gap: 1 }}>
      <OnFieldBatsmenStats
        data={batsmenData}
        isSmall={isSmall}
        isLoading={isLoading}
      />
      <BallLogList data={ballLog} isLoading={isLoading} />
    </CenteredBox>
  );
};

export default OnFieldStats;
