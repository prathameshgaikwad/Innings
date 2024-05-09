import { Divider, Skeleton } from "@mui/joy";

import OnFieldPlayerStatsSkeleton from "./OnFieldPlayerStatsSkeleton";

const OnFieldBowlingStatsSkeleton = () => {
  return (
    <>
      <OnFieldPlayerStatsSkeleton width={"38%"} />
      <Divider orientation="vertical" />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={38}
        sx={{ my: 2 }}
      />
    </>
  );
};

export default OnFieldBowlingStatsSkeleton;
