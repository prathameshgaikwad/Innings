import {
  Card,
  CardContent,
  CardOverflow,
  Typography,
  useTheme,
} from "@mui/joy";

import { FaAward } from "react-icons/fa";
import { useMediaQuery } from "@mui/material";

const playerName = "Devon Conway";
const teamName = "Chennai Super Kings";

const ManOfTheMatchCard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDataAvailable = playerName.length > 0;
  return (
    <Card
      size="lg"
      variant="plain"
      orientation="horizontal"
      sx={{
        textAlign: "center",
        maxWidth: "100%",
        minWidth: isMobile ? 350 : 500,
        overflow: "auto",
        mx: 2,
        mt: 4,
      }}>
      <CardOverflow
        variant="solid"
        color={isDataAvailable ? "primary" : "neutral"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: isMobile ? 1.5 : "var(--Card-padding)",
        }}>
        <FaAward size={isMobile ? 36 : 48} />
        <Typography
          level={isMobile ? "title-sm" : "title-md"}
          textColor="primary.200"
          mt={2}>
          Man of the Match
        </Typography>
      </CardOverflow>
      <CardContent
        sx={{
          minWidth: 200,
          justifyContent: "space-evenly",
        }}>
        {isDataAvailable ? (
          <>
            <Typography level="h3">{playerName}</Typography>
            <Typography level="body-sm">{teamName}</Typography>
          </>
        ) : (
          <>
            <Typography level="h4" color="neutral">
              Doing the Math ...
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ManOfTheMatchCard;
