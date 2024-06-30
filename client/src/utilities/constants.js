import { createBattingData, createBowlingData } from "./helpers/scorecardUtils";

export const BACKGROUND_ART_LIGHT_URL =
  "https://images.unsplash.com/photo-1629285483773-6b5cde2171d7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const BACKGROUND_ART_DARK_URL =
  "https://images.unsplash.com/photo-1587385789097-0197a7fbd179?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const CARD_BOX_SHADOW_GLOW_EFFECT =
  "rgba(180,166,91,0.2)  0px 6px 24px 0px, rgba(180,166,91,0.2) 0px 0px 0px 1px";

export const CARD_BOX_SHADOW_SMALL =
  "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px";

export const TOAST_BOX_SHADOW =
  "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px";

export const SAMPLE_SCORECARD_BATTING_DATA_1 = [
  createBattingData({
    sr_no: 1,
    name: "Virat Kohli",
    wicket: "b Akash Singh",
    runs: 6,
    balls: 4,
    fours: 1,
    sixes: 0,
    strikeRate: 150.0,
  }),
  createBattingData({
    sr_no: 2,
    name: "Faf Du Plessis",
    wicket: "c Ms Dhoni b Moeen Ali",
    runs: 62,
    balls: 33,
    fours: 5,
    sixes: 4,
    strikeRate: 187.88,
  }),
  createBattingData({
    sr_no: 3,
    name: "Mahipal Lomror",
    wicket: "c Ruturaj Gaikwad b Tushar Deshpande",
    runs: 0,
    balls: 5,
    fours: 0,
    sixes: 0,
    strikeRate: 0.0,
  }),
  createBattingData({
    sr_no: 4,
    name: "Glenn Maxwell",
    wicket: "c Ms Dhoni b Maheesh Theekshana",
    runs: 76,
    balls: 36,
    fours: 3,
    sixes: 8,
    strikeRate: 211.11,
  }),
  createBattingData({
    sr_no: 5,
    name: "Shahbaaz Ahmed",
    wicket: "c Ruturaj Gaikwad b Matheesha Pathirana",
    runs: 12,
    balls: 10,
    fours: 0,
    sixes: 1,
    strikeRate: 120.0,
  }),
  createBattingData({
    sr_no: 6,
    name: "Dinesh Karthik",
    wicket: "c Maheesh Theekshana b Tushar Deshpande",
    runs: 28,
    balls: 14,
    fours: 3,
    sixes: 1,
    strikeRate: 200.0,
  }),
  createBattingData({
    sr_no: 7,
    name: "Suyash S Prabhudessai",
    wicket: "c Ravindra Jadeja b Matheesha Pathirana",
    runs: 19,
    balls: 11,
    fours: 0,
    sixes: 2,
    strikeRate: 172.73,
  }),
  createBattingData({
    sr_no: 8,
    name: "Wayne Parnell",
    wicket: "c Shivam Dube b Tushar Deshpande",
    runs: 2,
    balls: 5,
    fours: 0,
    sixes: 0,
    strikeRate: 40.0,
  }),
  createBattingData({
    sr_no: 9,
    name: "Wanindu Hasaranga*",
    wicket: "not out",
    runs: 2,
    balls: 2,
    fours: 0,
    sixes: 0,
    strikeRate: 100.0,
  }),
];

export const SAMPLE_SCORECARD_BOWLING_DATA_1 = [
  createBowlingData({
    name: "Mohammad Siraj",
    overs: 4,
    runs: 30,
    wickets: 1,
    economy: 7.5,
    dots: 10,
  }),
  createBowlingData({
    name: "Wayne Parnell",
    overs: 4,
    runs: 48,
    wickets: 1,
    economy: 12,
    dots: 7,
  }),
  createBowlingData({
    name: "Vyshak Vijaykumar",
    overs: 4,
    runs: 62,
    wickets: 1,
    economy: 15.5,
    dots: 3,
  }),
  createBowlingData({
    name: "Glenn Maxwell",
    overs: 2.4,
    runs: 28,
    wickets: 1,
    economy: 10.5,
    dots: 4,
  }),
  createBowlingData({
    name: "Wainindu Hasaranga",
    overs: 2,
    runs: 21,
    wickets: 1,
    economy: 10.5,
    dots: 1,
  }),
  createBowlingData({
    name: "Harshal Patel",
    overs: 3.2,
    runs: 36,
    wickets: 1,
    economy: 10.8,
    dots: 8,
  }),
];
