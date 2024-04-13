/* eslint-disable react/prop-types */

import { Typography } from "@mui/joy";

const TableHeader = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header_text, index) => (
          <th key={index}>
            <Typography variant="title2">{header_text}</Typography>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
