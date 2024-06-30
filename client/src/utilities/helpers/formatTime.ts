import { format } from "date-fns";

const formatTime = (time: string | Date): string => {
  return format(time, "h:mm a");
};

export default formatTime;
