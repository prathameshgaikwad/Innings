import PageContainer from "../../components/layouts/pages/PageContainer";

import UserStatistics from "../../components/dataDisplay/UserStatistics";

const MyStatistics = () => {
  return (
    <PageContainer customStyles={{ gap: 2, mb: 8 }}>
        <UserStatistics />
      </PageContainer>
  );
};

export default MyStatistics;
