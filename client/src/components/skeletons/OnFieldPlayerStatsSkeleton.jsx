/* eslint-disable react/prop-types */

import { IconButton, Skeleton } from "@mui/joy";

import { HiSelector } from "react-icons/hi";

const OnFieldPlayerStatsSkeleton = ({ isSmall, width }) => {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="text"
        level={isSmall ? "body-xs" : "body-sm"}
        sx={{ width }}
      />
      <IconButton variant="plain" color="secondary" size="sm" disabled>
        <HiSelector />
      </IconButton>
    </>
  );
};

export default OnFieldPlayerStatsSkeleton;
