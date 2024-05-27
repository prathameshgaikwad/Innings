/* eslint-disable react/prop-types */

import { Box, Skeleton, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { matchApi } from "../../../services/api";
import { setDidNotBatPlayers } from "../../../state/match/matchManagementSlice";

const DidNotBatSection = ({ matchId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const { didNotBatPlayers } =
    useSelector((state) => state.matchManagement.battingTeam) ?? [];

  useEffect(() => {
    const fetchDidNotBatPlayers = async () => {
      setIsLoading(true);
      const data = await matchApi.getDidNotBatPlayers({ matchId, token })();
      dispatch(setDidNotBatPlayers(data));
      setIsLoading(false);
    };
    fetchDidNotBatPlayers();
  }, [dispatch, matchId, token]);

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        p: 1,
      }}>
      <Typography level="title-sm" color="neutral">
        DID NOT BAT:
      </Typography>
      {isLoading ? (
        <Skeleton variant="text" />
      ) : (
        <Box sx={{ display: "inline-flex" }}>
          {didNotBatPlayers.map((item, i) => {
            return (
              <Typography
                key={i}
                level="body-sm"
                color="neutral"
                sx={{ mx: 1 }}>
                {item}
                {i < didNotBatPlayers.length - 1 ? "," : ""}
              </Typography>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
export default DidNotBatSection;
