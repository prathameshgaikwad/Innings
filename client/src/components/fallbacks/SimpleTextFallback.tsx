import { Typography, TypographyProps } from "@mui/joy";

type SimpleTextFallbackProps = {
  height?: number;
  content: string;
  level?: TypographyProps["level"];
};

const SimpleTextFallback: React.FC<SimpleTextFallbackProps> = ({
  height = 61.2,
  content,
  level = "body-xs",
}) => {
  return (
    <Typography
      height={height}
      level={level}
      sx={{
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        opacity: 0.66,
      }}>
      {content}
    </Typography>
  );
};

export default SimpleTextFallback;
