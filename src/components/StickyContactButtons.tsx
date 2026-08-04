"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Phone, MessageSquare, Calendar } from "lucide-react";
import { CALL_NUMBER, getWhatsAppUrl } from "@/constants/business";

const BookingModal = dynamic(() => import("./BookingModal"), {
  ssr: false,
});

export default function StickyContactButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const phoneUrl = `tel:${CALL_NUMBER}`;
  const whatsappUrl = getWhatsAppUrl("Hello, I would like to book an Arya Samaj Marriage.");

  return (
    <>
      {/* Mobile Sticky Bar: 3 columns, glassmorphism, safe-area support, rounded pills, fixed to bottom, hidden on sm: */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#19140F]/65 backdrop-blur-md border-t border-white/5 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] sm:hidden transition-all duration-300">
        <div className="flex gap-2.5 w-full max-w-md mx-auto">
          {/* Call Button */}
          <a
            href={phoneUrl}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-3 bg-[#7A1824] hover:bg-[#8B1F2D] text-white rounded-full font-bold text-sm shadow-md active:scale-95 transition-all duration-200"
          >
            <Phone className="h-4 w-4 fill-white text-white shrink-0" />
            <span>Call</span>
          </a>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-3 bg-[#128C7E] hover:bg-[#159F90] text-white rounded-full font-bold text-sm shadow-md active:scale-95 transition-all duration-200"
          >
            <MessageSquare className="h-4 w-4 fill-white text-white shrink-0" />
            <span>WhatsApp</span>
          </a>

          {/* Book Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-3 bg-[#C78A2A] hover:bg-[#DCA43E] text-white rounded-full font-bold text-sm shadow-md active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Calendar className="h-4 w-4 text-white shrink-0" />
            <span>Book</span>
          </button>
        </div>
      </div>

      {/* Desktop / Tablet Sticky Card: 2 buttons (Call Now, WhatsApp), hidden on mobile (< 640px) */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-50 w-80 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-2xl p-4 transition-all duration-300">
        <div className="flex gap-3 w-full">
          {/* Call Now Button */}
          <a
            href={phoneUrl}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 hover:to-maroon-900 text-white font-bold text-sm shadow-md shadow-maroon-700/10 hover:shadow-lg active:scale-95 transition-all duration-200 border border-gold-500/20 group"
          >
            <Phone className="h-4.5 w-4.5 shrink-0 group-hover:animate-pulse" />
            <span className="font-serif">Call Now</span>
          </a>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-500/10 hover:shadow-lg active:scale-95 transition-all duration-200 group"
          >
            <MessageSquare className="h-4.5 w-4.5 shrink-0 fill-current group-hover:scale-110 transition-transform" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
