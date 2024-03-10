import CustomListItem from "./CustomListItem";
import { useLocation } from "react-router-dom";

const NavListItems = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isTournamentPage = location.pathname.startsWith(`/tournaments`);
  const isStatisticsPage = location.pathname === "/statistics";

  return (
    <>
      <CustomListItem title={"Home"} link={"/"} pageType={isHomePage} />
      <CustomListItem
        title={"Tournaments"}
        link={"/tournaments"}
        pageType={isTournamentPage}
      />
      <CustomListItem
        title={"Statistics"}
        link={"/statistics"}
        pageType={isStatisticsPage}
      />
    </>
  );
};

export default NavListItems;
