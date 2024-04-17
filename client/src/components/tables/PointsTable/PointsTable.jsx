import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PointsTableSheet from "./PointsTableSheet";
import SectionHeader from "../../layouts/sections/SectionHeader";
import SectionWrapper from "../../layouts/sections/SectionWrapper";

const PointsTable = () => {
  return (
    <SectionWrapper>
      <SectionHeader title={"Points Table"} startDecorator={LeaderboardIcon} />
      <PointsTableSheet />
    </SectionWrapper>
  );
};

export default PointsTable;
