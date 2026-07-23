import "../style/eventpage.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  ProgressSlider,
  SliderBtn,
  SliderBtnGroup,
  SliderContent,
  SliderWrapper,
} from "../component/progressiveCarouse";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { eventData } from "../data/eventsData";
import ScrolltoTop from "../component/GalleryScrolltoTop";

const generateVariants = (direction) => {
  const axis =
    direction === "left" || direction === "right" ? "x" : "y";

  const value =
    direction === "right" || direction === "down" ? 20 : -20;

  return {
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
      [axis]: value,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };
};

const defaultViewport = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -200px 0px",
};

function ScrollAnimation({
  children,
  className = "",
  variants,
  viewport = defaultViewport,
  delay = 0,
  direction = "down",
  as = "div",
  ...props
}) {
  const baseVariants = variants || generateVariants(direction);

  const modifiedVariants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...baseVariants.visible.transition,
        delay,
      },
    },
  };

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={modifiedVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

function Counter({ end }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;

        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;

          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end]);

  return <h2 ref={ref}>{count}+</h2>;
}

function ImageModal({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="image-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.button
            className="image-modal-close"
            onClick={onClose}
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            &times;
          </motion.button>

          <motion.img
            src={image}
            alt=""
            className="image-modal-img"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function EventPage() {
  const { slug } = useParams();
  const event = eventData.find((e) => e.slug === slug);

  const [selectedImage, setSelectedImage] = useState(null);

  if (!event) {
    return <h1>cannot load</h1>;
  }

  return (
    <>
    <ScrolltoTop/>
      <ProgressSlider className="progress-slide" vertical={false}>
        <SliderContent>
          {event.sliderContent.map((item) => (
            <SliderWrapper key={item.sliderName} value={item.sliderName}>
              <img
                src={item.img}
                alt={item.desc}
                loading="lazy"
                className="slider-image"
              />
            </SliderWrapper>
          ))}
        </SliderContent>

        <SliderBtnGroup className="slider-button-group">
          {event.sliderContent.map((item) => (
            <SliderBtn
              key={item.sliderName}
              value={item.sliderName}
              className="slider-button"
              progressBarClass="slider-progress-bar"
            >
              <h2 className="slider-title">{item.title}</h2>

              <p className="slider-description">{item.desc}</p>
            </SliderBtn>
          ))}
        </SliderBtnGroup>
      </ProgressSlider>

      <section className="counter-section">
        <div className="counter-container">
          {event.eventStat.map((item, index) => (
            <div className="counter-card" key={index}>
              <Counter end={item.value} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery-container">
        <div className="galleryHeading">
          <h1
            style={{
              padding: "2rem",
              textAlign: "center",
              fontSize: "4rem",
              color: "white",
            }}
          >
            Gallery
          </h1>
        </div>
        <div className="gallery">
          {event.images.map((img, index) => (
            <ScrollAnimation
              key={index}
              viewport={{
                once: true,
                amount: 0.5,
                margin: "0px 0px 0px 0px",
              }}
            >
              <img
                src={img}
                alt=""
                className="gallery-image"
                onClick={() => setSelectedImage(img)}
              />
            </ScrollAnimation>
          ))}
        </div>
      </section>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}