"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { BookingFormData } from "@/types/booking";
import { EMPTY_FORM } from "@/types/booking";
import { getWhatsAppUrl } from "@/constants/business";
import { getAvailableTimeSlots } from "@/constants/timeSlots";
import { trackEvent, EVENTS } from "@/lib/analytics";
import BookingFormFields from "./BookingFormFields";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Dates that are fully booked / admin-blocked (future use) */
  disabledDates?: Set<string>;
}

type Phase = "loading" | "form";

const STORAGE_KEY = "aryasamaj_booking_draft";

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

function getTodayISO() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function formatDateForMessage(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Sanitise mobile input: strip spaces, hyphens, +91 prefix — keep digits only */
function sanitiseMobile(raw: string): string {
  let cleaned = raw.replace(/[\s\-()]/g, "");
  cleaned = cleaned.replace(/^\+91/, "");
  cleaned = cleaned.replace(/^91(?=\d{10}$)/, "");
  cleaned = cleaned.replace(/[^0-9]/g, "");
  return cleaned.slice(0, 10);
}

function buildWhatsAppMessage(data: BookingFormData): string {
  const lines = [
    "🌸 *New Marriage Enquiry* 🌸",
    "",
    "📍 Branch:",
    data.location || "Mettuguda",
    "",
    "📅 Date:",
    formatDateForMessage(data.preferredDate),
    "",
    "🕒 Time:",
    data.preferredTime,
    "",
    "👰 Bride:",
    data.brideName.trim(),
    "",
    "🤵 Groom:",
    data.groomName.trim(),
    "",
    "📞 Mobile:",
    data.mobileNumber,
    "",
  ];

  if (data.additionalNotes.trim()) {
    lines.push("📝 Notes:", data.additionalNotes.trim(), "");
  }

  lines.push("Please contact us regarding this enquiry.");

  return lines.join("\n");
}

/* -------------------------------------------------------------------------- */
/*                              Loading Skeleton                              */
/* -------------------------------------------------------------------------- */

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-5 animate-pulse" aria-hidden="true">
      {/* Two rows of field pairs */}
      {[1, 2, 3].map((row) => (
        <div key={row} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-28 bg-[#E8D5B5]/50 rounded" />
            <div className="h-11 w-full bg-[#FFF8F0] border border-[#E8D5B5]/30 rounded-xl" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-3 w-24 bg-[#E8D5B5]/50 rounded" />
            <div className="h-11 w-full bg-[#FFF8F0] border border-[#E8D5B5]/30 rounded-xl" />
          </div>
        </div>
      ))}
      {/* Textarea skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-3 w-32 bg-[#E8D5B5]/50 rounded" />
        <div className="h-20 w-full bg-[#FFF8F0] border border-[#E8D5B5]/30 rounded-xl" />
      </div>
      {/* Button skeleton */}
      <div className="h-12 w-48 bg-[#E8D5B5]/40 rounded-full mx-auto" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Focus Trap Hook                              */
/* -------------------------------------------------------------------------- */

function useFocusTrap(containerRef: React.RefObject<HTMLDivElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      const focusable = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [containerRef, isActive]);
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export default function BookingModal({
  isOpen,
  onClose,
  disabledDates,
}: BookingModalProps) {
  /* ── State ───────────────────────────────────────────────────────────── */
  const [phase, setPhase] = useState<Phase>("loading");
  const [formData, setFormData] = useState<BookingFormData>(() => {
    if (typeof window === "undefined") return EMPTY_FORM;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? { ...EMPTY_FORM, ...JSON.parse(saved) } : EMPTY_FORM;
    } catch {
      return EMPTY_FORM;
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const minDate = getTodayISO();

  /* ── Focus trap ──────────────────────────────────────────────────────── */
  useFocusTrap(modalRef, isOpen);

  /* ── Time slots (date-aware) ─────────────────────────────────────────── */
  const availableTimeSlots = useMemo(
    () => getAvailableTimeSlots(formData.preferredDate, disabledDates),
    [formData.preferredDate, disabledDates],
  );
  const noSlotsMessage =
    !!formData.preferredDate && availableTimeSlots.length === 0;

  /* ── Persist form data to sessionStorage ─────────────────────────────── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // sessionStorage full or blocked — silently ignore
    }
  }, [formData]);

  /* ── Mount lifecycle ─────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;

    // Reset phase for open asynchronously to avoid cascading renders
    queueMicrotask(() => {
      setPhase("loading");
      setErrors({});
      setIsSubmitting(false);
    });

    // Remember which element triggered the modal
    triggerRef.current = document.activeElement as HTMLElement;

    // Track analytics
    trackEvent(EVENTS.MODAL_OPENED);

    // Body scroll lock
    document.body.classList.add("modal-open");

    // Loading skeleton → form
    const timer = setTimeout(() => {
      setPhase("form");
      // Auto-focus the date input after skeleton
      requestAnimationFrame(() => {
        const el = document.getElementById("booking-preferredDate") as HTMLInputElement | null;
        if (el) {
          dateInputRef.current = el;
          el.focus();
        }
      });
    }, 250);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("modal-open");
      // Return focus to trigger
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  /* ── Close with protection ───────────────────────────────────────────── */
  const hasData = useCallback(() => {
    return Object.entries(formData).some(
      ([k, v]) => k !== "location" && typeof v === "string" && v.trim().length > 0,
    );
  }, [formData]);

  const handleClose = useCallback(() => {
    if (isSubmitting) return; // Prevent closing while sending
    if (hasData()) {
      const confirmed = window.confirm(
        "You have unsaved booking details. Are you sure you want to leave?",
      );
      if (!confirmed) return;
    }
    onClose();
  }, [isSubmitting, hasData, onClose]);

  /* ── Escape key ──────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  /* ── Form handlers ───────────────────────────────────────────────────── */
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value } = e.target;

      let processed = value;
      if (name === "mobileNumber") {
        processed = sanitiseMobile(value);
      }

      setFormData((prev) => {
        const next = { ...prev, [name]: processed };
        // Reset time when date changes
        if (name === "preferredDate") {
          next.preferredTime = "";
        }
        return next;
      });

      // Clear field error on change
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [errors],
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Preferred date is required";
    } else {
      const selected = new Date(formData.preferredDate + "T00:00:00");
      const today = new Date(minDate + "T00:00:00");
      if (selected < today) {
        newErrors.preferredDate = "Date cannot be in the past";
      }
      if (disabledDates?.has(formData.preferredDate)) {
        newErrors.preferredDate = "This date is not available";
      }
    }

    if (!formData.preferredTime.trim()) {
      newErrors.preferredTime = "Preferred time is required";
    }

    if (!formData.groomName.trim()) {
      newErrors.groomName = "Groom name is required";
    }

    if (!formData.brideName.trim()) {
      newErrors.brideName = "Bride name is required";
    }

    const mobile = formData.mobileNumber.trim();
    if (!mobile) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      newErrors.mobileNumber = "Enter a valid 10-digit Indian mobile number";
    }

    if (!formData.location) {
      newErrors.location = "Branch is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, minDate, disabledDates]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsSubmitting(true);
      trackEvent(EVENTS.SUBMIT_CLICKED, {
        date: formData.preferredDate,
        time: formData.preferredTime,
      });

      // Show spinner for 500ms before redirecting
      setTimeout(() => {
        const message = buildWhatsAppMessage(formData);
        const url = getWhatsAppUrl(message);

        trackEvent(EVENTS.WHATSAPP_OPENED, {
          date: formData.preferredDate,
          time: formData.preferredTime,
        });

        window.open(url, "_blank", "noopener,noreferrer");

        // Clear saved draft
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }

        setFormData(EMPTY_FORM);
        setIsSubmitting(false);
        onClose();
      }, 500);
    },
    [validateForm, formData, onClose],
  );

  /* ── Visual viewport tracking for mobile keyboard ────────────────────── */
  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;

    function handleResize() {
      const vv = window.visualViewport;
      if (vv) {
        document.documentElement.style.setProperty(
          "--visual-viewport-height",
          `${vv.height}px`,
        );
      }
    }

    const vv = window.visualViewport;
    if (vv) {
      handleResize();
      vv.addEventListener("resize", handleResize);
      return () => vv.removeEventListener("resize", handleResize);
    }
  }, [isOpen]);

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-[61] flex items-end sm:items-center justify-center sm:p-4"
            role="presentation"
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-modal-title"
              /* Mobile: bottom sheet slide-up | Desktop: centered scale */
              initial={{ opacity: 0, y: "100%", scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: "100%", scale: 1 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={[
                "relative w-full bg-[#FFFDF9] shadow-2xl overflow-hidden",
                // Mobile: bottom sheet
                "rounded-t-3xl max-h-[90vh]",
                // Desktop: centered card
                "sm:rounded-2xl sm:max-w-[600px] sm:max-h-[85vh]",
              ].join(" ")}
              style={{
                maxHeight:
                  "min(var(--visual-viewport-height, 90vh), 90vh)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scrollable content */}
              <div className="overflow-y-auto overscroll-contain h-full booking-modal-content">
                {/* Header bar */}
                <div className="sticky top-0 z-20 bg-[#FFFDF9]/95 backdrop-blur-sm border-b border-[#E8D5B5]/40 px-5 py-4 sm:px-7 sm:py-5 flex items-center justify-between">
                  <div>
                    <h2
                      id="booking-modal-title"
                      className="font-serif text-lg sm:text-xl font-bold text-[#5A0F16]"
                    >
                      Book a Marriage Enquiry
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fill in the details below
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close booking modal"
                    className="h-9 w-9 rounded-full bg-[#FFF8F0] border border-[#E8D5B5] flex items-center justify-center text-slate-500 hover:text-[#5A0F16] hover:border-[#C78A2A]/50 transition-all active:scale-90 shrink-0 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Body */}
                <div className="px-5 py-5 sm:px-7 sm:py-6">
                  {/* Subtle gold decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none" />

                  {phase === "loading" && <FormSkeleton />}

                  {phase === "form" && (
                    <BookingFormFields
                      formData={formData}
                      errors={errors}
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      availableTimeSlots={availableTimeSlots}
                      noSlotsMessage={noSlotsMessage}
                      minDate={minDate}
                      disabledDates={disabledDates}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
