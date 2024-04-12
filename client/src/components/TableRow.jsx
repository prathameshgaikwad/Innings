/* eslint-disable react/prop-types */

import { Typography } from "@mui/joy";

const TableRow = ({ data, dataKeys }) => {
  return (
    <tr>
      {data.map((key) => (
        <td key={key}>
          <Typography variant="body2">{data[dataKeys]}</Typography>
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
