/* eslint-disable react/prop-types */

import CenteredBox from "../../layouts/pages/CenteredBox";
import { Link } from "@mui/joy";
import MatchCardContent from "./MatchCardContent";
import MatchCardSkeleton from "../../skeletons/MatchCardSkeleton";

const MatchCard = ({ isLoading, tournamentId, data, isMatchPage }) => {
  const matchURL = data ? `/tournaments/${tournamentId}/match/${data._id}` : "";

  return (
    <>
      {isLoading ? (
        <MatchCardSkeleton />
      ) : (
        <>
          {isMatchPage ? (
            <CenteredBox>
              <MatchCardContent data={data} />
            </CenteredBox>
          ) : (
            <Link
              href={matchURL}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                mx: "auto",
                "&:hover": {
                  textDecoration: "none",
                  cursor: "pointer",
                },
              }}>
              <MatchCardContent data={data} />
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default MatchCard;
