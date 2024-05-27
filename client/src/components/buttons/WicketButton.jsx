/* eslint-disable react/prop-types */

import { Button, Typography } from "@mui/joy";

import WicketModal from "../notifications/modals/WicketModal";
import { useState } from "react";

const WicketButton = () => {
  const [isWicket, setIsWicket] = useState(false);
  return (
    <>
      <Button
        color="danger"
        variant="solid"
        fullWidth
        sx={{ height: 50 }}
        onClick={() => setIsWicket(true)}>
        <Typography level="title-md" sx={{ color: "white" }}>
          WICKET
        </Typography>
      </Button>
      <WicketModal open={isWicket} setOpen={setIsWicket} />
    </>
  );
};

export default WicketButton;
