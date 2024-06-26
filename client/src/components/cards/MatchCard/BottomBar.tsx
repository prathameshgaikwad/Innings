import {
  CardContent,
  Divider,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/joy";

type BottomBarProps = {
  overs: number;
  venue: string;
  progress: number;
};

const BottomBar: React.FC<BottomBarProps> = ({ overs, venue, progress }) => {
  return (
    <>
      <Divider inset="context" />
      <CardContent orientation="horizontal">
        <Typography level="body-xs" textColor="text.secondary">
          {overs} Overs
        </Typography>
        <Divider orientation="vertical" />
        <Typography
          level="body-xs"
          textColor="text.secondary"
          noWrap
          sx={{ maxWidth: 150 }}>
          {venue}
        </Typography>
        <Divider orientation="vertical" />
        <Typography level="body-xs" textColor="text.secondary">
          Match progress:
        </Typography>
        <Tooltip
          color="neutral"
          variant="outlined"
          placement="top"
          arrow
          title={`${progress}%`}>
          <LinearProgress
            variant="soft"
            determinate
            color="success"
            value={progress}
          />
        </Tooltip>
      </CardContent>
    </>
  );
};

export default BottomBar;
