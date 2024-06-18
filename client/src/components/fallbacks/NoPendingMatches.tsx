import { Card, Typography } from "@mui/joy";

const NoPendingMatches: React.FC = () => {
  return (
    <Card variant="outlined" sx={{ borderWidth: 2, borderStyle: "solid" }}>
      <Typography sx={{ m: "auto", p: 2 }}>
        You&apos;ve completed scoring all the matches
      </Typography>
    </Card>
  );
};

export default NoPendingMatches;
