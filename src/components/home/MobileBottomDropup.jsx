import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/**
 * Mobile-only bottom CTA bar that:
 * - Is hidden initially and when user is in the hero section
 * - Becomes visible when user scrolls down (past hero)
 * - Hides again when user scrolls back up into the hero section
 */
export default function MobileBottomDropup({ heroRef }) {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const el = heroRef?.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // When hero is NOT intersecting (user scrolled past it), show dropup
        setVisible(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    observerRef.current.observe(el);
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [heroRef]);

  return (
    <div
      role="region"
      aria-label="Get help"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
    >
      <div
        className={`flex flex-col gap-0 pb-7 border-t border-gray-200 text-center bg-white px-4 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <p className="text-sm font-medium text-gray-800">
          Quotes and ETAs in as little as 3 minutes
        </p> 
        <p className="text-sm text-gray-600 mb-2">
          Track your provider while you wait.
        </p>
        <Link
          href="/rescue"
          className="flex items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-secondary"
        >
          Get Help Now
        </Link>
      </div>
    </div>
  );
}
