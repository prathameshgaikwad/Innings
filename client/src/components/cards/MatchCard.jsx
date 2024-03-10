/* eslint-disable react/prop-types */

import {
  AspectRatio,
  Box,
  LinearProgress,
  Link,
  Typography,
  useTheme,
} from "@mui/joy";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MatchCardSkeleton from "../skeletons/MatchCardSkeleton";
import { useMediaQuery } from "@mui/material";

const totalRuns = "91";
const totalWickets = "2";
const oversCompleted = "6.3";
const currentRunRate = "13.86";
const progress = 63;

const MatchCard = ({ isLoading, tournamentId, data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTextOverflow = useMediaQuery(theme.breakpoints.down(1015));
  const isTab = useMediaQuery(theme.breakpoints.down(650));

  const matchURL = data ? `/tournaments/${tournamentId}/${data._id}` : "";

  return (
    <>
      {isLoading ? (
        <MatchCardSkeleton />
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
          <Card
            variant="outlined"
            sx={{
              width: isTab ? "96%" : "72%",
              minWidth: "72%",
            }}>
            {/* Top Bar */}

            <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
              <CardContent
                sx={{
                  display: "inline-flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Typography
                  level={isMobile ? "title-lg" : "h4"}
                  color="neutral">
                  # {data.match_no}
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                  level={isMobile ? "title-lg" : "h4"}
                  sx={{ color: "text.tertiary" }}>
                  {data.team1.name}
                </Typography>
                vs
                <Typography
                  level={isMobile ? "title-lg" : "h4"}
                  sx={{ color: "text.tertiary" }}>
                  {data.team2.name}
                </Typography>
              </CardContent>
              <Divider inset="context" />
            </CardOverflow>

            {/* Main Content */}
            <CardContent
              sx={{
                my: isMobile ? 2 : 4,
                mx: 4,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}>
              {/* Batting Team */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <AspectRatio
                  ratio="1"
                  sx={{ width: isMobile ? 66 : 90, borderRadius: "50%" }}>
                  <img src={data.team1.logoURL} loading="lazy" alt="" />
                </AspectRatio>
                <Typography
                  level={isMobile ? "title-md" : "title-lg"}
                  sx={{ mt: isMobile ? 1 : 2 }}>
                  {data.team1.nameShort}
                </Typography>
              </Box>

              {/* Score Pane */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography level={isMobile ? "h3" : "h2"}>
                    {totalRuns} - {totalWickets}
                  </Typography>
                </Box>
                <Divider sx={{ my: isMobile ? 0.5 : 1 }} />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    level={isMobile ? "body-xs" : "body-sm"}
                    sx={{ mx: isMobile ? 0.5 : 1 }}>
                    {!isTextOverflow && "Overs: "}
                    {oversCompleted}/{data.overs}
                  </Typography>
                  <FiberManualRecordIcon sx={{ width: isMobile ? 6 : 8 }} />
                  <Typography
                    level={isMobile ? "body-xs" : "body-sm"}
                    sx={{ mx: isMobile ? 0.5 : 1 }}>
                    {!isTextOverflow && "CRR: "}
                    {currentRunRate}
                  </Typography>
                </Box>
              </Box>

              {/* Bowling Team */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <AspectRatio
                  ratio="1"
                  sx={{ width: isMobile ? 66 : 90, borderRadius: "50%" }}>
                  <img src={data.team2.logoURL} loading="lazy" alt="" />
                </AspectRatio>
                <Typography
                  level={isMobile ? "title-md" : "title-lg"}
                  sx={{ mt: isMobile ? 1 : 2 }}>
                  {data.team2.nameShort}
                </Typography>
              </Box>
            </CardContent>

            {/* Bottom Bar */}

            <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
              <Divider inset="context" />
              <CardContent orientation="horizontal">
                <Typography level="body-xs" textColor="text.secondary">
                  {data.overs} Overs
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                  level="body-xs"
                  textColor="text.secondary"
                  noWrap
                  sx={{ maxWidth: 150 }}>
                  {data.venue}
                </Typography>
                <Divider orientation="vertical" />
                <Typography level="body-xs" textColor="text.secondary">
                  Match progress:
                </Typography>
                <LinearProgress
                  variant="soft"
                  determinate
                  color="success"
                  value={progress}
                />
              </CardContent>
            </CardOverflow>
          </Card>
        </Link>
      )}
    </>
  );
};

export default MatchCard;
