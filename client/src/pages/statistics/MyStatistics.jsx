import PageContainer from "../../components/layouts/pages/PageContainer";
import PageOutlet from "../../components/layouts/pages/PageOutlet";
import UserStatistics from "../../components/dataDisplay/UserStatistics";

const MyStatistics = () => {
  return (
    <PageOutlet>
      <PageContainer customStyles={{ gap: 2, mb: 8 }}>
        <UserStatistics />
      </PageContainer>
    </PageOutlet>
  );
};

export default MyStatistics;
