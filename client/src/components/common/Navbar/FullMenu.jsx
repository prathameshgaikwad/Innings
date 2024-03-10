import { List, Stack } from "@mui/joy";

import LogoBox from "./LogoBox";
import NavListItems from "./NavListItems";
import UserActions from "./UserActions";

const FullMenu = () => {
  return (
    <Stack
      sx={{ width: "100%", height: "100%" }}
      direction="row"
      justifyContent="space-between">
      <LogoBox />
      <List
        role="menubar"
        orientation="horizontal"
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}>
        <NavListItems />
      </List>
      <UserActions />
    </Stack>
  );
};

export default FullMenu;
