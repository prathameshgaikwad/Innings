/* eslint-disable react/prop-types */

import {
  AspectRatio,
  Button,
  Card,
  CardCover,
  CardOverflow,
  Link,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomToast from "../cards/CustomToast";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdOutlineBuildCircle } from "react-icons/md";
import { addJoinedTournament } from "../../state/tournament/tournamentSlice";
import { joinTournament } from "../../state/tournament/tournamentPageSlice";
import { useMediaQuery } from "@mui/material";
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
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const user_id = useSelector((state) => state.user.user._id);
  const token = useSelector((state) => state.user.token);

  const joinedTournaments = useSelector(
    (state) => state.tournaments.joinedTournaments
  );

  const createdTournaments = useSelector(
    (state) => state.tournaments.createdTournaments
  );

  let buttonDisplay = !isLoading ? "flex" : "none";

  if (joinedTournaments.includes(id)) buttonDisplay = "none";
  if (createdTournaments.includes(id)) buttonDisplay = "none";

  const [isOpen, setIsOpen] = useState(false);

  const handleJoinTournament = async () => {
    try {
      dispatch(joinTournament({ user_id, token, tournament_id: id }));
      dispatch(addJoinedTournament({ tournament_id: id }));
      setIsOpen(true);

      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

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
          <Button
            sx={{
              height: 90,
              width: 90,
              borderRadius: 50,
              position: "absolute",
              bottom: -45,
              right: 100,
              overflow: "hidden",
              display: buttonDisplay,
              border: "2px solid",
              transition: "all 0.2s ease-in-out",
              zIndex: 20,
              "&:hover": {
                borderWidth: 4,
                backgroundColor: "var(--joy-palette-primary-solidBg)",
                "&:after ": {
                  left: "130%",
                  transition: " all 550ms cubic-bezier(0.19, 1, 0.22, 1)",
                },
              },
              "&:after": {
                background: "#fff",
                content: '""',
                height: "155px",
                left: "-65px",
                opacity: ".2",
                position: "absolute",
                top: "-40px",
                transform: "rotate(35deg)",
                transition: "all 550ms cubic-bezier(0.19, 1, 0.22, 1)",
                width: "50px",
                zIndex: -10,
              },
            }}
            endDecorator={<ArrowForwardIcon />}
            onClick={() => handleJoinTournament()}>
            Join
          </Button>
        </CardOverflow>
      </Card>
    </>
  );
};

export default TournamentBanner;
