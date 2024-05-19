/* eslint-disable react/prop-types */

import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/joy";

import { BiSolidCricketBall } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa6";
import GroupsIcon from "@mui/icons-material/Groups";
import { LuClipboard } from "react-icons/lu";
import { LuClipboardCheck } from "react-icons/lu";
import PlaceIcon from "@mui/icons-material/Place";
import ShapeLineIcon from "@mui/icons-material/ShapeLine";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

const LoadingSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        display: "inline-flex",
        width: "100%",
        gap: isMobile ? 1.3 : 2,
        py: 1.5,
        px: isMobile ? 0 : "15%",
        justifyContent: "center",
      }}>
      <Skeleton animation="wave" variant="text" level="body-xs" />
    </Box>
  );
};

const InfoItem = ({ tooltipTitle, content, startDecorator }) => {
  return (
    <Tooltip title={tooltipTitle} variant="outlined">
      <Typography
        level="body-xs"
        fontWeight="md"
        textColor="text.tertiary"
        startDecorator={startDecorator}>
        {content}
      </Typography>
    </Tooltip>
  );
};

const handleShareButtonClick = ({ id, setIsCopied }) => {
  navigator.clipboard.writeText(id);
  setIsCopied(true);
  setTimeout(() => {
    setIsCopied(false);
  }, 4000);
};

const TournamentInfo = ({
  id,
  createdBy,
  teamsLength,
  venue,
  startDate,
  endDate,
  total_overs,
  isLoading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isCopied, setIsCopied] = useState(false);

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Card size="sm" variant="plain" sx={{ py: 1 }}>
          <CardContent
            sx={{
              display: "inline-flex",
              flexDirection: "row",
              width: "100%",
              gap: isMobile ? 1.3 : 4,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <InfoItem
              tooltipTitle={"Venue"}
              content={venue}
              startDecorator={<PlaceIcon color="primary" />}
            />
            <Divider orientation="vertical" />
            <InfoItem
              tooltipTitle={"Number of Teams"}
              content={`${teamsLength} ${isMobile ? "" : "Teams"}`}
              startDecorator={<GroupsIcon color="primary" />}
            />
            <Divider orientation="vertical" />
            <InfoItem
              tooltipTitle={"Overs"}
              content={`${startDate} - ${endDate}`}
              startDecorator={
                <FaRegCalendar size={16} color={theme.palette.primary[400]} />
              }
            />
            <Divider orientation="vertical" />
            <InfoItem
              tooltipTitle={"Overs"}
              content={`${total_overs} Overs`}
              startDecorator={
                <BiSolidCricketBall
                  size={16}
                  color={theme.palette.primary[400]}
                />
              }
            />
            <Divider orientation="vertical" />
            <InfoItem
              tooltipTitle={"Created by"}
              content={createdBy}
              startDecorator={<ShapeLineIcon color="primary" />}
            />
            <Divider orientation="vertical" />
            <InfoItem
              tooltipTitle={"Copy tournament id"}
              content={
                <IconButton
                  disabled={isCopied}
                  size="sm"
                  onClick={() => handleShareButtonClick({ id, setIsCopied })}>
                  {isCopied ? (
                    <Typography
                      level="body-xs"
                      startDecorator={
                        <LuClipboardCheck
                          size={18}
                          style={{ color: theme.palette.success.plainColor }}
                        />
                      }>
                      Copied!
                    </Typography>
                  ) : (
                    <Typography
                      level="body-xs"
                      startDecorator={
                        <LuClipboard
                          size={18}
                          style={{ color: theme.palette.primary.plainColor }}
                        />
                      }>
                      Copy ID
                    </Typography>
                  )}
                </IconButton>
              }
            />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TournamentInfo;
