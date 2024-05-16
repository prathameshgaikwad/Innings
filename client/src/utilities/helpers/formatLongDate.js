import { format } from "date-fns";

const formatLongDate = (date) => {
  return format(date, "eee, do MMMM yyyy");
};

export default formatLongDate;
