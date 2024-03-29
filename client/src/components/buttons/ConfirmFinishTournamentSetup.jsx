/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@mui/joy";
import { tournamentSetupApi } from "../../services/api";

const ConfirmFinishTournamentSetup = ({ setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tournamentId } = useParams();
  const token = useSelector((state) => state.user.token);
  const fixtures = useSelector((state) => state.tournamentSetup.fixtures);

  const handleFinishSetup = async () => {
    dispatch(
      tournamentSetupApi.saveFixturesBatchToDb({
        tournamentId,
        token,
        fixtures,
        navigate,
        setOpen,
      })
    );
  };

  return (
    <Button variant="solid" color="success" onClick={() => handleFinishSetup()}>
      Yes, I&apos;m Sure
    </Button>
  );
};

export default ConfirmFinishTournamentSetup;
