/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

import ConductToss from "./matchManagement/ConductToss";
import { useSelector } from "react-redux";

const TossProvider = ({ matchId, team1, team2, children }) => {
  const { toss } = useSelector((state) => state.matchManagement);
  const [tossConducted, setTossConducted] = useState(toss.conducted);

  useEffect(() => {
    setTossConducted(toss.conducted === true);
  }, [toss.conducted]);

  return (
    <>
      {tossConducted ? (
        children
      ) : (
        <ConductToss matchId={matchId} team1={team1} team2={team2} />
      )}
    </>
  );
};

export default TossProvider;
