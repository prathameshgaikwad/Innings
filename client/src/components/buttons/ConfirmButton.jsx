/* eslint-disable react/prop-types */

import { Button } from "@mui/joy";

const ConfirmButton = ({ setOpen, title, useCase }) => {
  const isSwitch = useCase === "Switch";

  const handleSwitch = () => {
    alert("Switching sides");
  };

  return (
    <Button
      variant="solid"
      color="success"
      onClick={() => (isSwitch ? handleSwitch() : setOpen(false))}>
      {title}
    </Button>
  );
};

export default ConfirmButton;
