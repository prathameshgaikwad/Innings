import Box from "@mui/joy/Box";
import FullMenu from "./FullMenu";
import MobileMenu from "./MobileMenu";
import { Theme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";

const Navbar = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  console.log("Rendering Navbar");

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        top: 0,
        px: 4,
        zIndex: 1000,
        backgroundColor: "background.body",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        boxShadow: " 2px 2px 4px rgba(0, 0, 0, 0.1)",
      }}>
      {isMobile ? <MobileMenu /> : <FullMenu />}
    </Box>
  );
};

export default Navbar;
