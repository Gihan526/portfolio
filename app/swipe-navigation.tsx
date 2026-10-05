"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const pages = ["/", "/about", "/projects"];
const interactive = "a, button, input, textarea, select, label, canvas, [role='slider'], [contenteditable='true'], [data-no-swipe]";

export default function SwipeNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 1366px) and (pointer: coarse)");
    const pageIndex = pages.indexOf(pathname);
    if (pageIndex < 0) return;

    let gesture: { x: number; y: number; started: number } | null = null;

    function start(event: TouchEvent) {
      gesture = null;
      if (!mobile.matches || event.touches.length !== 1) return;
      if (event.target instanceof Element && event.target.closest(interactive)) return;
      if (window.getSelection()?.isCollapsed === false) return;

      const touch = event.touches[0];
      // Leave screen-edge gestures to the browser's native back/forward controls.
      if (touch.clientX < 24 || touch.clientX > window.innerWidth - 24) return;
      gesture = { x: touch.clientX, y: touch.clientY, started: performance.now() };
    }

    function move(event: TouchEvent) {
      if (!gesture) return;
      if (event.touches.length !== 1) {
        gesture = null;
        return;
      }
      const dx = Math.abs(event.touches[0].clientX - gesture.x);
      const dy = Math.abs(event.touches[0].clientY - gesture.y);
      if (dy > 16 && dy >= dx) {
        gesture = null;
        return;
      }
      if (dx > 16 && dx > dy * 1.7 && event.cancelable) event.preventDefault();
    }

    function end(event: TouchEvent) {
      const current = gesture;
      gesture = null;
      if (!current || !mobile.matches || event.changedTouches.length !== 1) return;
      if (event.touches.length || performance.now() - current.started > 900) return;

      const dx = event.changedTouches[0].clientX - current.x;
      const dy = event.changedTouches[0].clientY - current.y;
      if (Math.abs(dx) < 72 || Math.abs(dx) <= Math.abs(dy) * 1.7) return;

      const destination = pages[pageIndex + (dx < 0 ? 1 : -1)];
      if (destination) router.push(destination, {
        transitionTypes: [dx < 0 ? "nav-forward" : "nav-back"],
      });
    }

    function cancel() { gesture = null; }

    document.addEventListener("touchstart", start, { passive: true });
    document.addEventListener("touchmove", move, { passive: false });
    document.addEventListener("touchend", end, { passive: true });
    document.addEventListener("touchcancel", cancel, { passive: true });
    return () => {
      document.removeEventListener("touchstart", start);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", end);
      document.removeEventListener("touchcancel", cancel);
    };
  }, [pathname, router]);

  return null;
}
