import { format } from "date-fns";

const formatLongDate = (date) => {
  return format(date, "eee, d MMMM yyyy");
};

export default formatLongDate;
