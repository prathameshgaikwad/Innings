type MatchProgressProps = {
  balls_completed: number;
  total_overs: number;
  current_innings_no?: number;
};

type RunRateProps = { total_runs: number; total_overs_completed: number };

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
  const oversCompleted = getCompletedOvers(balls_completed);
  const progress = (oversCompleted / total_overs) * 100;
  if (current_innings_no === 1) {
    return parseInt((progress / 2).toFixed(2));
  }
  return parseInt(progress.toString());
};
