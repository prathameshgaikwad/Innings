import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import PageContainer from "../../components/layouts/pages/PageContainer";
import UserStatistics from "../../components/dataDisplay/UserStatistics";

const MyStatistics = () => {
  return (
    <>
      <Navbar />
      <PageContainer customStyles={{ gap: 2, mb: 8 }}>
        <UserStatistics />
      </PageContainer>
      <Footer />
    </>
  );
};

export default MyStatistics;
