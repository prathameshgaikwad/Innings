import { useState } from "react";

type useHoverState = {
  isHovered: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
};

const useHover = (): useHoverState => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return { isHovered, handleMouseEnter, handleMouseLeave };
};

export default useHover;
