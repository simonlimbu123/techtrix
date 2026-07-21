import { useState, useEffect, useRef, useMemo } from "react";
import { SERVICES } from "../data/services";
import { UpcomingEvents } from "../data/upcomingEvents";
import "../style/home.css";
import logo from "../assets/logo.png";
import { FaLock, FaRegWindowClose, FaExternalLinkAlt, FaLockOpen, FaLightbulb, FaFacebookF, FaInstagram, FaUsers, FaCalendarAlt, FaHandshake, FaMapMarkerAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { recentEvents } from "../data/recentEvents";
import ImageMouseTrail from "../component/ImageMouseTrail";
import { images } from "../data/images"
import { Link } from "react-router-dom";
import getCurrentDate from "../utils/getCurrentDate";
import CountdownButton from "../component/countdownButton";
import DottedSurface from "../component/DottedSurface";
import { ParticleNetwork } from "../component/ParticleNetwork";
import { ImageModal } from "../utils/imageModal";

const COLORS = {
  overlay: 'rgba(12, 16, 32, 0.86)',
  fallbackBg: '#11162a',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.55)',
  line: 'rgba(255, 255, 255, 0.25)',
  dotRing: 'rgba(216, 216, 216, 0.58)',
  dotFill: 'rgb(255, 255, 255)',
};

const NAV_SECTIONS = [
  { id: "home", label: "We are", boldLabel: "TechTrix" },
  { id: "what-we-do", label: "What", boldLabel: "We Do" },
  { id: "events", label: "coming", boldLabel: "Events" },
  { id: "team", label: "TechTrix", boldLabel: "Gallery" },
  { id: "contact", label: "How to", boldLabel: "Get In Touch" },
];

const MAP_QUERY = 'Mid-Baneshwor, Kathmandu, Nepal';
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`;

export default function TechTrixNepal() {
  const phone = '01-4620522';
  const email = 'techtrixnepal@newsummit.edu.np';
  const address = 'Shantinagar, Kathmandu, Nepal';
  const onSubscribe = "";
  const [subscribeEmail, setSubscribeEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (onSubscribe) onSubscribe(subscribeEmail);
    setSubscribeEmail('');
  };

  const [activeSection, setActiveSection] = useState(0);
  const [productsOpen, setProductsOpen] = useState(false);
  const containerRef = useRef(null);

  const goTo = (idx) => {
    const container = containerRef.current;
    if (!container) return;

    const sectionHeight = container.clientHeight;
    container.scrollTo({
      top: idx * sectionHeight,
      behavior: "smooth",
    });
    setActiveSection(idx);
  };

  useEffect(() => {
    if (activeSection != 0) {
      setProductsOpen(false)
    }
  }, [activeSection])

  const orbitRef = useRef(null)
  useEffect(() => {
    const handleOutside = (event) => {
      if (orbitRef.current && !orbitRef.current.contains(event.target)) {
        setProductsOpen(false)
      }
    }
    if (setProductsOpen) {
      document.addEventListener("mousedown", handleOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutside)
    }
  }, [setProductsOpen])

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const h = container.clientHeight;
      const index = Math.round(scrollTop / h);
      setActiveSection(Math.max(0, Math.min(index, NAV_SECTIONS.length - 1)));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="main-wrapper">
      {/* Logo */}
      <div className="nav-logo">
        <img onClick={() => goTo(0)} width={120} src={logo} alt="Logo" />
      </div>

      <div className="connect-btn">
        <p className="connect-btn-p">CONNECT</p>
        <div className="connect-line"></div>
        <div className="connect-social">
          <div>
            <a target="_blank" style={{ textDecoration: "none" }} href="https://www.facebook.com/techtrixnepal/"><FaFacebookF color="white" size={15} /></a>
          </div>
          <div>
            <a target="_blank" style={{ textDecoration: "none" }} href="https://www.instagram.com/techtrixnepal/"><FaInstagram color="white" size={15} /></a>
          </div>
        </div>
      </div>

      <div className="side-nav">
        {NAV_SECTIONS.map((section, i) => {
          const isActive = i === activeSection;
          return (
            <div key={section.id} onClick={() => goTo(i)} className="nav-item">
              <div
                className={`nav-line ${isActive ? "active" : ""}`}
                style={{
                  width: isActive ? "90px" : "30px",
                  background: isActive ? "rgba(255,255,255,0.95)" : "rgb(255, 255, 255)",
                }}
              />
              <div
                className={`nav-label ${isActive ? "active" : ""}`}
                style={{
                  maxHeight: isActive ? "70px" : "0px",
                  opacity: isActive ? 1 : 0,
                  marginTop: isActive ? "5px" : "0px",
                }}
              >
                {section.label} <br />
                <span style={{ fontWeight: 800 }}>{section.boldLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div ref={containerRef} className="section-container">

        {/* SECTION 0: HOME  */}
        <div className={`section home-section ${activeSection === 0 ? "active" : ""}`}>
          <ParticleNetwork />
          <div className="home-content">
            <div className="home-text">
              <h2 className="main-heading">
                <span className="heading-outline">SEEDING</span><br />
                <span className="heading-solid">INOVATIVE IDEAS</span>
              </h2>
              <div className="typing-container">
                We are{" "}
                <span className="word-wrapper">
                  <span className="word word1">Partner in your digital Transformation</span>
                  <span className="word word2">TechTrix Nepal</span>
                  <span className="word word3">Programmers</span>
                </span>
              </div>
              <div className="home-button">
                <button className="animated-button">
                  <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                  <span className="text">Join Techtrix</span>
                  <span className="circle"></span>
                  <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div ref={orbitRef} className="product-orbit-wrapper">
              <ProductOrbit open={productsOpen} onToggle={() => setProductsOpen(v => !v)} />
              <div className={productsOpen ? "orbit-para-open" : "orbit-para-close"}>
                <p style={{ fontWeight: "700", opacity: ".7" }}>RECENT EVENTS</p>
                <p style={{ opacity: ".5" }}>Click To Explore</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: SERVICES  */}
        <div className={`section services-section ${activeSection === 1 ? "active" : ""}`}>
          <DottedSurface dark={true} />
          <div className="services-container">
            <div className="services-grid">
              {SERVICES?.map((s, i) => (
                <div key={i} className="service-card">
                  <p className="service-id">{s.id}</p>
                  <div className="service-img">{s.icon}</div>
                  <div className="service-info">
                    <h3 className="service-head">{s.title}</h3>
                    <p className="service-desc">
                      {s.desc}{" "}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/*  SECTION 2: events  */}
        <div className={`section event-section ${activeSection === 2 ? "active" : ""}`}>

          <DottedSurface dark={true} />

          <div className="upcoming-events-container">
            {UpcomingEvents.map((e) => (
              <div key={e.id} className="upcoming-event">
                <div className="upcoming-event-image">
                  <img
                    className="upcoming-event-img"
                    src={e.photo}
                    alt=""
                    onClick={() => setSelectedImage(e.photo)}
                  />
                </div>
                <div className="upcoming-event-details">
                  <div className="upcoming-event-text">
                    <p className="upcoming-event-title">{e.title}</p>
                    <p className="upcoming-event-des">{e.des}</p>
                  </div>
                  {e.register ? (
                    <div className="venue-container">
                      <div className="event-venue">
                        <div>
                          <FaCalendarAlt className="upcoming-event-card-icon" />
                          <span style={{ fontSize: ".9rem", opacity: ".7" }}>
                            {e?.dateString} at {e.time}
                          </span>
                        </div>
                        <div>
                          <FaRegWindowClose className="upcoming-event-card-icon" />
                          {getCurrentDate() >= e.closing === true ? (
                            <span style={{ fontSize: ".9rem", opacity: ".7" }}>
                              Closed
                            </span>
                          ) : (
                            <CountdownButton eventDate={e.closing} />
                          )}
                        </div>
                        <div>
                          <FaMapMarkerAlt className="upcoming-event-card-icon" />
                          <span style={{ fontSize: ".9rem", opacity: ".7" }}>
                            {e?.venue}
                          </span>
                        </div>
                      </div>
                      <div className="upcoming-event-action">
                        {getCurrentDate() >= e.closing ? (
                          <div className="upcoming-event-register-btn">
                            <div style={{ color: "#B22222" }}>
                              Registration Closed
                            </div>
                          </div>
                        ) : (
                          <div className="upcoming-event-register-btn">
                            <a target="_blank" href={e.url}>
                              Register Now <FaExternalLinkAlt color="#0A0F2E" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="venue-container">
                      <div className="event-venue">
                        <div>
                          <FaCalendarAlt className="upcoming-event-card-icon" />
                          <span style={{ fontSize: ".9rem", opacity: ".7" }}>
                            {e?.dateString} at {e.time}
                          </span>
                        </div>
                        <div>
                          <FaRegWindowClose className="upcoming-event-card-icon" />
                          <span style={{ fontSize: ".9rem", opacity: ".7" }}>
                            Coming soon
                          </span>
                        </div>
                        <div>
                          <FaMapMarkerAlt className="upcoming-event-card-icon" />
                          <span style={{ fontSize: ".9rem", opacity: ".7" }}>
                            {e?.venue}
                          </span>
                        </div>
                      </div>
                      <div className="upcoming-event-action">
                        <span className="countdown-heading">Event starts: </span>
                        <CountdownButton eventDate={e.date} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <ImageModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        </div>
        <div className={`section gallery-section ${activeSection === 3 ? "active" : ""}`}>
          <DottedSurface dark={true} />
          <ImageMouseTrail
            items={images}
            maxNumberOfImages={5}
            distance={10}
            imgClass="trail-image"
            isActive={activeSection === 3}
          >
            <article className="trail-content">
              <h1 className="trail-title">TechTrix Gallery</h1>
              <p className="trail-para">
                Explore moments from our events. Every photo reflects the passion that defines TechTrix.
              </p>
            </article>
          </ImageMouseTrail>

        </div>

        {/* SECTION 4: CONTACT  */}
        <div className={`section contact-section ${activeSection === 4 ? "active" : ""}`}>
          {/* Background map */}
          <div className="map-bg">
            <iframe
              title="Office location map"
              src={MAP_EMBED_SRC}
              loading="lazy"
            />
            <div className="map-overlay" style={{ background: COLORS.overlay }} />
          </div>

          <div className="contact-wrapper">
            <div className="contact-address">
              <FaMapLocationDot size={60} />
              <p>{address}</p>
            </div>

            <div className="contact-timeline">
              <div className="timeline-line" style={{ background: COLORS.line }} />

              <div className="timeline-item">
                <TimelineDot />
                <div>
                  <p className="timeline-label">Become a Client</p>
                  <a href={`tel:${phone}`} className="cs-email-link contact-link">{phone}</a>
                </div>
              </div>
              <div className="timeline-item">
                <TimelineDot />
                <div>
                  <p className="timeline-label">Enquiry</p>
                  <a href={`mailto:${email}`} className="cs-email-link contact-link">{email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}

function ProductOrbit({ open, onToggle }) {
  const positions = [{ x: 0, y: -120 }, { x: -110, y: -60 }, { x: 110, y: -60 }, { x: -110, y: 60 }, { x: 110, y: 60 }, { x: 0, y: 120 }];
  const positionsMobile = [{ x: 0, y: -100 }, { x: -90, y: -30 }, { x: 90, y: -30 }, { x: -80, y: 50 }, { x: 80, y: 50 }, { x: 0, y: 100 }];
  return (
    <div className="orbit-container">
      <div className="pulse-ring" /><div className="pulse-ring2" />
      <div className={`orbit-center ${open ? 'open' : ''}`} onClick={onToggle}>
        {open ? <FaLockOpen className="lock-icon" size={40} /> : <FaLock className="lock-icon" size={40} />}
      </div>
      {open && positions.map((pos, i) => (
        <>
          <Link to={recentEvents[i].url} key={i} className="orbit-icon" style={{ left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)`, animationDelay: `${i * 0.07}s`, opacity: 0, color: recentEvents[i].color, border: `2px solid ${recentEvents[i].color}33` }}>
            {<img style={{ borderRadius: "50%", width: "68px", height: "68px", border: `2px solid ${recentEvents[i].color}` }} src={recentEvents[i].logo} />}
          </Link>
        </>
      ))
      }
      {open && positionsMobile.map((pos, i) => (
        <Link to={recentEvents[i].url} key={i} className="orbit-icon-mobile" style={{ left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)`, animationDelay: `${i * 0.07}s`, opacity: 0, color: recentEvents[i].color, border: `2px solid ${recentEvents[i].color}33` }}>
          {<img style={{ borderRadius: "50%", width: "48px", height: "48px", border: `2px solid ${recentEvents[i].color}` }} src={recentEvents[i].logo} />}
        </Link>
      ))
      }
    </div >
  );
}

function TimelineDot() {
  return <span className="timeline-dot" style={{ border: `1px solid ${COLORS.dotRing}`, background: COLORS.dotFill }} />;
}
