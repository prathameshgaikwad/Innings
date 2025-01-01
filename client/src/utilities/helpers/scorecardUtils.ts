import { BattingData, BowlingData, FallOfWicketsData } from "../../types";

export function createBattingData({
  sr_no,
  name,
  wicket,
  runs,
  balls,
  fours,
  sixes,
  strikeRate,
}: BattingData): BattingData {
  return { sr_no, name, wicket, runs, balls, fours, sixes, strikeRate };
}

export function createBowlingData({
  name,
  overs,
  runs,
  wickets,
  economy,
  dots,
}: BowlingData): BowlingData {
  return { name, overs, runs, wickets, economy, dots };
}

export function createFallOfWicketsData({
  name,
  scoreStamp,
  overStamp,
}: FallOfWicketsData): FallOfWicketsData {
  return { name, scoreStamp, overStamp };
}
