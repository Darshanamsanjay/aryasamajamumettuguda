"use client";

import React from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import type { BookingFormData } from "@/types/booking";
import { BRANCHES } from "@/constants/business";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface BookingFormFieldsProps {
  formData: BookingFormData;
  errors: Record<string, string>;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  availableTimeSlots: string[];
  noSlotsMessage: boolean;
  minDate: string;
  disabledDates?: Set<string>;
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

function inputClass(field: string, errors: Record<string, string>) {
  return `w-full py-3 px-4 rounded-xl bg-[#FFF8F0]/50 border ${
    errors[field]
      ? "border-rose-500 focus:ring-rose-500/20"
      : "border-[#E8D5B5] focus:border-[#C78A2A] focus:ring-[#C78A2A]/20"
  } focus:ring-2 focus:outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span
      id={id}
      role="alert"
      aria-live="polite"
      className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5"
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export default function BookingFormFields({
  formData,
  errors,
  onChange,
  onSubmit,
  isSubmitting,
  availableTimeSlots,
  noSlotsMessage,
  minDate,
}: BookingFormFieldsProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 relative z-10"
      aria-label="Marriage booking enquiry form"
      noValidate
    >
      {/* Row 1: Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Preferred Date */}
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="booking-preferredDate"
            className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5"
          >
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Preferred Date *</span>
          </label>
          <input
            id="booking-preferredDate"
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={onChange}
            min={minDate}
            autoComplete="off"
            aria-required="true"
            aria-invalid={!!errors.preferredDate}
            aria-describedby={
              errors.preferredDate ? "preferredDate-error" : undefined
            }
            className={inputClass("preferredDate", errors) + " cursor-pointer"}
            onFocus={(e) =>
              e.currentTarget.scrollIntoView({
                behavior: "smooth",
                block: "center",
              })
            }
          />
          <FieldError id="preferredDate-error" message={errors.preferredDate} />
        </div>

        {/* Preferred Time */}
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="booking-preferredTime"
            className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5"
          >
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Preferred Time *</span>
          </label>
          {noSlotsMessage ? (
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl py-3 px-4 font-medium">
              No slots available for this date.
            </p>
          ) : (
            <select
              id="booking-preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={onChange}
              aria-required="true"
              aria-invalid={!!errors.preferredTime}
              aria-describedby={
                errors.preferredTime ? "preferredTime-error" : undefined
              }
              className={
                inputClass("preferredTime", errors) +
                " appearance-none cursor-pointer"
              }
            >
              <option value="">Select a time slot</option>
              {availableTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          )}
          <FieldError id="preferredTime-error" message={errors.preferredTime} />
        </div>
      </div>

      {/* Row 2: Groom & Bride */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="booking-groomName"
            className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5"
          >
            <User className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Groom Name *</span>
          </label>
          <input
            id="booking-groomName"
            type="text"
            name="groomName"
            value={formData.groomName}
            onChange={onChange}
            placeholder="Enter groom's full name"
            autoComplete="given-name"
            aria-required="true"
            aria-invalid={!!errors.groomName}
            aria-describedby={
              errors.groomName ? "groomName-error" : undefined
            }
            className={inputClass("groomName", errors)}
            onFocus={(e) =>
              e.currentTarget.scrollIntoView({
                behavior: "smooth",
                block: "center",
              })
            }
          />
          <FieldError id="groomName-error" message={errors.groomName} />
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="booking-brideName"
            className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5"
          >
            <User className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Bride Name *</span>
          </label>
          <input
            id="booking-brideName"
            type="text"
            name="brideName"
            value={formData.brideName}
            onChange={onChange}
            placeholder="Enter bride's full name"
            autoComplete="given-name"
            aria-required="true"
            aria-invalid={!!errors.brideName}
            aria-describedby={
              errors.brideName ? "brideName-error" : undefined
            }
            className={inputClass("brideName", errors)}
            onFocus={(e) =>
              e.currentTarget.scrollIntoView({
                behavior: "smooth",
                block: "center",
              })
            }
          />
          <FieldError id="brideName-error" message={errors.brideName} />
        </div>
      </div>

      {/* Row 3: Mobile & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="booking-mobileNumber"
            className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Mobile Number *</span>
          </label>
          <input
            id="booking-mobileNumber"
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={onChange}
            placeholder="e.g. 9876543210"
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel-national"
            aria-required="true"
            aria-invalid={!!errors.mobileNumber}
            aria-describedby={
              errors.mobileNumber ? "mobileNumber-error" : undefined
            }
            className={inputClass("mobileNumber", errors)}
            onFocus={(e) =>
              e.currentTarget.scrollIntoView({
                behavior: "smooth",
                block: "center",
              })
            }
          />
          <FieldError id="mobileNumber-error" message={errors.mobileNumber} />
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="booking-location"
            className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Branch *</span>
          </label>
          <select
            id="booking-location"
            name="location"
            value={formData.location}
            onChange={onChange}
            aria-required="true"
            aria-invalid={!!errors.location}
            aria-describedby={
              errors.location ? "location-error" : undefined
            }
            className={
              inputClass("location", errors) +
              " appearance-none cursor-pointer"
            }
          >
            <option value="">Select a branch</option>
            {BRANCHES.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          <FieldError id="location-error" message={errors.location} />
        </div>
      </div>

      {/* Row 4: Notes */}
      <div className="flex flex-col gap-1.5 text-left">
        <label
          htmlFor="booking-additionalNotes"
          className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5"
        >
          <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Notes (Optional)</span>
        </label>
        <textarea
          id="booking-additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={onChange}
          placeholder="Any special requests or queries"
          rows={3}
          className="w-full py-3 px-4 rounded-xl bg-[#FFF8F0]/50 border border-[#E8D5B5] focus:border-[#C78A2A] focus:ring-2 focus:ring-[#C78A2A]/20 focus:outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400 resize-none"
          onFocus={(e) =>
            e.currentTarget.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col items-center gap-3 mt-2">
        <button
          type="submit"
          disabled={isSubmitting || noSlotsMessage}
          className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-br from-[#176A3D] to-[#2A8E54] hover:from-[#2A8E54] hover:to-[#38ab69] text-white rounded-full font-bold text-sm shadow-[0_10px_25px_rgba(23,106,61,0.25)] hover:shadow-[0_15px_30px_rgba(23,106,61,0.4)] border border-[#C78A2A]/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.03] mx-auto active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 cursor-pointer"
          aria-label="Send enquiry on WhatsApp"
        >
          {isSubmitting ? (
            <>
              <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Opening WhatsApp...</span>
            </>
          ) : (
            <>
              <div
                className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[#176A3D] shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              >
                <MessageSquare className="h-3.5 w-3.5 fill-current" />
              </div>
              <span>Send Enquiry on WhatsApp</span>
            </>
          )}
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-slate-500 text-center max-w-xs leading-relaxed">
          Your enquiry will open in WhatsApp. No payment is required at this
          stage.
        </p>
      </div>
    </form>
  );
}
