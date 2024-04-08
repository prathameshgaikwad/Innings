import { Divider, Typography } from "@mui/joy";

import { BiSolidCricketBall } from "react-icons/bi";

const BowlingHeader = () => {
  return (
    <Divider sx={{ mt: 2 }}>
      <Typography
        level="h3"
        color="warning"
        startDecorator={<BiSolidCricketBall />}
        sx={{ my: "auto", mx: 1 }}>
        Bowling
      </Typography>
    </Divider>
  );
};

export default BowlingHeader;
