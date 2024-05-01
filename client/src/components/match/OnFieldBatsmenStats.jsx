/* eslint-disable react/prop-types */

import {
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/joy";
import {
  setOffStrikeBatsman,
  setOnStrikeBatsman,
} from "../../state/match/matchManagementSlice";

import { HiSelector } from "react-icons/hi";
import OnFieldBatsmenStatsSkeleton from "../skeletons/OnFieldBatsmenStatsSkeleton";
import SelectPlayer from "../matchManagement/SelectPlayer";
import SimpleTextFallback from "../fallbacks/SimpleTextFallback";
import { useSelector } from "react-redux";

const OnFieldBatsmenStats = ({ isSmall, data, isLoading, isAdmin = false }) => {
  const { onStrikeBatsman, offStrikeBatsman } = data;
  const { battingTeam } = useSelector((state) => state.matchManagement);

  const noOnStrikeBatsman =
    !onStrikeBatsman.name || onStrikeBatsman.name.length === 0;

  const noOffStrikeBatsman =
    !offStrikeBatsman.name || offStrikeBatsman.name.length === 0;

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";

  const handlePlayerChange = () => {
    alert("Requesting player change");
  };

  return (
    <Card
      variant="outlined"
      size="lg"
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        minHeight: 56,
        py: 0,
      }}>
      {isLoading ? (
        <OnFieldBatsmenStatsSkeleton isSmall={isSmall} />
      ) : (
        <>
          {data && (
            <>
              {noOnStrikeBatsman ? (
                isAdmin ? (
                  <SelectPlayer
                    playerType={"On-Strike Batsman"}
                    players={battingTeam.players}
                    dispatchTarget={setOnStrikeBatsman}
                    disabled={isLoading}
                  />
                ) : (
                  <SimpleTextFallback
                    content={"On-Strike batsman data will appear here."}
                  />
                )
              ) : (
                <Stack
                  direction={"row"}
                  width={"60%"}
                  alignItems={"center"}
                  justifyContent={"space-between"}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <img
                      width={20}
                      src={`/assets/batsman_icon_${
                        isDarkTheme ? "light" : "dark"
                      }.svg`}
                    />
                    <Typography level={isSmall ? "title-sm" : "title-md"}>
                      {onStrikeBatsman.name} - {onStrikeBatsman.runs || 0} (
                      {onStrikeBatsman.ballsPlayed || 0})
                    </Typography>
                  </Stack>
                  <IconButton
                    color="neutral"
                    size="sm"
                    onClick={() => handlePlayerChange()}>
                    <HiSelector />
                  </IconButton>
                </Stack>
              )}
              <Divider orientation="vertical" sx={{ marginRight: 2 }} />
              <>
                {noOffStrikeBatsman ? (
                  isAdmin ? (
                    <SelectPlayer
                      playerType={"Off-Strike Batsman"}
                      players={battingTeam.players}
                      dispatchTarget={setOffStrikeBatsman}
                      disabled={isLoading}
                    />
                  ) : (
                    <SimpleTextFallback
                      content={"Off-Strike batsman data will appear here."}
                    />
                  )
                ) : (
                  <Stack
                    direction={"row"}
                    spacing={1}
                    width={"40%"}
                    alignItems={"center"}
                    justifyContent={"space-between"}>
                    <Typography level={isSmall ? "body-xs" : "body-sm"}>
                      {offStrikeBatsman.name} - {offStrikeBatsman.runs || 0} (
                      {offStrikeBatsman.ballsPlayed || 0})
                    </Typography>
                    <IconButton
                      color="neutral"
                      size="sm"
                      sx={{ marginLeft: 5 }}
                      onClick={() => handlePlayerChange()}>
                      <HiSelector />
                    </IconButton>
                  </Stack>
                )}
              </>
            </>
          )}
        </>
      )}
    </Card>
  );
};

export default OnFieldBatsmenStats;
