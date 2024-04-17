/* eslint-disable react/prop-types */

import CenteredBox from "../pages/CenteredBox";

const SectionWrapper = ({ children }) => {
  return <CenteredBox customStyles={{ mt: 8 }}>{children}</CenteredBox>;
};

export default SectionWrapper;
