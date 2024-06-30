type BattingData = {
  sr_no: number;
  name: string;
  wicket: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
};

type BowlingData = {
  name: string;
  overs: number;
  runs: number;
  wickets: number;
  economy: number;
  dots: number;
};

type FallOfWicketsData = {
  name: string;
  scoreStamp: number;
  overStamp: number;
};

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
