import CustomListItem from "./CustomListItem";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeRounded from "@mui/icons-material/HomeRounded";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useLocation } from "react-router-dom";

const NavListItems = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isTournamentPage = location.pathname.startsWith(`/tournaments`);
  const isStatisticsPage = location.pathname === "/statistics";

  return (
    <>
      <CustomListItem
        title={"Home"}
        link={"/"}
        isSamePage={isHomePage}
        startDecorator={HomeRounded}
      />
      <CustomListItem
        title={"Tournaments"}
        link={"/tournaments"}
        isSamePage={isTournamentPage}
        startDecorator={EmojiEventsIcon}
      />
      <CustomListItem
        title={"Statistics"}
        link={"/statistics"}
        isSamePage={isStatisticsPage}
        startDecorator={ShowChartIcon}
      />
    </>
  );
};

export default NavListItems;
