import { CardContent, Divider, Typography } from "@mui/joy";

const TopBar: React.FC<{ matchNo: string }> = ({ matchNo }) => {
  return (
    <>
      <CardContent>
        <Typography level={"title-sm"}>Match {matchNo}</Typography>
      </CardContent>
      <Divider inset="context" />
    </>
  );
};

export default TopBar;
