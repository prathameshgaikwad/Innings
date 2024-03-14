/* eslint-disable react/prop-types */

import { Alert, Skeleton, Typography } from "@mui/joy";

import { RiCopperCoinLine } from "react-icons/ri";

const TossDetails = ({ tossWinner, choice, isLoading }) => {
  return (
    <Alert
      variant="soft"
      color={isLoading ? "neutral" : "primary"}
      sx={{ mt: 4 }}>
      <RiCopperCoinLine size={24} />
      {isLoading ? (
        <Skeleton animation="wave" variant="text" level="body-md" width={250} />
      ) : (
        <Typography level="body-md">
          {tossWinner} won the toss and chose to {choice}
        </Typography>
      )}
    </Alert>
  );
};

export default TossDetails;
