import { Card, Typography } from "@mui/joy";

const NoCompletedMatches = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderWidth: 2,
        borderStyle: "dashed",
      }}>
      <Typography sx={{ m: "auto", p: 1 }}>
        Click on &quot;Start Match&quot; to begin scoring a match
      </Typography>
    </Card>
  );
};

export default NoCompletedMatches;
