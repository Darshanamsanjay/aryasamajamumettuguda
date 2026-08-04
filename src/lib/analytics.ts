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
    dataLayer?: unknown[];
  }
}

export const GOOGLE_ADS_CONVERSION_ID = "AW-17983637172/N5wXCPy-294bEOCo388c";

export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;

  // GA4 — uncomment when ready:
  // window.gtag?.("event", name, params);

  if (process.env.NODE_ENV === "development") {
    console.debug("[Analytics]", name, params);
  }
}

/**
 * Track Google Ads conversion event with a fallback timeout.
 *
 * @param callback Callback function executed after conversion is logged or timeout expires.
 * @param sendTo Google Ads conversion ID string.
 * @param timeoutMs Timeout in milliseconds (default 1000ms).
 */
export function trackGoogleAdsConversion(
  callback: () => void,
  sendTo: string = GOOGLE_ADS_CONVERSION_ID,
  timeoutMs: number = 1000
): void {
  if (typeof window === "undefined") {
    callback();
    return;
  }

  let hasCalled = false;
  const safeCallback = () => {
    if (!hasCalled) {
      hasCalled = true;
      callback();
    }
  };

  const timer = setTimeout(() => {
    safeCallback();
  }, timeoutMs);

  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", "conversion", {
        send_to: sendTo,
        event_callback: () => {
          clearTimeout(timer);
          safeCallback();
        },
      });
    } catch {
      clearTimeout(timer);
      safeCallback();
    }
  } else {
    clearTimeout(timer);
    safeCallback();
  }
}

/** Named event constants for type safety */
export const EVENTS = {
  MODAL_OPENED: "booking_modal_opened",
  SUBMIT_CLICKED: "booking_submit_clicked",
  WHATSAPP_OPENED: "booking_whatsapp_opened",
} as const;
