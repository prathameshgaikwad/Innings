/* eslint-disable react/prop-types */

import CenteredBox from "../layouts/pages/CenteredBox";
import OnFieldBatsmenStats from "./OnFieldBatsmenStats";
import OnFieldBowlingStats from "./OnFieldBowlingStats";

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
      <OnFieldBowlingStats
        ballLog={ballLog}
        bowlerData={bowlerData}
        isLoading={isLoading}
        isAdmin={isAdmin}
      />
    </CenteredBox>
  );
};

export default OnFieldStats;
