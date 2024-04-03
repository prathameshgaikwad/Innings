import { format } from "date-fns";

const formatTime = (time) => {
  return format(time, "h:mm a");
};

export default formatTime;
