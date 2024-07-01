import { useCallback, useEffect, useState } from "react";

const useTimer = (initialCount: number) => {
  const [counter, setCounter] = useState(initialCount);

  const resetCounter = useCallback(() => {
    setCounter(initialCount);
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () =>
        setCounter(prevCounter => {
          if (prevCounter <= 0) {
            clearInterval(timer);
            return prevCounter;
          }

          return prevCounter - 1;
        }),
      1000,
    );

    return () => clearInterval(timer);
  }, [counter]);

  return {
    counter,
    setCounter,
    resetCounter,
  };
};

export { useTimer };
