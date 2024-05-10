/* eslint-disable react/prop-types */

import Container from "./Container";
import { Divider } from "@mui/joy";
import MatchDetails from "./MatchDetails";
import ScorePane from "./ScorePane";

const MainContent = ({ isLoading, socket }) => {
  return (
    <Container>
      <ScorePane isLoading={isLoading} socket={socket} />
      <Divider orientation="vertical" />
      <MatchDetails isLoading={isLoading} />
    </Container>
  );
};

export default MainContent;
