import { Divider, Skeleton } from "@mui/joy";

const BallLogSkeleton = () => {
  return (
    <>
      <Skeleton animation="wave" variant="text" level="body-sm" width={"38%"} />
      <Divider orientation="vertical" />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={40}
        sx={{ my: 2 }}
      />
    </>
  );
};

export default BallLogSkeleton;
