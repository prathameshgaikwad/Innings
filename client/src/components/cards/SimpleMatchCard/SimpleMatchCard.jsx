/* eslint-disable react/prop-types */

import {
  Card,
  CardContent,
  CardOverflow,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";

import CallToActionButton from "./CallToActionButton";
import CustomModal from "../../modals/CustomModal";
import { MdAccessTime } from "react-icons/md";
import SimpleMatchCardSkeleton from "../../skeletons/SimpleMatchCardSkeleton";
import TeamColorBadge from "./TeamColorBadge";
import formatTime from "../../../utilities/helpers/formatTime";
import setTimeFromString from "../../../utilities/helpers/setTimeFromString";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";

const SimpleMatchCard = ({
  callToAction = "Start Match",
  matchData,
  isTournamentManagementPage,
  isLoading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const { tournamentId } = useParams();

  const MatchNumber = matchData.match_no;
  const {
    name: team1Name,
    nameShort: team1NameShort,
    color: team1Color,
  } = matchData.team1Details;
  const {
    name: team2Name,
    nameShort: team2NameShort,
    color: team2Color,
  } = matchData.team2Details;
  const matchStatus = matchData.status;
  const matchTime = formatTime(setTimeFromString(matchData.time));
  const matchId = matchData.match_id;
  const matchURL = `/tournaments/${tournamentId}/match/${matchId}`;

  const isMatchComplete = matchStatus === "completed";

  return (
    <>
      {isLoading ? (
        <SimpleMatchCardSkeleton
          isMobile={isMobile}
          isTournamentManagementPage={isTournamentManagementPage}
        />
      ) : (
        <Card
          variant="outlined"
          orientation="horizontal"
          size={isMobile ? "sm" : isTournamentManagementPage ? "sm" : "md"}
          sx={{
            width: "100%",
            maxWidth: 700,
          }}>
          <CardOverflow
            variant="soft"
            sx={{ justifyContent: "center", alignItems: "center" }}>
            <Typography
              color="neutral"
              level={isMobile ? "title-md" : "title-lg"}
              sx={{ px: 1 }}
              noWrap>
              # {MatchNumber}
            </Typography>
          </CardOverflow>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
              sx={{ height: "100%" }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography
                  level={isMobile ? "title-sm" : "title-md"}
                  whiteSpace="nowrap"
                  startDecorator={<TeamColorBadge teamColor={team1Color} />}>
                  {" "}
                  {isMobile ? team1NameShort : team1Name}
                </Typography>{" "}
                vs
                <Typography
                  level={isMobile ? "title-sm" : "title-md"}
                  whiteSpace="nowrap"
                  endDecorator={<TeamColorBadge teamColor={team2Color} />}>
                  {isMobile ? team2NameShort : team2Name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" width="100%">
                <Typography
                  color="neutral"
                  startDecorator={<MdAccessTime size={16} />}
                  level="title-sm"
                  ml="auto"
                  noWrap>
                  {matchTime}
                </Typography>
              </Stack>
            </Stack>
            <CustomModal
              color={"warning"}
              open={open}
              setOpen={setOpen}
              title={"Are you absolutely sure?"}
              content={
                "This will start a session where you will be able to score this match. Do you wish to proceed?"
              }
              useCase={"startMatch"}
              redirectLink={`${matchURL}/manage`}
            />
          </CardContent>
          <CardOverflow
            variant="plain"
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}>
            <CallToActionButton
              title={callToAction}
              isMatchComplete={isMatchComplete}
              matchURL={matchURL}
              setOpen={setOpen}
            />
          </CardOverflow>
        </Card>
      )}
    </>
  );
};

export default SimpleMatchCard;
