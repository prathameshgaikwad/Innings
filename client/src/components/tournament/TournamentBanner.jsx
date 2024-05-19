/* eslint-disable react/prop-types */

import {
  AspectRatio,
  Card,
  CardCover,
  CardOverflow,
  Link,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/joy";

import CustomToast from "../notifications/toasts/CustomToast";
import JoinTournamentButton from "../buttons/JoinTournamentButton";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdOutlineBuildCircle } from "react-icons/md";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";

const TournamentBanner = ({
  id,
  isAdmin,
  name,
  isSetupComplete,
  bannerURL,
  isLoading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const user_id = useSelector((state) => state.user.user._id);
  const token = useSelector((state) => state.user.token);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isLoading && isOpen && (
        <CustomToast
          color={"success"}
          content={`You've joined, ${name} !`}
          duration={3000}
        />
      )}
      <Card
        variant="plain"
        sx={{
          width: "100%",
          borderRadius: 0,
        }}>
        <CardOverflow>
          <AspectRatio ratio={isMobile ? 3 : 4}>
            {isLoading ? (
              <Skeleton animation="wave" />
            ) : (
              <img src={bannerURL} loading="lazy" alt="" />
            )}
          </AspectRatio>
          <CardCover
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.55)",
                backdropFilter: "none",
              },
              transition: "all 0.45s ease-in-out",
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(0,0,0,0.44)",
            }}>
            <Link
              href={isSetupComplete ? `/tournaments/${id}` : undefined}
              sx={{
                "&:hover": {
                  textDecoration: "none",
                },
              }}>
              <Typography
                level={isMobile ? "h4" : "h1"}
                sx={{
                  color: "white",
                  textAlign: "center",
                }}>
                {isAdmin && isSetupComplete && (
                  <>
                    <Typography
                      startDecorator={<MdOutlineAdminPanelSettings />}
                      sx={{ color: "lemonchiffon", fontWeight: 400 }}
                      mr={2}>
                      Admin View
                    </Typography>
                    <br />
                  </>
                )}
                {!isSetupComplete && (
                  <>
                    <Typography
                      startDecorator={<MdOutlineBuildCircle fontSize={44} />}
                      sx={{
                        color: theme.palette.warning[300],
                        fontWeight: 600,
                      }}
                      mr={2}>
                      Setup
                    </Typography>
                    <br />
                  </>
                )}
                {name}
              </Typography>
            </Link>
          </CardCover>
          <JoinTournamentButton
            user_id={user_id}
            tournament_id={id}
            token={token}
            setIsOpen={setIsOpen}
            isLoading={isLoading}
          />
        </CardOverflow>
      </Card>
    </>
  );
};

export default TournamentBanner;
