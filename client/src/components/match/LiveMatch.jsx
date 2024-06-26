/* eslint-disable react/prop-types */

import { Link, Stack, useTheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CenteredBox from "../layouts/pages/CenteredBox";
import LiveIcon from "../../../public/assets/LiveIcon";
import MatchCard from "../cards/MatchCard/MatchCard";
import NoLiveMatchPlaceholder from "../fallbacks/NoLiveMatchPlaceholder";
import Typography from "@mui/joy/Typography";
import { useMediaQuery } from "@mui/material";
import { userApi } from "../../services/api";

const LiveMatch = ({ tournamentId }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTab = useMediaQuery(theme.breakpoints.down(650));
  const token = useSelector((state) => state.user.token);
  const tournamentName = useSelector(
    (state) => state.tournaments.latestTournament.name
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(userApi.getLiveMatchInfo({ tournamentId, token, setIsLoading }));
  }, [dispatch, tournamentId, token]);

  const liveMatch = useSelector((state) => state.user.liveMatch);
  const noLiveMatch = liveMatch.isEmpty;

  return (
    <>
      {noLiveMatch ? (
        <NoLiveMatchPlaceholder />
      ) : (
        <CenteredBox customStyles={{ width: isMobile ? "85vw" : "70vw" }}>
          <Stack
            sx={{
              width: isTab ? "96%" : "72%",
              minWidth: "72%",
            }}
            direction="row"
            justifyContent="space-between">
            <Typography
              startDecorator={<LiveIcon />}
              level={isMobile ? "h3" : "h2"}
              sx={{ mb: isMobile ? 3 : 4 }}>
              Live Now
            </Typography>
            <Link href={`/tournaments/${tournamentId}`}>
              <Typography
                level={isMobile ? "h3" : "h2"}
                color="primary"
                sx={{ mb: isMobile ? 3 : 4 }}>
                {tournamentName}
              </Typography>
            </Link>
          </Stack>
          <MatchCard
            isLoading={isLoading}
            tournamentId={tournamentId}
            data={liveMatch.data}
          />
        </CenteredBox>
      )}
    </>
  );
};

export default LiveMatch;
