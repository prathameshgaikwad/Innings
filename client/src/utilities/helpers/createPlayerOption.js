export const createPlayerOption = ({ first_name, last_name, _id }) => {
  return { label: `${first_name} ${last_name}`.trim(), value: _id };
};
