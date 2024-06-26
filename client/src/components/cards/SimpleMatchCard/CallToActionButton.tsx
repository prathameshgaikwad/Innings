import ActionButton from "../../buttons/ActionButton";
import LinkedButton from "../../buttons/LinkedButton";
import { useNavigate } from "react-router-dom";

type CallToActionButtonProps = {
  isMatchComplete: boolean;
  matchURL: string;
  title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CallToActionButton: React.FC<CallToActionButtonProps> = ({
  isMatchComplete,
  matchURL,
  title,
  setOpen,
}) => {
  const navigate = useNavigate();

  const handleCallToAction = () => {
    if (title === "Start Match") {
      setOpen(true);
    } else {
      navigate(matchURL);
    }
  };

  return (
    <>
      {isMatchComplete ? (
        <LinkedButton
          color="success"
          size="sm"
          title={"See Details"}
          link={matchURL}
        />
      ) : (
        <>
          {title === "Start Match" ? (
            <ActionButton
              title={"Start Match"}
              size={"sm"}
              handleOnClick={handleCallToAction}
            />
          ) : (
            <LinkedButton link={matchURL} title={"Go to Match"} size={"sm"} />
          )}
        </>
      )}
    </>
  );
};

export default CallToActionButton;
