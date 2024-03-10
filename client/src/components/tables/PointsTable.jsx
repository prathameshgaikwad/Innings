import { Box, Divider, Sheet, Table, Typography, useTheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import NoData from "../NoData";
import RectangularSkeleton from "../skeletons/RectangularSkeleton";
import { fetchPointsTable } from "../../state/tournament/tournamentPageSlice";
import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";

function createData(
  pos,
  name,
  nameShort,
  matches,
  won,
  lost,
  draw,
  points,
  nrr
) {
  return { pos, name, nameShort, matches, won, lost, draw, points, nrr };
}

export const PointsTableSheet = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isLoading, setIsLoading] = useState(true);

  const { tournamentId } = useParams();
  const token = useSelector((state) => state.user.token);
  const pointsTable = useSelector((state) => state.tournamentPage.pointsTable);

  useEffect(() => {
    dispatch(fetchPointsTable({ tournamentId, token, setIsLoading }));
  }, [dispatch, tournamentId, token]);

  const sheetData = pointsTable.map((team, i) =>
    createData(
      i + 1,
      team.name,
      team.nameShort,
      team.performance.matches,
      team.performance.win,
      team.performance.loss,
      team.performance.draw,
      team.performance.points,
      team.performance.nrr.$numberDecimal
    )
  );

  return (
    <>
      {isLoading ? (
        <RectangularSkeleton width="80%" height="200px" />
      ) : (
        <Sheet
          sx={{
            width: isMobile ? "90%" : "80%",
            overflow: "auto",
          }}>
          {pointsTable.length === 0 ? (
            <NoData />
          ) : (
            <Table
              stickyHeader
              variant="outlined"
              sx={{
                td: {
                  color: theme.palette.text.secondary,
                },
                "& thead th:nth-of-type(1)": {
                  width: "7%",
                },
                "& thead th:nth-of-type(2)": {
                  width: isMobile ? "20%" : "35%",
                },
                fontSize: isMobile ? "0.85rem" : "",
              }}>
              <thead>
                <tr>
                  <th>{isMobile ? "P" : "POS"} </th>
                  <th>TEAM </th>
                  <th>{isMobile ? "M" : "MATCHES"}</th>
                  <th>{isMobile ? "W" : "WON"}</th>
                  <th>{isMobile ? "L" : "LOST"}</th>
                  <th>{isMobile ? "D" : "DRAW"}</th>
                  <th>{isMobile ? "PTS" : "POINTS"}</th>
                  <th>NRR</th>
                </tr>
              </thead>
              <tbody>
                {sheetData.map((row) => (
                  <tr key={row.pos}>
                    <td style={{ color: theme.palette.text.primary }}>
                      {row.pos}
                    </td>
                    {isMobile ? <td>{row.nameShort}</td> : <td>{row.name}</td>}
                    <td>{row.matches}</td>
                    <td>{row.won}</td>
                    <td>{row.lost}</td>
                    <td>{row.draw}</td>
                    <td>{row.points}</td>
                    <td>{row.nrr}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Sheet>
      )}
    </>
  );
};

const PointsTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}>
      <Box sx={{ width: "100%", mb: isMobile ? 3 : 6 }}>
        <Divider>
          <Typography
            level={isMobile ? "h4" : "h3"}
            sx={{ mx: 2 }}
            color="success"
            startDecorator={<LeaderboardIcon />}>
            POINTS TABLE
          </Typography>
        </Divider>
      </Box>
      <PointsTableSheet />
    </Box>
  );
};

export default PointsTable;
