"use client";

import { useEffect } from "react";

export default function NavbarScrollBehavior({
  targetId,
}: {
  targetId: string;
}) {
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    let lastScrollY = 0;
    const scrollContainer = document.getElementById("main-scroll-container") || window;

    const controlNavbar = () => {
      const currentScrollY =
        scrollContainer === window
          ? window.scrollY
          : (scrollContainer as HTMLElement).scrollTop;

      const shouldShow = currentScrollY < 10 || currentScrollY <= lastScrollY;
      target.classList.toggle("translate-y-0", shouldShow);
      target.classList.toggle("-translate-y-[150%]", !shouldShow);

      lastScrollY = currentScrollY;
    };

    controlNavbar();
    scrollContainer.addEventListener("scroll", controlNavbar, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", controlNavbar);
    };
  }, [targetId]);

  return null;
}
