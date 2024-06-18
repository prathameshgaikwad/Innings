import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Skeleton,
} from "@mui/joy";

const TournamentCardSkeleton: React.FC = () => {
  return (
    <Card
      variant="soft"
      sx={{
        width: "300px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      }}>
      <CardOverflow>
        <AspectRatio ratio="2.5">
          <Skeleton animation="wave" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Skeleton animation="wave" variant="text" level="title-lg" />
        <Skeleton animation="wave" variant="text" level="body-sm" width="60%" />
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Skeleton animation="wave" variant="text" level="body-xs" />
          <Divider orientation="vertical" />
          <Skeleton animation="wave" variant="text" level="body-xs" />
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

export default TournamentCardSkeleton;
