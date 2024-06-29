import { useEffect, useState } from "react";

type ToastAnimationState = {
  isVisible: boolean;
  progressValue: number;
};

const useToastAnimation = (duration: number): ToastAnimationState => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [progressValue, setProgressValue] = useState<number>(100);

  useEffect(() => {
    let animationStart: number | undefined;
    let requestId: number;

    const startAnimation = (timestamp: number): void => {
      if (!animationStart) animationStart = timestamp;
      const progress = Math.max(0, 1 - (timestamp - animationStart) / duration);
      setProgressValue(progress);

      if (progress > 0) {
        requestId = requestAnimationFrame(startAnimation);
      } else {
        setIsVisible(false);
      }
    };

    requestId = requestAnimationFrame(startAnimation);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [duration]);

  return { isVisible, progressValue };
};

export default useToastAnimation;
