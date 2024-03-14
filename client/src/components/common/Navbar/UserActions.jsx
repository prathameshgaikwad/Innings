import { useDispatch, useSelector } from "react-redux";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/joy/Avatar";
import { Box } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import ColorSchemeToggle from "../ColorSchemeToggle";
import Dropdown from "@mui/joy/Dropdown";
import ListDivider from "@mui/joy/ListDivider";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import Typography from "@mui/joy/Typography";
import { clearMatchData } from "../../../state/match/matchSlice";
import { clearMatchManagementData } from "../../../state/match/matchManagement";
import { clearTeamData } from "../../../state/team/teamSlice";
import { clearTournamentPage } from "../../../state/tournament/tournamentPageSlice";
import { clearTournamentSetup } from "../../../state/tournament/tournamentSetupSlice";
import { clearTournamentsData } from "../../../state/tournament/tournamentSlice";
import { setLogout } from "../../../state/user/userSlice";
import { useNavigate } from "react-router-dom";

const UserActions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { firstName, profileImageURL } = useSelector(
    (state) => state.user.user
  );

  const handleUserLogout = () => {
    dispatch(setLogout());
    dispatch(clearTournamentsData());
    dispatch(clearTournamentSetup());
    dispatch(clearTeamData());
    dispatch(clearTournamentPage());
    dispatch(clearMatchData());
    dispatch(clearMatchManagementData());
    navigate("/accounts/sign-in");
  };

  const handleUserStatisticsRequest = () => {
    navigate("/user/statistics");
  };
  return (
    <Box
      sx={{
        display: "inline-flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}>
      <Box sx={{ display: "block" }}>
        <ColorSchemeToggle />
      </Box>
      <Dropdown>
        <MenuButton sx={{ p: 0, border: "none", borderRadius: "50%" }}>
          <Card
            variant="soft"
            orientation="horizontal"
            sx={{
              borderRadius: 50,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              p: 0.8,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.neutral.softHoverBg,
              },
            }}>
            <Avatar size="md" src={profileImageURL}></Avatar>
            <CardContent sx={{ maxWidth: "120px" }}>
              <Typography level="title-md" noWrap>
                {firstName}
              </Typography>
            </CardContent>
            <Box sx={{ display: "inline-flex", alignItems: "center" }}>
              <ArrowDropDownIcon />
            </Box>
          </Card>
        </MenuButton>
        <Menu placement="bottom-end" sx={{ zIndex: 1001 }}>
          <MenuItem
            sx={{ fontSize: "sm" }}
            onClick={() => {
              handleUserStatisticsRequest();
            }}>
            <AccountCircleIcon />
            Profile
          </MenuItem>
          <MenuItem
            sx={{ fontSize: "sm" }}
            onClick={() => {
              handleUserStatisticsRequest();
            }}>
            <ShowChartIcon />
            My Statistics
          </MenuItem>
          <ListDivider />
          <MenuItem
            sx={{ fontSize: "sm" }}
            variant="soft"
            color="danger"
            onClick={() => {
              handleUserLogout();
            }}>
            <LogoutIcon />
            Log out
          </MenuItem>
        </Menu>
      </Dropdown>
    </Box>
  );
};

export default UserActions;
