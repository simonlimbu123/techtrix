import { useEffect, useState } from "react";
import ScrollToTop from "../utils/scrollToTop";
import "../style/galleryButton.css"

export default function ScrolltoTop() {
    const [showButton, setShowButton] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 1200);
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    const scrolltotop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <>{showButton && (
            <button onClick={scrolltotop} class="gallery-btn">
                <svg height="1.2em" class="arrow" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path></svg>
                <p class="gallery-btn-text">Back to Top</p>
            </button>

        )
        }</>
    )
}