/* eslint-disable react/prop-types */

import {
  Button,
  Card,
  CardContent,
  CardOverflow,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";

import CustomModal from "../modals/CustomModal";
import { MdAccessTime } from "react-icons/md";
import SimpleMatchCardSkeleton from "../skeletons/SimpleMatchCardSkeleton";
import { format } from "date-fns";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));

  return format(date, "h:mm a");
};

const SimpleMatchCard = ({
  callToAction = "Start Match",
  matchData,
  isTournamentManagementPage,
  isLoading,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const { tournamentId } = useParams();

  const MatchNumber = matchData.match_no;
  const team1 = matchData.team1Details.name;
  const team2 = matchData.team2Details.name;
  const team1Short = matchData.team1Details.nameShort;
  const team2Short = matchData.team2Details.nameShort;
  const team1Color = matchData.team1Details.color;
  const team2Color = matchData.team2Details.color;
  const matchStatus = matchData.status;
  const matchTime = formatTime(matchData.time);
  const matchId = matchData.match_id;

  const isMatchComplete = matchStatus === "completed";

  const handleCallToAction = () => {
    if (callToAction === "Start Match") {
      setOpen(true);
    } else {
      navigate(`/tournaments/${tournamentId}/${matchId}`);
    }
  };

  const TeamColorBadge = ({ teamColor }) => {
    return (
      <Typography
        bgcolor={teamColor}
        sx={{
          mr: 0.5,
          height: isMobile ? 18 : 24,
          width: 4,
        }}>
        &nbsp;
      </Typography>
    );
  };

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
                  {isMobile ? team1Short : team1}
                </Typography>{" "}
                vs
                <Typography
                  level={isMobile ? "title-sm" : "title-md"}
                  whiteSpace="nowrap"
                  endDecorator={<TeamColorBadge teamColor={team2Color} />}>
                  {isMobile ? team2Short : team2}
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
              redirectLink={`/tournaments/${tournamentId}/${matchId}/manage`}
            />
          </CardContent>
          {isMatchComplete ? (
            <CardOverflow
              variant="solid"
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Button color="success" size={"sm"}>
                <Link
                  href={`/tournaments/${tournamentId}/${matchId}`}
                  overlay
                  sx={{
                    color: theme.palette.common.white,
                    "&:hover": { textDecoration: "none" },
                  }}>
                  <Typography
                    color={theme.palette.common.white}
                    level="title-sm"
                    noWrap>
                    See Details
                  </Typography>
                </Link>
              </Button>
            </CardOverflow>
          ) : (
            <CardOverflow
              variant="soft"
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Button
                color="primary"
                size={"sm"}
                onClick={() => handleCallToAction()}>
                <Typography
                  level="title-sm"
                  noWrap
                  color={theme.palette.common.white}>
                  {callToAction}
                </Typography>
              </Button>
            </CardOverflow>
          )}
        </Card>
      )}
    </>
  );
};

export default SimpleMatchCard;
