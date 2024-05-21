/* eslint-disable react/prop-types */

import { Typography } from "@mui/joy";

const TableRow = ({ data, dataKeys }) => {
  return (
    <tr>
      {dataKeys.map((key) => (
        <td key={key}>
          <Typography textColor="text.secondary">{data[key]}</Typography>
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
