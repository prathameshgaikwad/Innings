import { Card, CardContent, Divider, useTheme } from "@mui/joy";

import { BiSolidCricketBall } from "react-icons/bi";
import CopyButton from "../buttons/CopyButton";
import { FaRegCalendar } from "react-icons/fa6";
import GroupsIcon from "@mui/icons-material/Groups";
import InfoItem from "../dataDisplay/InfoItem";
import PlaceIcon from "@mui/icons-material/Place";
import ShapeLineIcon from "@mui/icons-material/ShapeLine";
import TournamentInfoSkeleton from "../skeletons/TournamentInfoSkeleton";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

type TournamentInfoProps = {
  id: string;
  createdBy: string;
  teamsLength: number;
  venue: string;
  startDate: string;
  endDate: string;
  total_overs: number;
  isLoading: boolean;
};

const TournamentInfo: React.FC<TournamentInfoProps> = ({
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
        <TournamentInfoSkeleton />
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
            <CopyButton isCopied={isCopied} setIsCopied={setIsCopied} id={id} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TournamentInfo;
