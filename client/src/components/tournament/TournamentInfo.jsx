/* eslint-disable react/prop-types */

import {
  Box,
  Divider,
  Skeleton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/joy";

import { BiSolidCricketBall } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa6";
import GroupsIcon from "@mui/icons-material/Groups";
import { MdOutlineHorizontalRule } from "react-icons/md";
import PlaceIcon from "@mui/icons-material/Place";
import ShapeLineIcon from "@mui/icons-material/ShapeLine";
import { useMediaQuery } from "@mui/material";

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

const TournamentInfo = ({
  createdBy,
  teamsLength,
  venue,
  startDate,
  endDate,
  overs,
  isLoading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Box
          sx={{
            display: "inline-flex",
            width: "100%",
            gap: isMobile ? 1.3 : 2,
            py: 1.5,
            px: isMobile ? 0 : "15%",
            justifyContent: "center",
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
              <MdOutlineHorizontalRule style={{ margin: "0 6px" }} /> {endDate}
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
              {overs} Overs
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
        </Box>
      )}
    </>
  );
};

export default TournamentInfo;
