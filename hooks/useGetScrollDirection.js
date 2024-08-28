import { useEffect, useState } from "react";

const useGetScrollDirection = () => {
    const [scrollDir, setScrollDir] = useState("scrolling down");

    useEffect(() => {
        const threshold = 0;
        let lastScrollY = window.pageYOffset + 200;
        let ticking = false;

        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollDir]);
    return { scrollDir }
}

export default useGetScrollDirection
