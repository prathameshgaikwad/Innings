import CustomListItem from "./CustomListItem";
import { useLocation } from "react-router-dom";

const NavListItems = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isTournamentPage = location.pathname.startsWith(`/tournaments`);
  const isStatisticsPage = location.pathname === "/statistics";

  return (
    <>
      <CustomListItem title={"Home"} link={"/"} isSamePage={isHomePage} />
      <CustomListItem
        title={"Tournaments"}
        link={"/tournaments"}
        isSamePage={isTournamentPage}
      />
      <CustomListItem
        title={"Statistics"}
        link={"/statistics"}
        isSamePage={isStatisticsPage}
      />
    </>
  );
};

export default NavListItems;
