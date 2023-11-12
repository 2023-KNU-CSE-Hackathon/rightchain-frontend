import { useEffect, useRef } from "react";

export const ProgressBar = ({ progress }) => {
  const progressBar = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      progressBar.current.style.transform = `scaleX(${progress})`;
    }, 100);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className={styles.progress_bar}>
      <div></div>
      <div ref={progressBar}></div>
    </div>
  );
}