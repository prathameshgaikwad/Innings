import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  Typography,
} from "@mui/joy";

import CreateTournamentCard from "../cards/CreateTournamentCard";
import JoinATournament from "../cards/JoinATournament";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const NoTournamentsJoined = () => {
  return (
    <Box>
      <Card
        sx={{
          p: 4,
          borderWidth: 2,
          mb: 6,
        }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography
            level="h4"
            startDecorator={<SentimentVeryDissatisfiedIcon color="warning" />}
            sx={{ mb: 4, mt: 2 }}>
            Sorry, no action around at the moment. You can either
          </Typography>
          <JoinATournament />
          <Divider sx={{ my: 2 }}>or</Divider>
          <Button size="lg" color="primary" sx={{ width: "100%" }}>
            <Link
              href="/tournaments"
              sx={{
                color: "white",
                "&:hover": { textDecoration: "none" },
              }}>
              Go to Tournaments
            </Link>
          </Button>
          <Divider sx={{ my: 2 }}>or</Divider>
          <CreateTournamentCard />
        </CardContent>
      </Card>
    </Box>
  );
};

export default NoTournamentsJoined;
