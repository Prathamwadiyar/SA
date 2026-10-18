"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function MotionProvider() {
  const path = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopPointer = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    let lenis: Lenis | null = null;
    let context: gsap.Context | null = null;
    let frame = 0;
    const tick = (time: number) => lenis?.raf(time * 1000);

    const cleanup = () => {
      context?.revert();
      context = null;
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };

    const initialize = () => {
      cleanup();
      if (!reducedMotion.matches && desktopPointer.matches) {
        lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
      }

      if (!reducedMotion.matches) {
        context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
            gsap.fromTo(
              element,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: element, start: "top 90%", once: true },
              },
            );
          });

          if (desktopPointer.matches) {
            gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
              gsap.fromTo(
                element,
                { yPercent: -4 },
                {
                  yPercent: 4,
                  ease: "none",
                  scrollTrigger: {
                    trigger: element.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            });
          }
        });
      }
      ScrollTrigger.refresh();
    };

    frame = requestAnimationFrame(initialize);
    const reinitialize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(initialize);
    };
    reducedMotion.addEventListener("change", reinitialize);
    desktopPointer.addEventListener("change", reinitialize);

    return () => {
      cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", reinitialize);
      desktopPointer.removeEventListener("change", reinitialize);
      cleanup();
    };
  }, [path]);

  return null;
}
