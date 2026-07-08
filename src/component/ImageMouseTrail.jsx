'use client';
import { createRef, useRef, useEffect } from 'react';
import "../style/mousetrail.css"
export default function ImageMouseTrail({
    items,
    children,
    className,
    maxNumberOfImages = 5,
    imgClass,
    distance = 20,
    fadeAnimation = false,
    isActive,
}) {
    const containerRef = useRef(null);
    const refs = useRef(items.map(() => createRef()));
    const currentZIndexRef = useRef(1);
    let globalIndex = 0;
    let last = { x: 0, y: 0 };
    const activate = (image, x, y) => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        const relativeX = x - containerRect.left;
        const relativeY = y - containerRect.top;
        image.style.left = `${relativeX}px`;
        image.style.top = `${relativeY}px`;
        console.log(refs.current[refs.current?.length - 1]);
        if (currentZIndexRef.current > 40) {
            currentZIndexRef.current = 1;
        }
        image.style.zIndex = String(currentZIndexRef.current);
        currentZIndexRef.current++;
        image.dataset.status = 'active';
        if (fadeAnimation) {
            setTimeout(() => {
                image.dataset.status = 'inactive';
            }, 1500);
        }
        last = { x, y };
    };
    const distanceFromLast = (x, y) => {
        return Math.hypot(x - last.x, y - last.y);
    };
    const deactivate = (image) => {
        image.dataset.status = 'inactive';
    };
    const resetTrail = () => {
        refs.current.forEach((ref) => {
            if (!ref.current) return;

            ref.current.dataset.status = "inactive";
            ref.current.style.left = "0px";
            ref.current.style.top = "0px";
        });

        currentZIndexRef.current = 1;
        globalIndex = 0;
        last = { x: 0, y: 0 };
    };
    const handleOnMove = (e) => {
        if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / distance) {
            const lead = refs.current[globalIndex % refs.current.length].current;
            const tail =
                refs.current[(globalIndex - maxNumberOfImages) % refs.current.length]
                    ?.current;
            if (lead) activate(lead, e.clientX, e.clientY);
            if (tail) deactivate(tail);
            globalIndex++;
        }
    };
    useEffect(() => {
        if (!isActive) {
            resetTrail();
        }
    }, [isActive]);
    return (
        <section
            onMouseMove={handleOnMove}
            onTouchMove={(e) => handleOnMove(e.touches[0])}
            ref={containerRef}
            className={`mouse-trail-container ${className || ""}`}
        >
            {items.map((item, index) => (
                <>
                    <img
                        key={item.src}
                        className={`mouse-trail-image ${imgClass || ""}`}
                        data-index={index}
                        data-status="inactive"
                        src={item}
                        alt={`image-${index}`}
                        ref={refs.current[index]}
                    />
                </>
            ))}
            {children}
        </section>
    );
}
