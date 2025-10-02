import Box from "@mui/joy/Box";
import CreateTournamentCard from "../../components/cards/CreateTournamentCard";
import CreatedTournaments from "../../components/tournament/CreatedTournaments";
import FeaturedTournaments from "../../components/tournament/FeaturedTournaments";
import JoinATournament from "../../components/cards/JoinATournament";
import JoinedTournaments from "../../components/tournament/JoinedTournaments";
import PageContainer from "../../components/layouts/pages/PageContainer";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/joy/styles";

const Tournaments = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { _id } = useSelector((state) => state.user.user);
  const joinedTournaments = useSelector(
    (state) => state.tournaments.joinedTournaments
  );
  const createdTournaments = useSelector(
    (state) => state.tournaments.createdTournaments
  );

  return (
    <>
      <PageContainer customStyles={{ gap: 2, mb: 4 }}>
        <JoinedTournaments userId={_id} />
        <FeaturedTournaments />
        <CreatedTournaments userId={_id} />
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 4,
            mt: 6,
            mb: 4,
          }}>
          {joinedTournaments.length !== 0 && <JoinATournament />}
          {createdTournaments.length !== 0 && <CreateTournamentCard />}
        </Box>
      </PageContainer>
    </>
  );
};

export default Tournaments;
