import { useRef, useState } from "react";

type LongPressCallback = () => void;

interface LongPressState {
  onMouseDown: () => void;
  onMouseUp: () => void;
}

const useLongPress = (
  callback: LongPressCallback = () => {},
  delay: number = 1000
): LongPressState => {
  const [startLongPress, setStartLongPress] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseDown = (): void => {
    timerRef.current = setTimeout(() => {
      setStartLongPress(true);
      callback();
    }, delay);
  };

  const handleMouseUp = (): void => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (startLongPress) {
      setStartLongPress(false);
    }
  };

  return { onMouseDown: handleMouseDown, onMouseUp: handleMouseUp };
};

export default useLongPress;
