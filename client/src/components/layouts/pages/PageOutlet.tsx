import Footer from "../../common/Footer";
import Navbar from "../../common/Navbar/Navbar";

type PageOutletProps = {
  children: React.ReactNode;
};

const PageOutlet: React.FC<PageOutletProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default PageOutlet;
