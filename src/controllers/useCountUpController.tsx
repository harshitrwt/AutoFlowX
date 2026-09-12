
import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, start: number = 0, duration = 1500) {
  const [count, setCount] = useState(start);
  const raf = useRef<number>();

  useEffect(() => {
    let startTime: number | null = null;
    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      setCount(Math.floor(start + (target - start) * percent));
      if (percent < 1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }
    raf.current = requestAnimationFrame(animate);
    return () => raf.current && cancelAnimationFrame(raf.current);
    // eslint-disable-next-line
  }, [target, duration]);

  return count;
}
