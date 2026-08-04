/**
 * Lightweight analytics event tracking.
 *
 * Currently logs to console.debug.
 * To enable Google Analytics (GA4), uncomment the gtag line below
 * and ensure the GA4 snippet is loaded in layout.tsx.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;

  // GA4 — uncomment when ready:
  // window.gtag?.("event", name, params);

  if (process.env.NODE_ENV === "development") {
    console.debug("[Analytics]", name, params);
  }
}

/** Named event constants for type safety */
export const EVENTS = {
  MODAL_OPENED: "booking_modal_opened",
  SUBMIT_CLICKED: "booking_submit_clicked",
  WHATSAPP_OPENED: "booking_whatsapp_opened",
} as const;
