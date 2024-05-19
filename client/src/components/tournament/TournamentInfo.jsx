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
import { MdOutlineHorizontalRule } from "react-icons/md";
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
              gap: isMobile ? 1.3 : 2,
              px: isMobile ? 0 : "15%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Tooltip title="Venue" variant="outlined">
              <Typography
                level="body-xs"
                fontWeight="md"
                textColor="text.tertiary"
                startDecorator={<PlaceIcon color="primary" />}>
                {venue}
              </Typography>
            </Tooltip>
            <Divider orientation="vertical" />
            <Tooltip title="Number of Teams" variant="outlined">
              <Typography
                level="body-xs"
                fontWeight="md"
                textColor="text.tertiary"
                startDecorator={<GroupsIcon color="primary" />}>
                {teamsLength} {isMobile ? "" : "Teams"}
              </Typography>
            </Tooltip>
            <Divider orientation="vertical" />
            <Tooltip title="Date Range" variant="outlined">
              <Typography
                level="body-xs"
                fontWeight="md"
                textColor="text.tertiary"
                startDecorator={
                  <FaRegCalendar size={16} color={theme.palette.primary[400]} />
                }>
                {startDate}{" "}
                <MdOutlineHorizontalRule style={{ margin: "0 6px" }} />{" "}
                {endDate}
              </Typography>
            </Tooltip>
            <Tooltip title="Overs" variant="outlined">
              <Typography
                level="body-xs"
                fontWeight="md"
                textColor="text.tertiary"
                startDecorator={
                  <>
                    {isMobile && (
                      <Divider orientation="vertical" sx={{ mr: 1.3 }} />
                    )}
                    <BiSolidCricketBall
                      size={16}
                      color={theme.palette.primary[400]}
                    />
                  </>
                }
                sx={{ ml: isMobile ? 0 : "auto" }}>
                {total_overs} Overs
              </Typography>
            </Tooltip>
            <Divider orientation="vertical" />
            <Tooltip title="Created by" variant="outlined">
              <Typography
                level="body-xs"
                fontWeight="md"
                textColor="text.tertiary"
                startDecorator={<ShapeLineIcon color="warning" />}>
                {createdBy}
              </Typography>
            </Tooltip>
            <Divider orientation="vertical" />
            <Tooltip title="Copy tournament id" variant="outlined">
              <IconButton
                disabled={isCopied}
                size="sm"
                onClick={() => handleShareButtonClick({ id, setIsCopied })}>
                {isCopied ? (
                  <Typography
                    level="body-xs"
                    startDecorator={
                      <LuClipboardCheck
                        size={16}
                        style={{ color: theme.palette.success.plainColor }}
                      />
                    }>
                    Copied!
                  </Typography>
                ) : (
                  <LuClipboard
                    size={16}
                    style={{ color: theme.palette.primary.plainColor }}
                  />
                )}
              </IconButton>
            </Tooltip>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TournamentInfo;
