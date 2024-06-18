import { Card, Skeleton } from "@mui/joy";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const NextMatchSkeleton: React.FC = () => {
  return (
    <Card
      variant="soft"
      sx={{
        mt: 4,
        height: 48,
        width: 220,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Skeleton variant="text" level="body-sm" animation="wave" />
      <NavigateNextIcon />
      <Skeleton variant="text" level="body-md" animation="wave" />
    </Card>
  );
};

export default NextMatchSkeleton;
