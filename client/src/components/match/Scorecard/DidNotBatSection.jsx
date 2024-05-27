/* eslint-disable react/prop-types */

import { Box, Skeleton, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { matchApi } from "../../../services/api";

const DidNotBatSection = ({ matchId }) => {
  const [didNotBatPlayers, setDidNotBatPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchDidNotBatPlayers = async () => {
      setIsLoading(true);
      const data = await dispatch(
        matchApi.getDidNotBatPlayers({ matchId, token })
      );
      setDidNotBatPlayers(data);
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
