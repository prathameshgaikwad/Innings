import { format } from "date-fns";

const formatDate = (dateString) => {
  const formattedDate = format(new Date(dateString), "dd MMM yyyy");
  return formattedDate;
};

export default formatDate;
