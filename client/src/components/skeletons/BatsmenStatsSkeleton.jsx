/* eslint-disable react/prop-types */

import { Divider, Skeleton } from "@mui/joy";

const BatsmenStatsSkeleton = ({ isSmall }) => {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="text"
        level={isSmall ? "body-xs" : "body-sm"}
      />
      <Divider orientation="vertical" />
      <Skeleton
        animation="wave"
        variant="text"
        level={isSmall ? "body-xs" : "body-sm"}
      />
    </>
  );
};

export default BatsmenStatsSkeleton;
