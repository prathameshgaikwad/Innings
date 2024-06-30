type MatchProgressProps = {
  balls_completed: number;
  total_overs: number;
  current_innings_no?: number;
};

type RunRateProps = { total_runs: number; total_overs_completed: number };

const MAX_INNINGS_COUNT = 2;

export const getCompletedOvers = (balls_completed: number): number => {
  const overs = Math.floor(balls_completed / 6);
  const balls = balls_completed % 6;
  return overs + balls / 10;
};

export const getOversFromBallsCompleted = (balls_completed: number): number => {
  const overs = Math.floor(balls_completed / 6);
  return overs;
};
export const getCompletedBallsInOver = (balls_completed: number): number => {
  const balls = balls_completed % 6;
  return balls;
};

export const getCurrentRunRate = ({
  total_runs,
  total_overs_completed,
}: RunRateProps): string => {
  const overs_completed = Math.floor(total_overs_completed);
  const remaining_balls = Math.round(
    (total_overs_completed - overs_completed) * 10
  );
  const actual_overs_completed = overs_completed + remaining_balls / 6;
  const run_rate = total_runs / actual_overs_completed;

  return run_rate.toFixed(2);
};

export const getMatchProgress = ({
  balls_completed,
  total_overs,
  current_innings_no = 1,
}: MatchProgressProps): number => {
  const oversCompletedFromBalls = getCompletedOvers(balls_completed);
  const total_overs_in_match = MAX_INNINGS_COUNT * total_overs;
  const total_overs_completed =
    current_innings_no === 2
      ? total_overs + oversCompletedFromBalls
      : oversCompletedFromBalls;
  const progress = (total_overs_completed / total_overs_in_match) * 100;

  return parseInt(progress.toString());
};
