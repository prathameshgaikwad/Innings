export const getCompletedOvers = (balls_completed) => {
  const overs = Math.floor(balls_completed / 6);
  const balls = balls_completed % 6;
  return `${overs}.${balls}`;
};

export const getCurrentRunRate = ({ total_runs, total_overs_completed }) => {
  return (total_runs / total_overs_completed).toFixed(2);
};

export const getMatchProgress = ({
  balls_completed,
  total_overs,
  current_innings_no = 1,
}) => {
  const oversCompleted = getCompletedOvers(balls_completed);
  const progress = (oversCompleted / total_overs) * 100;
  if (current_innings_no === 1) {
    return (progress / 2).toFixed(2);
  }
  return progress;
};
