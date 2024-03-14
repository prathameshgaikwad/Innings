/* eslint-disable react/prop-types */

import { Alert, Typography } from "@mui/joy";

import { RiCopperCoinLine } from "react-icons/ri";

const TossDetails = ({ tossWinner, choice }) => {
  return (
    <Alert variant="soft" color="primary" sx={{ mt: 4 }}>
      <RiCopperCoinLine size={24} />
      <Typography level="body-md">
        {tossWinner} won the toss and chose to {choice}
      </Typography>
    </Alert>
  );
};

export default TossDetails;
