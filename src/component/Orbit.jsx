import { FaLock, FaLockOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { recentEvents } from "../data/recentEvents";

export default function ProductOrbit({ open, onToggle }) {
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