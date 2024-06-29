import { Typography } from "@mui/joy";

type TableHeaderProps = {
  headers: string[];
};

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header_text, index) => (
          <th key={index}>
            <Typography textColor={"text.primary"}>{header_text}</Typography>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
