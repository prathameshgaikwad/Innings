/* eslint-disable react/prop-types */

import { Card, Typography } from "@mui/joy";

const ExtrasSection = ({ extras, extrasDetails }) => {
  return (
    <Card
      variant="soft"
      size="md"
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}>
      <Typography level="title-md" color="danger">
        EXTRAS: {extras}
      </Typography>
      <Typography level="title-md" color="neutral">
        {extrasDetails}
      </Typography>
    </Card>
  );
};

export default ExtrasSection;
