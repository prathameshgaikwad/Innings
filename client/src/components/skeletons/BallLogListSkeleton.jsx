import { Divider, Skeleton } from "@mui/joy";

const BallLogListSkeleton = () => {
  return (
    <>
      <Skeleton animation="wave" variant="text" level="body-sm" width={"38%"} />
      <Divider orientation="vertical" />
      <Skeleton animation="wave" variant="rectangular" height={40} />
    </>
  );
};

export default BallLogListSkeleton;
