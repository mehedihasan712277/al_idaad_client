"use client";

import { useEffect, useState, useRef } from "react";
import NavItems from "./NavItems";

const Navbar = () => {
    const [visible, setVisible] = useState(true);
    const [animate, setAnimate] = useState(false);
    const [fade, setFade] = useState(false);

    // refs to prevent unnecessary updates
    const visibleRef = useRef(visible);
    const animateRef = useRef(animate);
    const fadeRef = useRef(fade);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            let newVisible = visibleRef.current;
            let newAnimate = animateRef.current;
            let newFade = fadeRef.current;

            if (scrollY === 0) {
                // At top → visible with fade
                newVisible = true;
                newAnimate = false;
                newFade = true;
            } else if (scrollY > 500) {
                // Appear animated slide down
                newVisible = true;
                newAnimate = true;
                newFade = false;
            } else {
                // Hide instantly
                newVisible = false;
                newAnimate = false;
                newFade = false;
            }

            if (newVisible !== visibleRef.current) {
                setVisible(newVisible);
                visibleRef.current = newVisible;
            }
            if (newAnimate !== animateRef.current) {
                setAnimate(newAnimate);
                animateRef.current = newAnimate;
            }
            if (newFade !== fadeRef.current) {
                setFade(newFade);
                fadeRef.current = newFade;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`
        fixed top-0 left-0 right-0 z-50
        bg-bg_main border-b border-border
        transform
        ${visible ? "translate-y-0" : "-translate-y-full"}
        ${animate ? "transition-transform duration-300 ease-in-out" : "transition-none"}
        ${fade ? "opacity-0 animate-fadeIn" : "opacity-100"}
      `}
        >
            <div className="flex justify-between items-center h-18 md:h-25 px-4 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold font-proza-libre">Al Idaad</h1>
                <NavItems />
            </div>
        </nav>
    );
};

export default Navbar;
