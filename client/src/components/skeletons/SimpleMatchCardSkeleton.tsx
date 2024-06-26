import { Card, Divider, Skeleton } from "@mui/joy";

import VersusIcon from "../icons/VersusIcon";

type SimpleMatchCardSkeletonProps = {
  isTournamentManagementPage: boolean;
  isMobile: boolean;
};

const SimpleMatchCardSkeleton: React.FC<SimpleMatchCardSkeletonProps> = ({
  isTournamentManagementPage,
  isMobile,
}) => {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      size={isMobile ? "sm" : isTournamentManagementPage ? "sm" : "md"}
      sx={{
        width: "100%",
        maxWidth: 700,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Skeleton animation="wave" variant="text" width={"10%"} />
      <Divider orientation="vertical" />
      <Skeleton
        animation="wave"
        variant="text"
        level={isMobile ? "title-sm" : "title-md"}
      />
      <VersusIcon />
      <Skeleton
        animation="wave"
        variant="text"
        level={isMobile ? "title-sm" : "title-md"}
      />
      <Skeleton animation="wave" variant="text" level="title-sm" />
      <Divider orientation="vertical" />
      <Skeleton animation="wave" variant="text" width={"50%"} />
    </Card>
  );
};

export default SimpleMatchCardSkeleton;
