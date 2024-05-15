import {
  createBattingData,
  createBowlingData,
  createFallOfWicketsData,
} from "./helpers/scorecardUtils";

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

export const ON_HOVER_TRANSITION = "all 0.2s ease-in-out";

export const SAMPLE_SCORECARD_BATTING_DATA_1 = [
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

export const SAMPLE_SCORECARD_BOWLING_DATA_1 = [
  createBowlingData("Mohammad Siraj", 4, 30, 1, 7.5, 10),
  createBowlingData("Wayne Parnell", 4, 48, 1, 12, 7),
  createBowlingData("Vyshak Vijaykumar", 4, 62, 1, 15.5, 3),
  createBowlingData("Glenn Maxwell", 2.4, 28, 1, 10.5, 4),
  createBowlingData("Wainindu Hasaranga", 2, 21, 1, 10.5, 1),
  createBowlingData("Harshal Patel", 3.2, 36, 1, 10.8, 8),
];

export const SAMPLE_SCORECARD_BATTING_DATA_2 = [
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

export const SAMPLE_SCORECARD_BOWLING_DATA_2 = [
  createBowlingData("Akash Singh", 3, 35, 1, "11.67", 9),
  createBowlingData("Tushar Deshpande", 4, 45, 3, "11.25", 9),
  createBowlingData("Maheesh Theekshana", 4, 41, 1, "10.25", 4),
  createBowlingData("Ravindra Jadeja", 4, 37, 0, "9.25", 3),
  createBowlingData("Matheesha Pathirana", 4, 42, 2, "10.5", 9),
  createBowlingData("Moeen Ali", 1, 13, 1, "13", 3),
];

export const SAMPLE_SCORECARD_FALL_OF_WICKETS_DATA_1 = [
  createFallOfWicketsData("Ruturaj Gaikwad", "1-16", "2.2"),
  createFallOfWicketsData("Ajinkya Rahane", "2-90", "9.3"),
  createFallOfWicketsData("Devon Conway", "3-170", "15.4"),
  createFallOfWicketsData("Shivan Dube", "4-178", "16.3"),
  createFallOfWicketsData("Ambati Rayudu", "5-198", "17.4"),
  createFallOfWicketsData("Ravindra Jadeja", "6-225", "19.4"),
];

export const SAMPLE_SCORECARD_FALL_OF_WICKETS_DATA_2 = [
  createFallOfWicketsData("Virat Kohli", "1-6", "0.4"),
  createFallOfWicketsData("Mahipal Lomror", "2-15", "1.6"),
  createFallOfWicketsData("Glenn Maxwell", "3-141", "12.1"),
  createFallOfWicketsData("Faf Du Plessis", "4-159", "13.6"),
  createFallOfWicketsData("Dinesh Karthik", "5-191", "16.5"),
  createFallOfWicketsData("Shahbaz Ahmed", "6-192", "17.1"),
  createFallOfWicketsData("Wayne Parnell", "7-197", "18.1"),
  createFallOfWicketsData("Suyash S Prabhudessai", "8-218", "19.6"),
];
