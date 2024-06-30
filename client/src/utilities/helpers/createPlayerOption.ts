type PlayerOptionProps = {
  _id: string;
  first_name: string;
  last_name: string;
};

export const createPlayerOption = ({
  first_name,
  last_name,
  _id,
}: PlayerOptionProps) => {
  return { label: `${first_name} ${last_name}`.trim(), value: _id };
};
