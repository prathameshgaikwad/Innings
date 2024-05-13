/* eslint-disable react/prop-types */

import {
  Card,
  CardContent,
  CardOverflow,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";

import { CARD_BOX_SHADOW_GLOW_EFFECT } from "../../../utilities/constants";
import CallToActionButton from "./CallToActionButton";
import CustomModal from "../../notifications/modals/CustomModal";
import { MdAccessTime } from "react-icons/md";
import SimpleMatchCardSkeleton from "../../skeletons/SimpleMatchCardSkeleton";
import TeamBadgeHorizontal from "../../dataDisplay/TeamBadgeHorizontal";
import VersusIcon from "../../icons/VersusIcon";
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
            outline: `1px solid `,
            transition: "all 0.3s ease-in-out",
            outlineColor: "transparent",
            "&:hover": {
              outlineColor: ` ${theme.palette.primary.softHoverBg}`,
              boxShadow: CARD_BOX_SHADOW_GLOW_EFFECT,
            },
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
                <TeamBadgeHorizontal
                  isLoading={isLoading}
                  team={matchData.team1Details}
                  isSmall={true}
                />
                <VersusIcon />
                <TeamBadgeHorizontal
                  isLoading={isLoading}
                  team={matchData.team2Details}
                  isSmall={true}
                />
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
