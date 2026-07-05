"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Phone, MessageSquare, Calendar } from "lucide-react";
import { WHATSAPP_NUMBER, CALL_NUMBER } from "@/constants/business";

/* -------------------------------------------------------------------------- */
/*                        Lazy-loaded modal (bundle split)                    */
/* -------------------------------------------------------------------------- */

const BookingModal = dynamic(() => import("./BookingModal"), {
  ssr: false,
});

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export default function HeroActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like to book an Arya Samaj Marriage.")}`;

  return (
    <>
      {/* ─── Desktop CTA Buttons (visible sm: and up) ─────────────────── */}
      <div className="hidden sm:flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-5 w-full mt-6 max-w-4xl mx-auto">
        {/* Call Now */}
        <a
          href={`tel:${CALL_NUMBER}`}
          className="group flex-1 flex items-center gap-4 px-6 py-3.5 bg-gradient-to-br from-[#5C0D17] to-[#7A1824] hover:from-[#7A1824] hover:to-[#962230] text-white rounded-[22px] shadow-[0_10px_25px_rgba(92,13,23,0.25)] hover:shadow-[0_15px_30px_rgba(92,13,23,0.4)] border border-[#C78A2A]/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 hover:scale-[1.04] relative overflow-hidden"
        >
          {/* Glossy highlight top edge */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {/* Glass reflections */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#5C0D17] border border-[#C78A2A]/30 shadow-[0_2px_6px_rgba(0,0,0,0.12)] shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
            <Phone className="h-[18px] w-[18px] fill-current" />
          </div>

          <div className="flex flex-col items-start text-left leading-none">
            <span className="text-[9px] uppercase font-semibold tracking-widest text-white/70 mb-1">
              Call Now
            </span>
            <span className="text-sm font-bold tracking-wide">
              Click to Call
            </span>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex-1 flex items-center gap-4 px-6 py-3.5 bg-gradient-to-br from-[#176A3D] to-[#2A8E54] hover:from-[#2A8E54] hover:to-[#38ab69] text-white rounded-[22px] shadow-[0_10px_25px_rgba(23,106,61,0.25)] hover:shadow-[0_15px_30px_rgba(23,106,61,0.4)] border border-[#C78A2A]/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 hover:scale-[1.04] relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#176A3D] border border-[#C78A2A]/30 shadow-[0_2px_6px_rgba(0,0,0,0.12)] shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
            <MessageSquare className="h-[18px] w-[18px] fill-current" />
          </div>

          <div className="flex flex-col items-start text-left leading-none">
            <span className="text-[9px] uppercase font-semibold tracking-widest text-white/70 mb-1">
              WhatsApp
            </span>
            <span className="text-sm font-bold tracking-wide">
              Chat with Us
            </span>
          </div>
        </a>

        {/* Book Enquiry */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="group flex-1 flex items-center gap-4 px-6 py-3.5 bg-gradient-to-br from-[#C78A2A] to-[#E0A93A] hover:from-[#E0A93A] hover:to-[#f0be54] text-white rounded-[22px] shadow-[0_10px_25px_rgba(199,138,42,0.25)] hover:shadow-[0_15px_30px_rgba(199,138,42,0.4)] border border-[#C78A2A]/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 hover:scale-[1.04] relative overflow-hidden cursor-pointer"
        >
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#C78A2A] border border-[#C78A2A]/40 shadow-[0_2px_6px_rgba(0,0,0,0.12)] shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
            <Calendar className="h-[18px] w-[18px]" />
          </div>

          <div className="flex flex-col items-start text-left leading-none">
            <span className="text-[9px] uppercase font-semibold tracking-widest text-white/70 mb-1">
              Booking
            </span>
            <span className="text-sm font-bold tracking-wide">
              Enquire Now
            </span>
          </div>
        </button>
      </div>

      {/* ─── Booking Modal ─────────────────────────────────────────────── */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
