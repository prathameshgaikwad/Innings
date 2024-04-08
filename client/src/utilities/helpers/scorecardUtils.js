export function createBattingData(
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

export function createBowlingData(name, overs, runs, wickets, economy, dots) {
  return { name, overs, runs, wickets, economy, dots };
}

export function createFallOfWicketsData(name, scoreStamp, overStamp) {
  return { name, scoreStamp, overStamp };
}
