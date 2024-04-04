import { useEffect, useState } from "react";

const useToastAnimation = (duration) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progressValue, setProgressValue] = useState(100);

  useEffect(() => {
    let animationStart;
    let requestId;

    const startAnimation = (timestamp) => {
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
