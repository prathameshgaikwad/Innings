import { Card, Typography } from "@mui/joy";

import { MdSportsCricket } from "react-icons/md";
import { Team } from "../../../../types";
import TeamBadgeHorizontal from "../../../dataDisplay/TeamBadgeHorizontal";

type BattingSummaryProps = {
  total: number;
  team: Team;
};

const BattingSummary: React.FC<BattingSummaryProps> = ({ total, team }) => {
  const ISLOADING = false;

  return (
    <>
      <Typography
        level="h3"
        color="primary"
        sx={{ my: 2 }}
        startDecorator={<MdSportsCricket />}>
        Batting
      </Typography>
      <Card
        variant="soft"
        size="lg"
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          mt: 2,
        }}>
        <TeamBadgeHorizontal team={team} isSmall={true} isLoading={ISLOADING} />
        <Typography level="h4" color="primary">
          {total}
        </Typography>
      </Card>
    </>
  );
};
export default BattingSummary;
