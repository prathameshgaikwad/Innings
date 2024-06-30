const setTimeFromString = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));

  return date;
};

export default setTimeFromString;
