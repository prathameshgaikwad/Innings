/* eslint-disable react/prop-types */

import { Divider } from "@mui/joy";
import OnFieldPlayerStatsSkeleton from "./OnFieldPlayerStatsSkeleton";

const OnFieldBatsmenStatsSkeleton = ({ isSmall }) => {
  return (
    <>
      <OnFieldPlayerStatsSkeleton isSmall={isSmall} />
      <Divider orientation="vertical" />
      <OnFieldPlayerStatsSkeleton isSmall={isSmall} />
    </>
  );
};

export default OnFieldBatsmenStatsSkeleton;
