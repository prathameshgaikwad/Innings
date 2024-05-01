export const getCompletedOvers = (balls_completed) => {
  const overs = Math.floor(balls_completed / 6);
  const balls = balls_completed % 6;
  return `${overs}.${balls}`;
};

export const getCurrentRunRate = ({ total_runs, total_overs_completed }) => {
  return (total_runs / total_overs_completed).toFixed(2);
};
