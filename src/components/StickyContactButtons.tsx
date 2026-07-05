"use client";

import React from "react";
import { Phone, MessageSquare } from "lucide-react";

export default function StickyContactButtons() {
  const phoneUrl = "tel:+918099333754";
  const whatsappUrl = "https://wa.me/918099333754?text=Hello,%20I%20would%20like%20to%20book%20an%20Arya%20Samaj%20Marriage.";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-slate-100 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] sm:bottom-6 sm:left-auto sm:right-6 sm:w-80 sm:rounded-2xl sm:border sm:border-slate-200/80 sm:shadow-2xl sm:p-4 sm:pb-4 transition-all duration-300">
      <div className="flex gap-3 w-full">
        {/* Call Now Button */}
        <a
          href={phoneUrl}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 hover:to-maroon-900 text-white font-bold text-sm sm:text-base shadow-md shadow-maroon-700/10 hover:shadow-lg active:scale-95 transition-all duration-200 border border-gold-500/20 group"
        >
          <Phone className="h-4.5 w-4.5 shrink-0 group-hover:animate-pulse" />
          <span className="font-serif">Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-500/10 hover:shadow-lg active:scale-95 transition-all duration-200 group"
        >
          <MessageSquare className="h-4.5 w-4.5 shrink-0 fill-current group-hover:scale-110 transition-transform" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
