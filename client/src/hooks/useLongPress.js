/* eslint-disable react/prop-types */

import { useRef, useState } from "react";

const useLongPress = (callback = () => {}, delay = 1000) => {
  const [startLongPress, setStartLongPress] = useState(false);
  const timerRef = useRef(null);

  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {
      setStartLongPress(true);
      callback();
    }, delay);
  };

  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
    if (startLongPress) {
      setStartLongPress(false);
    }
  };

  return { onMouseDown: handleMouseDown, onMouseUp: handleMouseUp };
};

export default useLongPress;
