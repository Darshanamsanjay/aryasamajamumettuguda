import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { Branch } from "@/types";
import { db } from "@/lib/db";
import { MapPin, Phone, MessageSquare, Clock } from "lucide-react";

const siteUrl = "https://www.aryasamajamumettuguda.com";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Arya Samaj Hyderabad. Phone numbers, addresses, operating hours, and Google Maps directions for Mettuguda and Nagaram temple branches.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    type: "website",
    title: "Contact Arya Samaj Hyderabad | Mettuguda & Nagaram",
    description:
      "Find phone numbers, addresses, and Google Maps directions for our Mettuguda and Nagaram branches.",
    url: `${siteUrl}/contact`,
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
        alt: "Arya Samaj Hyderabad Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Arya Samaj Hyderabad | Mettuguda & Nagaram",
    description:
      "Find phone numbers, addresses, and Google Maps directions for our Mettuguda and Nagaram branches.",
    images: [`${siteUrl}/logo.png`],
  },
};

export const revalidate = 0;

export default async function ContactPage() {
  const branches: Branch[] = await db.branch.findMany();

  return (
    <div className="bg-[#FFF8F0] min-h-screen text-slate-800 pb-16">
      
      {/* 1. Page Hero Banner */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-maroon-100/40 flex items-center justify-center text-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Temple Entrance Background"
            fill
            priority
            className="object-cover object-center"
            quality={60}
          />
          {/* Light warm orange/ivory overlay */}
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(255, 248, 235, 0.75)' }}
          ></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-[#5A0F16] mb-3">
            <span className="text-xl font-serif">ॐ</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#5A0F16] uppercase tracking-wider">
            Contact Helpline Desk
          </h1>
          {/* Breadcrumbs */}
          <nav className="flex justify-center items-center gap-2 mt-4 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-[#5A0F16] transition-colors">Home</Link>
            <span className="text-slate-400">/</span>
            <span className="text-[#5A0F16] font-bold">Contact Us</span>
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        
        {/* Sub-header instructions */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-2">
          <span className="text-[#5A0F16] text-xl font-serif">ॐ</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#5A0F16]">
            Get In Touch With Us
          </h2>
          <div className="flex items-center justify-center gap-3 mt-1">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C78A2A]/60"></div>
            <span className="text-[#C78A2A] text-xs">◆</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C78A2A]/60"></div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mt-2 max-w-lg">
            Have questions? Our administrative coordinators are available daily to clarify procedures, fee details, and document checklists.
          </p>
        </div>

        {/* 2. Side-by-Side Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {branches.map((branch) => {
            const mapUrl = branch.slug === "mettuguda"
              ? "https://maps.app.goo.gl/sTVVuqM5NwoxnUs8A?g_st=iw"
              : "https://maps.app.goo.gl/TngfU1aPXELkbGMp6";

            return (
              <div
                key={branch.id}
                className="bg-[#FFF8F0] border border-[#D4AF37]/25 rounded-[18px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col justify-between min-h-[420px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#D4AF37]/50 relative cursor-pointer group"
              >
                {/* Card Link Overlay */}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-0 cursor-pointer"
                  aria-label={`Open ${branch.name} on Google Maps`}
                />

                {/* Card Content */}
                <div className="flex flex-col gap-6 relative z-10 pointer-events-none">
                  {/* Branch Name */}
                  <div>
                    <h3 className="font-serif text-[26px] md:text-[34px] font-bold text-[#6B1020] leading-tight">
                      {branch.name}
                    </h3>
                    <div className="h-0.5 w-16 bg-[#C78A2A]/40 mt-3"></div>
                  </div>

                  {/* Information Blocks */}
                  <div className="flex flex-col gap-4 text-[#3F3F46] font-sans">
                    {/* Address */}
                    <div className="flex gap-3.5 items-start">
                      <MapPin className="h-5 w-5 text-[#B8860B] shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-wider font-medium text-[#B8860B]">Address</span>
                        <span className="text-base md:text-[17px] leading-relaxed">{branch.address}</span>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-3.5 items-start">
                      <Phone className="h-5 w-5 text-[#B8860B] shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-wider font-medium text-[#B8860B]">Phone Number</span>
                        <a href="tel:+918099333754" className="font-bold text-[#6B1020] text-lg md:text-xl hover:underline relative z-20 pointer-events-auto">
                          +91 8099333754
                        </a>
                      </div>
                    </div>

                    {/* Office Timings */}
                    <div className="flex gap-3.5 items-start">
                      <Clock className="h-5 w-5 text-[#B8860B] shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-wider font-medium text-[#B8860B]">Office Timings</span>
                        <span className="text-base md:text-[17px] font-medium">{branch.officeHours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: 3 equal-width rounded pill shape buttons */}
                <div className="h-px bg-[#D4AF37]/15 mt-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5 relative z-20">
                  <a
                    href="tel:+918099333754"
                    className="flex items-center justify-center gap-2 h-11 bg-gradient-to-r from-[#6B1020] to-[#8C1527] hover:from-[#8C1527] hover:to-[#A31D33] text-white font-bold text-xs rounded-full shadow-sm active:scale-95 transition-all w-full text-center"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href="https://wa.me/918099333754?text=Hello,%20I%20would%20like%20to%20book%20an%20Arya%20Samaj%20Marriage."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-11 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xs rounded-full shadow-sm active:scale-95 transition-all w-full text-center"
                  >
                    <MessageSquare className="h-3.5 w-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-11 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-full shadow-sm active:scale-95 transition-all w-full text-center"
                  >
                    <MapPin className="h-3.5 w-3.5 text-white" />
                    <span>View on Google Maps</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
