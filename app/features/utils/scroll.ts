// Trackpads and rubber-banding jitter by a few px, so ask for real travel before reading a direction.
const DIRECTION_THRESHOLD = 4;

/** Reads the direction travelled since the last read, or `undefined` while the travel is under the jitter threshold. */
export const createScrollDirection = () => {
  let lastY = window.scrollY;

  return (): "up" | "down" | undefined => {
    const y = window.scrollY;
    if (Math.abs(y - lastY) <= DIRECTION_THRESHOLD) return undefined;
    const direction = y < lastY ? "up" : "down";
    lastY = y;
    return direction;
  };
};

/** Runs `callback` at most once per frame while the window scrolls, and resizes too with `resize`. */
export const onScrollFrame = (callback: () => void, { resize = false } = {}) => {
  let frame = 0;

  const schedule = () => {
    frame ||= requestAnimationFrame(() => {
      frame = 0;
      callback();
    });
  };

  window.addEventListener("scroll", schedule, { passive: true });
  if (resize) window.addEventListener("resize", schedule, { passive: true });

  const stop = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };

  return { schedule, stop };
};
