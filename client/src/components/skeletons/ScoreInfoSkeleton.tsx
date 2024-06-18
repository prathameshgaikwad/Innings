import {
  Box,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Skeleton,
  Stack,
} from "@mui/joy";

const ScoreInfoSkeleton: React.FC = () => {
  return (
    <Box>
      <Card sx={{ width: 320 }} variant="outlined">
        <CardContent
          orientation="horizontal"
          sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Skeleton animation="wave" variant="text" level="h2" width="30%" />
          <Skeleton animation="wave" variant="text" level="h2" width="43%" />
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
          <Divider inset="context" />
          <CardContent
            orientation="horizontal"
            sx={{ justifyContent: "space-between" }}>
            <Skeleton
              animation="wave"
              variant="text"
              level="body-xs"
              width="30%"
            />
            <Skeleton
              animation="wave"
              variant="text"
              level="body-xs"
              width="43%"
            />
          </CardContent>
        </CardOverflow>
      </Card>
      <Stack direction="row" px={2} justifyContent="space-between" mt={2}>
        <Skeleton animation="wave" variant="text" level="body-xs" width="30%" />
        <Skeleton animation="wave" variant="text" level="body-xs" width="66%" />
      </Stack>
    </Box>
  );
};

export default ScoreInfoSkeleton;
