"use client";

import React, { useState } from "react";
import { Calendar, User, Phone, MessageSquare, AlertCircle, Clock, Sparkles } from "lucide-react";
import { getWhatsAppUrl } from "@/constants/business";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    brideName: "",
    groomName: "",
    mobileNumber: "",
    marriageType: "Arya Samaj Marriage",
    preferredBranch: "Arya Samaj Mettuguda",
    preferredDate: "",
    preferredTime: "",
    additionalMessage: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const marriageTypes = [
    "Arya Samaj Marriage",
    "Love Marriage",
    "Inter Caste Marriage",
    "Inter Religion Marriage",
    "Same Day Marriage"
  ];

  const branches = [
    "Arya Samaj Mettuguda",
    "Arya Samaj Nagaram"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.brideName.trim()) {
      newErrors.brideName = "Bride name is required";
    }
    if (!formData.groomName.trim()) {
      newErrors.groomName = "Groom name is required";
    }

    const mobileClean = formData.mobileNumber.trim();
    if (!mobileClean) {
      newErrors.mobileNumber = "Mobile number is required";
    } else {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(mobileClean)) {
        newErrors.mobileNumber = "Please enter a valid 10-digit Indian mobile number";
      }
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Preferred date is required";
    }
    if (!formData.preferredTime.trim()) {
      newErrors.preferredTime = "Preferred time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const rawMessage = `Hello,

I would like to book a marriage slot.

Bride Name:
${formData.brideName.trim()}

Groom Name:
${formData.groomName.trim()}

Mobile Number:
${formData.mobileNumber.trim()}

Marriage Type:
${formData.marriageType}

Preferred Branch:
${formData.preferredBranch}

Preferred Date:
${formData.preferredDate}

Preferred Time:
${formData.preferredTime.trim()}

Additional Message:
${formData.additionalMessage.trim() || "None"}

Please confirm the available slot.

Thank you.`;

    const waLink = getWhatsAppUrl(rawMessage);
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  const inputClass = (field: string) =>
    `w-full py-3 px-4 rounded-xl bg-[#FFF8F0]/50 border ${
      errors[field]
        ? "border-rose-500 focus:ring-rose-500/20"
        : "border-maroon-100/40 focus:border-[#C78A2A] focus:ring-[#C78A2A]/20"
    } focus:ring-2 focus:outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400`;

  return (
    <div className="bg-[#FFFDF9] border border-maroon-100/30 rounded-[28px] p-6 sm:p-10 shadow-md relative overflow-hidden max-w-3xl mx-auto">
      {/* Subtle gold decoration top-right */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none"></div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10" aria-label="Wedding slot booking form" noValidate>
        
        {/* Row 1: Bride & Groom Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="brideName" className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Bride Name *</span>
            </label>
            <input
              id="brideName"
              type="text"
              name="brideName"
              value={formData.brideName}
              onChange={handleChange}
              placeholder="Enter bride's full name"
              autoComplete="given-name"
              aria-required="true"
              aria-invalid={!!errors.brideName}
              aria-describedby={errors.brideName ? "brideName-error" : undefined}
              className={inputClass("brideName")}
            />
            {errors.brideName && (
              <span id="brideName-error" role="alert" className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.brideName}</span>
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="groomName" className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Groom Name *</span>
            </label>
            <input
              id="groomName"
              type="text"
              name="groomName"
              value={formData.groomName}
              onChange={handleChange}
              placeholder="Enter groom's full name"
              autoComplete="given-name"
              aria-required="true"
              aria-invalid={!!errors.groomName}
              aria-describedby={errors.groomName ? "groomName-error" : undefined}
              className={inputClass("groomName")}
            />
            {errors.groomName && (
              <span id="groomName-error" role="alert" className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.groomName}</span>
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Mobile Number & Marriage Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="mobileNumber" className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Mobile Number (WhatsApp) *</span>
            </label>
            <input
              id="mobileNumber"
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              maxLength={10}
              autoComplete="tel-national"
              aria-required="true"
              aria-invalid={!!errors.mobileNumber}
              aria-describedby={errors.mobileNumber ? "mobileNumber-error" : undefined}
              className={inputClass("mobileNumber")}
            />
            {errors.mobileNumber && (
              <span id="mobileNumber-error" role="alert" className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.mobileNumber}</span>
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="marriageType" className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Marriage Type *</span>
            </label>
            <select
              id="marriageType"
              name="marriageType"
              value={formData.marriageType}
              onChange={handleChange}
              aria-required="true"
              className="w-full py-3 px-4 rounded-xl bg-[#FFF8F0]/50 border border-maroon-100/40 focus:border-[#C78A2A] focus:ring-2 focus:ring-[#C78A2A]/20 focus:outline-none transition-all text-sm text-slate-800 appearance-none cursor-pointer"
            >
              {marriageTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Preferred Branch & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="preferredBranch" className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Preferred Branch *</span>
            </label>
            <select
              id="preferredBranch"
              name="preferredBranch"
              value={formData.preferredBranch}
              onChange={handleChange}
              aria-required="true"
              className="w-full py-3 px-4 rounded-xl bg-[#FFF8F0]/50 border border-maroon-100/40 focus:border-[#C78A2A] focus:ring-2 focus:ring-[#C78A2A]/20 focus:outline-none transition-all text-sm text-slate-800 appearance-none cursor-pointer"
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="preferredDate" className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Preferred Date *</span>
            </label>
            <input
              id="preferredDate"
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.preferredDate}
              aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
              className={inputClass("preferredDate") + " cursor-pointer"}
            />
            {errors.preferredDate && (
              <span id="preferredDate-error" role="alert" className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.preferredDate}</span>
              </span>
            )}
          </div>
        </div>

        {/* Row 4: Preferred Time */}
        <div className="flex flex-col gap-2 text-left">
          <label htmlFor="preferredTime" className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Preferred Time *</span>
          </label>
          <input
            id="preferredTime"
            type="text"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            placeholder="e.g. 10:00 AM or Morning slot"
            aria-required="true"
            aria-invalid={!!errors.preferredTime}
            aria-describedby={errors.preferredTime ? "preferredTime-error" : undefined}
            className={inputClass("preferredTime")}
          />
          {errors.preferredTime && (
            <span id="preferredTime-error" role="alert" className="text-xs text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.preferredTime}</span>
            </span>
          )}
        </div>

        {/* Row 5: Additional Message */}
        <div className="flex flex-col gap-2 text-left">
          <label htmlFor="additionalMessage" className="text-xs font-bold text-[#5A0F16] uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Additional Message (Optional)</span>
          </label>
          <textarea
            id="additionalMessage"
            name="additionalMessage"
            value={formData.additionalMessage}
            onChange={handleChange}
            placeholder="Any special requests or queries"
            rows={3}
            className="w-full py-3 px-4 rounded-xl bg-[#FFF8F0]/50 border border-maroon-100/40 focus:border-[#C78A2A] focus:ring-2 focus:ring-[#C78A2A]/20 focus:outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400 resize-none"
          />
        </div>

        {/* Submit button */}
        <div className="mt-4">
          <button
            type="submit"
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-br from-[#5C0D17] to-[#7A1824] hover:from-[#7A1824] hover:to-[#962230] text-white rounded-full font-bold text-sm shadow-[0_10px_25px_rgba(92,13,23,0.25)] hover:shadow-[0_15px_30px_rgba(92,13,23,0.4)] border border-[#C78A2A]/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.03] mx-auto active:scale-95"
            aria-label="Submit booking request via WhatsApp"
          >
            <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[#5C0D17] shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
              <MessageSquare className="h-3.5 w-3.5 fill-current" />
            </div>
            <span>Submit Booking via WhatsApp</span>
          </button>
        </div>

      </form>
    </div>
  );
}
