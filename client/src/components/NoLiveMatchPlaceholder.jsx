import { Typography } from "@mui/joy";

const NoLiveMatchPlaceholder = () => {
  return (
    <>
      <img
        src="assets/no_live_match_placeholder.svg"
        alt="No Live Match"
        height={400}
      />
      <Typography level="body-lg">No Matches are live right now!</Typography>
    </>
  );
};

export default NoLiveMatchPlaceholder;
