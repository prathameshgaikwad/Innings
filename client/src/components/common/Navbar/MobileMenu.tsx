import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ModalClose,
  Stack,
} from "@mui/joy";

import LogoBox from "./LogoBox";
import MenuIcon from "@mui/icons-material/Menu";
import NavListItems from "./NavListItems";
import UserActions from "./UserActions";
import { useState } from "react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <Stack
      sx={{ width: "100%", py: 2 }}
      direction="row"
      justifyContent="space-between">
      <IconButton color="neutral" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            m: 3,
          }}>
          <LogoBox />
          <ModalClose
            id="close-icon"
            sx={{ position: "initial", ml: "auto" }}
          />
        </Box>
        <Divider />
        <List
          role="menubar"
          sx={{
            display: "flex",
            mt: 2,
            mx: 2,
          }}>
          <NavListItems />
        </List>
      </Drawer>
      <UserActions />
    </Stack>
  );
};

export default MobileMenu;
