
import { ChevronsRight } from "lucide-react";
import "../style/events.css";
import { eventData } from "../data/eventsData";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { images } from "../data/images"
import logo from "../assets/logo.png"
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const numParticles = window.innerWidth < 768 ? 30 : 70;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8, 
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
function ImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div
        className="slider-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <div className="slide" key={index}>
            <img className="events-slider-image" src={img} alt="" />
          </div>
        ))}
      </div>
      <div className="event-slider-overlay">
        <img src={logo} alt="" />
        <div className="event-slider-overlay-content">
          <h1>Our Journey Through Events</h1>
          <p>From coding competitions and technical workshops to hackathons, seminars, and networking sessions, TechTrix has organized a diverse range of events designed to inspire innovation and foster learning.</p>
        </div>
      </div>

    </div>
  );
}
export default function Event() {
  return <>
    <ImageSlider />
    <div className="event-card-container">
      <ParticleNetwork />
      {eventData.map((c) => (
        <div key={c.id} className="hover-card">
          <div className="hover-card-image">
            <img
              src={c.poster}
            />
          </div>

          {/* Hover Overlay */}
          <article className="hover-card-overlay">
            <div className="hover-card-content">
              <div>
                <h1>{c.title}</h1>
                <p>{c.para}</p>
              </div>
              <div className="hover-card-details">
                <div className="hover-card-date">
                  <FaCalendarAlt size={25} />
                  <span>{c.date}</span>
                </div>
                <div className="hover-cards-venue">
                  <FaMapMarkerAlt size={25} />
                  <span>{c.venue}</span>
                </div>
              </div>

              <Link to={`/events/${c.slug}`}>
                <button className="learn-btn">
                  Learn More
                  <ChevronsRight size={18} />
                </button></Link>
            </div>
          </article>

          {/* Bottom Info */}
          <article className="hover-card-footer">
            <h1>{c.title}</h1>
            <p>{c.type}</p>
          </article>
        </div>
      ))}
    </div>
  </>
}