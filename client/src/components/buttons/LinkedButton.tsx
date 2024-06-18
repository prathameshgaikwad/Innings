import {
  Button,
  ButtonProps,
  ColorPaletteProp,
  Link,
  Typography,
  useTheme,
} from "@mui/joy";

type LinkedButtonProps = {
  title: string;
  link: string;
  size: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  color?: ColorPaletteProp;
  startDecorator?: React.ComponentType;
  endDecorator?: React.ComponentType;
  customStyles?: object;
};

const LinkedButton: React.FC<LinkedButtonProps> = ({
  title,
  link,
  size,
  variant = "solid",
  color = "primary",
  startDecorator: StartDecorator,
  endDecorator: EndDecorator,
  customStyles,
}) => {
  const theme = useTheme();
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      sx={{ ...customStyles }}>
      <Link
        href={link}
        overlay
        sx={{
          color: theme.palette.common.white,
          "&:hover": { textDecoration: "none" },
        }}>
        <Typography
          level={`title-${size === "sm" ? "sm" : "md"}`}
          noWrap
          startDecorator={StartDecorator && <StartDecorator />}
          endDecorator={EndDecorator && <EndDecorator />}
          sx={{ color: theme.palette.common.white }}>
          {title}
        </Typography>
      </Link>
    </Button>
  );
};

export default LinkedButton;
