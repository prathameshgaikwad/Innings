import { Box, Card, CardContent, Divider, Typography } from "@mui/joy";

import CreateTournamentCard from "../cards/CreateTournamentCard";
import JoinATournament from "../cards/JoinATournament";
import LinkedButton from "../buttons/LinkedButton";
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
          <LinkedButton
            title={"Explore Tournaments"}
            link={"/tournaments"}
            size={"lg"}
            customStyles={{ width: "100%" }}
          />
          <Divider sx={{ my: 2 }}>or</Divider>
          <CreateTournamentCard />
        </CardContent>
      </Card>
    </Box>
  );
};

export default NoTournamentsJoined;
