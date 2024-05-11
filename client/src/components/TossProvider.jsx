/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

import ConductToss from "./matchManagement/ConductToss";
import TossNotConducted from "./fallbacks/TossNotConducted";
import { useSelector } from "react-redux";

const TossProvider = ({
  isLoading,
  matchId,
  team1,
  team2,
  children,
  canConductToss,
}) => {
  const { toss } = useSelector((state) =>
    canConductToss ? state.matchManagement : state.match
  );
  const [tossConducted, setTossConducted] = useState(toss.conducted);

  useEffect(() => {
    setTossConducted(toss.conducted === true);
  }, [toss.conducted]);

  return (
    <>
      {tossConducted ? (
        children
      ) : canConductToss ? (
        <ConductToss matchId={matchId} team1={team1} team2={team2} />
      ) : (
        <TossNotConducted
          isLoading={isLoading}
          battingTeam={team1}
          bowlingTeam={team2}
        />
      )}
    </>
  );
};

export default TossProvider;
