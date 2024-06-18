import CenteredBox from "../pages/CenteredBox";

const SectionWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <CenteredBox customStyles={{ mt: 8 }}>{children}</CenteredBox>;
};

export default SectionWrapper;
