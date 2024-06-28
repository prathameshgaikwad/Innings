import {
  Card,
  ColorPaletteProp,
  PaletteRange,
  Typography,
  useTheme,
} from "@mui/joy";

type LogItemProps = {
  item: string;
  type: ColorPaletteProp;
  isSmall?: boolean;
};

const LogItem: React.FC<LogItemProps> = ({ item, type, isSmall }) => {
  const theme = useTheme();

  const getColor = (colorType: LogItemProps["type"]): PaletteRange => {
    switch (colorType) {
      case "success":
        return theme.palette.success;
      case "danger":
        return theme.palette.danger;
      case "warning":
        return theme.palette.warning;
      case "primary":
        return theme.palette.primary;
      case "neutral":
        return theme.palette.primary;
      default:
        return theme.palette.neutral;
    }
  };

  const color = getColor(type);

  return (
    <Card
      size="sm"
      variant="soft"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: "2px solid",
        borderColor: color.softActiveBg,
        backgroundColor: color.outlinedBorder,
        p: isSmall ? 1.3 : 1,
      }}>
      <Typography level={"body-xs"}>{item}</Typography>
    </Card>
  );
};

export default LogItem;
