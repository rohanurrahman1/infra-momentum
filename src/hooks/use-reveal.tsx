import { useEffect, useRef } from "react";

/**
 * Adds .is-visible to the element (and any [data-reveal-child] descendants
 * with a staggered delay) when it scrolls into view.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; stagger?: number } = {}
) {
  const ref = useRef<T | null>(null);
  const { threshold = 0.15, stagger = 100 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            const children = entry.target.querySelectorAll<HTMLElement>(
              "[data-reveal-child]"
            );
            children.forEach((child, i) => {
              child.style.transitionDelay = `${i * stagger}ms`;
              child.classList.add("is-visible");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, stagger]);

  return ref;
}
