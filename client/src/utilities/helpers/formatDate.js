import { format } from "date-fns";

const formatDate = (date) => {
  const formattedDate = format(new Date(date), "eee, d MMM yy");
  return formattedDate;
};

export default formatDate;
