import { Outlet } from "react-router-dom";
import Footer from "../../common/Footer";
import Navbar from "../../common/Navbar/Navbar";

const PageOutlet = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PageOutlet;