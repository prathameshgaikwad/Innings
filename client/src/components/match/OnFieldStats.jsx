/* eslint-disable react/prop-types */

import BallLogList from "../lists/BallLogList";
import CenteredBox from "../layouts/pages/CenteredBox";
import OnFieldBatsmenStats from "./OnFieldBatsmenStats";

const OnFieldStats = ({
  isLoading,
  batsmenData,
  bowlerData,
  ballLog,
  isSmall = true,
  isAdmin = false,
}) => {
  return (
    <CenteredBox customStyles={{ gap: 1 }}>
      <OnFieldBatsmenStats
        data={batsmenData}
        isSmall={isSmall}
        isLoading={isLoading}
        isAdmin={isAdmin}
      />
      <BallLogList
        ballLog={ballLog}
        bowlerData={bowlerData}
        isLoading={isLoading}
        isAdmin={isAdmin}
      />
    </CenteredBox>
  );
};

export default OnFieldStats;
