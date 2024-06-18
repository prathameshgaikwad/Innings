import {
  Button,
  ButtonProps,
  ColorPaletteProp,
  Typography,
  useTheme,
} from "@mui/joy";

type ActionButtonProps = {
  title: string;
  size: ButtonProps["size"];
  handleOnClick: () => void;
  color: ColorPaletteProp;
};
const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  size,
  handleOnClick,
  color = "primary",
}) => {
  const theme = useTheme();
  return (
    <Button
      color={color}
      variant="solid"
      size={size}
      onClick={() => handleOnClick()}>
      <Typography
        level="title-sm"
        noWrap
        sx={{ color: theme.palette.common.white }}>
        {title}
      </Typography>
    </Button>
  );
};

export default ActionButton;
