import { format } from "date-fns";

const formatDate = (date) => {
  const formattedDate = format(new Date(date), "do MMM yyyy");
  return formattedDate;
};

export default formatDate;
