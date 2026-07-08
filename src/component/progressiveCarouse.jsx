import { AnimatePresence, motion } from "motion/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import "../style/progressiveCarouse.css";


const ProgressSliderContext = createContext(undefined);

export const useProgressSliderContext = () => {
  const context = useContext(ProgressSliderContext);

  if (!context) {
    throw new Error(
      "useProgressSliderContext must be used within a ProgressSlider"
    );
  }

  return context;
};

export const ProgressSlider = ({
  children,
  duration = 5000,
  fastDuration = 400,
  vertical = false,
  activeSlider,
  className = "",
}) => {
  const [active, setActive] = useState(activeSlider);
  const [progress, setProgress] = useState(0);
  const [isFastForward, setIsFastForward] = useState(false);

  const frame = useRef(0);
  const firstFrameTime = useRef(performance.now());
  const targetValue = useRef(null);

  const [sliderValues, setSliderValues] = useState([]);

  useEffect(() => {
    const sliderContent = React.Children.toArray(children).find(
      (child) => child.type === SliderContent
    );

    if (sliderContent) {
      const values = React.Children.toArray(
        sliderContent.props.children
      ).map((child) => child.props.value);

      setSliderValues(values);

      setActive((current) =>
        current === undefined || current === null ? values[0] : current
      );
    }
  }, [children]);

  useEffect(() => {
    if (sliderValues.length > 0) {
      firstFrameTime.current = performance.now();
      frame.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(frame.current);
  }, [sliderValues, active, isFastForward]);

  const animate = (now) => {
    const currentDuration = isFastForward ? fastDuration : duration;
    const elapsed = now - firstFrameTime.current;
    const fraction = elapsed / currentDuration;

    if (fraction <= 1) {
      setProgress(
        isFastForward
          ? progress + (100 - progress) * fraction
          : fraction * 100
      );

      frame.current = requestAnimationFrame(animate);
    } else {
      if (isFastForward) {
        setIsFastForward(false);

        if (targetValue.current !== null) {
          setActive(targetValue.current);
          targetValue.current = null;
        }
      } else {
        const currentIndex = sliderValues.indexOf(active);
        const nextIndex = (currentIndex + 1) % sliderValues.length;

        setActive(sliderValues[nextIndex]);
      }

      setProgress(0);
      firstFrameTime.current = performance.now();
    }
  };

  const handleButtonClick = (value) => {
    if (value !== active) {
      const elapsed = performance.now() - firstFrameTime.current;

      setProgress((elapsed / duration) * 100);

      targetValue.current = value;
      setIsFastForward(true);
      firstFrameTime.current = performance.now();
    }
  };

  return (
    <ProgressSliderContext.Provider
      value={{ active, progress, handleButtonClick, vertical }}
    >
      <div className={`progress-slider ${className}`}>
        {children}
      </div>
    </ProgressSliderContext.Provider>
  );
};

export const SliderContent = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};

export const SliderWrapper = ({ children, value, className = "" }) => {
  const { active } = useProgressSliderContext();

  return (
    <AnimatePresence mode="popLayout">
      {active === value && (
        <motion.div
          key={value}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SliderBtnGroup = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};

export const SliderBtn = ({
  children,
  value,
  className = "",
  progressBarClass = "",
}) => {
  const { active, progress, handleButtonClick, vertical } =
    useProgressSliderContext();

  return (
    <button
      className={`slider-btn ${
        active === value ? "slider-btn-active" : "slider-btn-inactive"
      } ${className}`}
      onClick={() => handleButtonClick(value)}
    >
      {children}

      <div
        className="slider-progress-container"
        role="progressbar"
        aria-valuenow={active === value ? progress : 0}
      >
        <span
          className={`slider-progress ${progressBarClass}`}
          style={{
            [vertical ? "height" : "width"]:
              active === value ? `${progress}%` : "0%",
          }}
        />
      </div>
    </button>
  );
};