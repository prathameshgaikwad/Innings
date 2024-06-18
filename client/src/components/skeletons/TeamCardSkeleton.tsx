import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardOverflow,
  Divider,
  Skeleton,
} from "@mui/joy";

const TeamCardSkeleton: React.FC = () => {
  return (
    <Card
      sx={{
        textAlign: "center",
        alignItems: "center",
        "--icon-size": "90px",
      }}>
      <CardOverflow variant="soft">
        <AspectRatio
          variant="outlined"
          ratio="1"
          sx={{
            m: "auto",
            transform: "translateY(50%)",
            borderRadius: "50%",
            width: "var(--icon-size)",
            position: "relative",
          }}>
          <Skeleton variant="circular" animation="wave" />
        </AspectRatio>
      </CardOverflow>
      <Skeleton
        animation="wave"
        variant="text"
        level="title-lg"
        sx={{ mt: "calc(var(--icon-size) / 2)", width: "80%" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.8,
          my: 1,
          width: "50%",
        }}>
        <Skeleton animation="wave" variant="text" level="body-xs" width={100} />
        <Divider orientation="horizontal" />
        <Skeleton animation="wave" variant="text" level="body-xs" width={100} />
      </Box>
      <Button
        variant="solid"
        color="primary"
        size="sm"
        disabled={true}
        sx={{
          width: 200,
          my: 1,
        }}>
        View Team
      </Button>
    </Card>
  );
};

export default TeamCardSkeleton;
