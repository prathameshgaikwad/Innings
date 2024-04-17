/* eslint-disable react/prop-types */

import {
  AspectRatio,
  Box,
  Divider,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/joy";

import { TbHexagonLetterC } from "react-icons/tb";
import { useMediaQuery } from "@mui/material";

const TeamPageHeader = ({
  name,
  isLoading,
  logo_url,
  team_color,
  captain_name,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: "100%",
        mb: isMobile ? 3 : 6,
      }}>
      <AspectRatio
        ratio={1}
        sx={{
          mx: "auto",
          height: 150,
          width: 150,
          borderRadius: "50%",
          border: "4px solid",
          borderColor: "white",
          mb: 4,
        }}>
        {isLoading ? (
          <Skeleton animation="wave" variant="circular" />
        ) : (
          <img src={logo_url}></img>
        )}
      </AspectRatio>
      <Divider
        sx={{
          "--Divider-lineColor": isLoading
            ? theme.palette.neutral[500]
            : team_color,
          "--Divider-thickness": "5px",
        }}>
        {isLoading ? (
          <Skeleton
            animation="wave"
            variant="text"
            level={isMobile ? "h4" : "h3"}
            width={350}
            sx={{ mx: 2 }}
          />
        ) : (
          <Typography
            level={isMobile ? "h4" : "h3"}
            sx={{
              mx: isMobile ? 1 : 2,
            }}>
            {name}
          </Typography>
        )}
      </Divider>
      {isLoading ? (
        <Skeleton
          animation="wave"
          variant="text"
          level="body-lg"
          width={200}
          sx={{ mx: "auto", my: 2 }}
        />
      ) : (
        <Typography
          level="body-lg"
          my={2}
          justifyContent={"center"}
          startDecorator={<TbHexagonLetterC />}>
          {captain_name}
        </Typography>
      )}
    </Box>
  );
};

export default TeamPageHeader;
