import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PointsTableSheet from "./PointsTableSheet";
import SectionHeader from "../../SectionHeader";
import SectionWrapper from "../../SectionWrapper";

const PointsTable = () => {
  return (
    <SectionWrapper>
      <SectionHeader title={"Points Table"} startDecorator={LeaderboardIcon} />
      <PointsTableSheet />
    </SectionWrapper>
  );
};

export default PointsTable;
