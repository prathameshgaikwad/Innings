import { Typography } from "@mui/joy";

const BallLogListFallback = () => {
  return (
    <Typography
      height={61.2}
      level={"body-xs"}
      sx={{ display: "flex", alignItems: "center" }}>
      Bowling data will appear here once the game has been played.
    </Typography>
  );
};

export default BallLogListFallback;
