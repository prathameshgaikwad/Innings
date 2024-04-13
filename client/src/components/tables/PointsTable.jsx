import { Sheet, Table, useTheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import NoData from "../fallbacks/NoData";
import RectangularSkeleton from "../skeletons/RectangularSkeleton";
import SectionHeader from "../SectionHeader";
import SectionWrapper from "../SectionWrapper";
import TableHeader from "../TableHeader";
import { tournamentPageApi } from "../../services/api";
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
    dispatch(
      tournamentPageApi.getPointsTable({ tournamentId, token, setIsLoading })
    );
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

  const regularTableHeaders = [
    "POS",
    "TEAM",
    "MATCHES",
    "WON",
    "LOST",
    "DRAW",
    "POINTS",
    "NRR",
  ];
  const mobileTableHeaders = ["P", "TEAM", "M", "W", "L", "D", "PTS", "NRR"];

  const tableHeaders = isMobile ? mobileTableHeaders : regularTableHeaders;

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
              <TableHeader headers={tableHeaders} />
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
  return (
    <SectionWrapper>
      <SectionHeader title={"Points Table"} startDecorator={LeaderboardIcon} />
      <PointsTableSheet />
    </SectionWrapper>
  );
};

export default PointsTable;
