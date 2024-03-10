/* eslint-disable react/prop-types */

import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const LinkedConfirmButton = ({ redirectLink, setOpen }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    setOpen(false);
    navigate(redirectLink);
  };

  return (
    <Button variant="solid" color="success" onClick={() => handleConfirm()}>
      Yes, I&apos;m Sure
    </Button>
  );
};

export default LinkedConfirmButton;
