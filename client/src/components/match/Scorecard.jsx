/* eslint-disable react/prop-types */

import {
  Box,
  Card,
  Divider,
  Sheet,
  Table,
  Typography,
  useTheme,
} from "@mui/joy";

import { BiSolidCricketBall } from "react-icons/bi";
import FallOfWicketsList from "../lists/FallOfWicketsList";
import { MdSportsCricket } from "react-icons/md";
import ScorecardSkeleton from "../skeletons/ScorecardSkeleton";
import TabsSegmentedControls from "../TabsSegmentedControls";
import TeamBadgeHorizontal from "../cards/TeamBadgeHorizontal";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";

function createBattingData(
  sr_no,
  name,
  wicket,
  runs,
  balls,
  fours,
  sixes,
  strikeRate
) {
  return { sr_no, name, wicket, runs, balls, fours, sixes, strikeRate };
}

function createBowlingData(name, overs, runs, wickets, economy, dots) {
  return { name, overs, runs, wickets, economy, dots };
}

function createFallOfWicketsData(name, scoreStamp, overStamp) {
  return { name, scoreStamp, overStamp };
}

const battingData1 = [
  createBattingData(
    1,
    "Ruturaj Gaikwad",
    "c Wayne Parnell b Mohammed Siraj",
    3,
    6,
    0,
    0,
    "50.00"
  ),
  createBattingData(
    2,
    "Devon Conway",
    "b Harshal Patel",
    83,
    45,
    6,
    6,
    "184.44"
  ),
  createBattingData(
    3,
    "Ajinkya Rahane",
    "b Wanindu Hasaranga",
    37,
    20,
    3,
    2,
    "185.00"
  ),
  createBattingData(
    4,
    "Shivam Dube",
    "c Mohammed Siraj b Wayne Parnell",
    52,
    27,
    2,
    5,
    "196.59"
  ),
  createBattingData(
    5,
    "Ambati Rayudu",
    "c Dinesh Karthik b Vyshak Vijaykumar",
    14,
    6,
    1,
    1,
    "233.33"
  ),
  createBattingData(6, "Moeen Ali*", "not out", 19, 9, 0, 2, "211.11"),
  createBattingData(
    7,
    "Ravindra Jadeja",
    "c Suyash S Prabhudessai b Glenn Maxwell",
    10,
    8,
    0,
    1,
    "125.00"
  ),
  createBattingData(8, "MS Dhoni*", "not out", 1, 1, 0, 0, "100.00"),
];

const nonBattingData1 = [
  "Matheesha Pathirana",
  "Maheesh Theekshana",
  "Tushar Deshpande",
  "Akash Singh",
];

const bowlingData1 = [
  createBowlingData("Mohammad Siraj", 4, 30, 1, 7.5, 10),
  createBowlingData("Wayne Parnell", 4, 48, 1, 12, 7),
  createBowlingData("Vyshak Vijaykumar", 4, 62, 1, 15.5, 3),
  createBowlingData("Glenn Maxwell", 2.4, 28, 1, 10.5, 4),
  createBowlingData("Wainindu Hasaranga", 2, 21, 1, 10.5, 1),
  createBowlingData("Harshal Patel", 3.2, 36, 1, 10.8, 8),
];

const battingData2 = [
  createBattingData(1, "Virat Kohli", "b Akash Singh", 6, 4, 1, 0, "150.00"),
  createBattingData(
    2,
    "Faf Du Plessis",
    "c Ms Dhoni b Moeen Ali",
    62,
    33,
    5,
    4,
    "187.88"
  ),
  createBattingData(
    3,
    "Mahipal Lomror",
    "c Ruturaj Gaikwad b Tushar Deshpande",
    0,
    5,
    0,
    0,
    "0.00"
  ),
  createBattingData(
    4,
    "Glenn Maxwell",
    "c Ms Dhoni b Maheesh Theekshana",
    76,
    36,
    3,
    8,
    "211.11"
  ),
  createBattingData(
    5,
    "Shahbaaz Ahmed",
    "c Ruturaj Gaikwad b Matheesha Pathirana",
    12,
    10,
    0,
    1,
    "120.00"
  ),
  createBattingData(
    6,
    "Dinesh Karthik",
    "c Maheesh Theekshana b Tushar Deshpande",
    28,
    14,
    3,
    1,
    "200.00"
  ),
  createBattingData(
    7,
    "Suyash S Prabhudessai",
    "c Ravindra Jadeja b Matheesha Pathirana",
    19,
    11,
    0,
    2,
    "172.73"
  ),
  createBattingData(
    8,
    "Wayne Parnell",
    "c Shivam Dube b Tushar Deshpande",
    2,
    5,
    0,
    0,
    "40.00"
  ),
  createBattingData(9, "Wanindu Hasaranga*", "not out", 2, 2, 0, 0, "100.00"),
];

const nonBattingData2 = [
  "Harshal Patel",
  "Vyshak Vijaykumar",
  "Mohammed Siraj",
];

const bowlingData2 = [
  createBowlingData("Akash Singh", 3, 35, 1, "11.67", 9),
  createBowlingData("Tushar Deshpande", 4, 45, 3, "11.25", 9),
  createBowlingData("Maheesh Theekshana", 4, 41, 1, "10.25", 4),
  createBowlingData("Ravindra Jadeja", 4, 37, 0, "9.25", 3),
  createBowlingData("Matheesha Pathirana", 4, 42, 2, "10.5", 9),
  createBowlingData("Moeen Ali", 1, 13, 1, "13", 3),
];

const fallOfWicketsData1 = [
  createFallOfWicketsData("Ruturaj Gaikwad", "1-16", "2.2"),
  createFallOfWicketsData("Ajinkya Rahane", "2-90", "9.3"),
  createFallOfWicketsData("Devon Conway", "3-170", "15.4"),
  createFallOfWicketsData("Shivan Dube", "4-178", "16.3"),
  createFallOfWicketsData("Ambati Rayudu", "5-198", "17.4"),
  createFallOfWicketsData("Ravindra Jadeja", "6-225", "19.4"),
];

const fallOfWicketsData2 = [
  createFallOfWicketsData("Virat Kohli", "1-6", "0.4"),
  createFallOfWicketsData("Mahipal Lomror", "2-15", "1.6"),
  createFallOfWicketsData("Glenn Maxwell", "3-141", "12.1"),
  createFallOfWicketsData("Faf Du Plessis", "4-159", "13.6"),
  createFallOfWicketsData("Dinesh Karthik", "5-191", "16.5"),
  createFallOfWicketsData("Shahbaz Ahmed", "6-192", "17.1"),
  createFallOfWicketsData("Wayne Parnell", "7-197", "18.1"),
  createFallOfWicketsData("Suyash S Prabhudessai", "8-218", "19.6"),
];

const Scorecard = ({ isAdmin, isLoading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [index, setIndex] = useState(0);

  const team1 = useSelector((state) =>
    isAdmin ? state.matchManagement.team1 : state.match.team1
  );
  const team2 = useSelector((state) =>
    isAdmin ? state.matchManagement.team2 : state.match.team2
  );

  const total1 = "226/6";
  const total2 = "218/8";

  const extras1 = "7";
  const extras2 = "11";

  const extrasDetails1 = "( nb 2, w 4, b 0, lb 1 )";
  const extrasDetails2 = "( nb 0, w 6, b 0, lb 5 )";

  const team = index === 0 ? team1 : team2;
  const total = index === 0 ? total1 : total2;
  const battingData = index === 0 ? battingData1 : battingData2;
  const nonBattingData = index === 0 ? nonBattingData1 : nonBattingData2;
  const extras = index === 0 ? extras1 : extras2;
  const extrasDetails = index === 0 ? extrasDetails1 : extrasDetails2;
  const bowlingData = index === 0 ? bowlingData1 : bowlingData2;
  const fallOfWicketsData =
    index === 0 ? fallOfWicketsData1 : fallOfWicketsData2;

  return (
    <>
      {isLoading ? (
        <ScorecardSkeleton />
      ) : (
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Box sx={{ width: "100%", mb: isMobile ? 3 : 6 }}>
            <Divider>
              <Typography
                level={isMobile ? "h4" : "h3"}
                sx={{ mx: 2 }}
                color="success">
                Scorecard
              </Typography>
            </Divider>
          </Box>
          <TabsSegmentedControls
            setIndex={setIndex}
            index={index}
            team1Name={team1.nameShort}
            team2Name={team2.nameShort}
          />
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 4,
              py: 3,
              px: 6,
            }}>
            <Typography
              level="h3"
              color="warning"
              startDecorator={<MdSportsCricket />}>
              Batting
            </Typography>
            <Card
              variant="soft"
              size="lg"
              sx={{
                display: "inline-flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                mt: 2,
              }}>
              <TeamBadgeHorizontal team={team} isSmall={true} />
              <Typography level="h4" color="primary">
                {total}
              </Typography>
            </Card>
            <Sheet sx={{ width: "94%", overflow: "auto", my: 2 }}>
              <Table
                stickyHeader
                variant="outlined"
                sx={{
                  "& thead th:nth-of-type(1)": {
                    width: "6%",
                  },
                  "& thead th:nth-of-type(2)": {
                    width: "15%",
                  },
                  "& thead th:nth-of-type(3)": {
                    width: isMobile ? "20%" : "35%",
                  },
                  fontSize: isMobile ? "0.85rem" : "",
                }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>WICKET</th>
                    <th>RUNS</th>
                    <th>BALLS</th>
                    <th>4s</th>
                    <th>6s</th>
                    <th>SR</th>
                  </tr>
                </thead>
                <tbody>
                  {battingData.map((row) => (
                    <tr key={row.sr_no}>
                      <td>{row.sr_no}</td>
                      {<td>{row.name}</td>}
                      <td>{row.wicket}</td>
                      <td>{row.runs}</td>
                      <td>{row.balls}</td>
                      <td>{row.fours}</td>
                      <td>{row.sixes}</td>
                      <td>{row.strikeRate}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
            <Card
              variant="soft"
              size="md"
              sx={{
                display: "inline-flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}>
              <Typography level="title-md" color="danger">
                EXTRAS: {extras}
              </Typography>
              <Typography level="title-md" color="neutral">
                {extrasDetails}
              </Typography>
            </Card>
            <Card
              variant="outlined"
              size="md"
              sx={{
                display: "inline-flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                mb: 2,
              }}>
              <Typography level="title-sm" color="neutral">
                DID NOT BAT:
              </Typography>
              <Box sx={{ display: "inline-flex" }}>
                {nonBattingData.map((item, i) => {
                  return (
                    <Typography
                      key={i}
                      level="body-sm"
                      color="neutral"
                      sx={{ mx: 1 }}>
                      {item},
                    </Typography>
                  );
                })}
              </Box>
            </Card>
            <Divider sx={{ mt: 2 }}>
              <Typography
                level="h3"
                color="warning"
                startDecorator={<BiSolidCricketBall />}
                sx={{ my: "auto", mx: 1 }}>
                Bowling
              </Typography>
            </Divider>
            <Sheet sx={{ width: "94%", overflow: "auto", my: 2 }}>
              <Table
                stickyHeader
                variant="outlined"
                sx={{
                  "& thead th:nth-of-type(1)": {
                    width: "36%",
                  },
                  fontSize: isMobile ? "0.85rem" : "",
                }}>
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>OVERS</th>
                    <th>RUNS</th>
                    <th>WICKETS</th>
                    <th>ECON</th>
                    <th>DOTS</th>
                  </tr>
                </thead>
                <tbody>
                  {bowlingData.map((row) => (
                    <tr key={row.name}>
                      {<td>{row.name}</td>}
                      <td>{row.overs}</td>
                      <td>{row.runs}</td>
                      <td>{row.wickets}</td>
                      <td>{row.economy}</td>
                      <td>{row.dots}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
            <FallOfWicketsList data={fallOfWicketsData} />
          </Card>
        </Box>
      )}
    </>
  );
};

export default Scorecard;
