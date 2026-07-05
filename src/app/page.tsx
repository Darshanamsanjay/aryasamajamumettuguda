import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import type { Branch, Service } from "@/types";
import { db } from "@/lib/db";
import { getGalleryImages } from "@/lib/gallery";
import HomeGalleryCarousel from "@/components/HomeGalleryCarousel";
import BookingForm from "@/components/BookingForm";
import {
  MapPin,
  Phone,
  MessageSquare,
  ArrowRight,
  FileText,
  CheckCircle2,
  Flame,
  Flower2,
  Clock,
  Handshake,
  Calendar,
} from "lucide-react";

const siteUrl = "https://www.aryasamajamumettuguda.com";

export const metadata: Metadata = {
  title: "Arya Samaj Marriage Hyderabad | Verified Same-Day Vedic Weddings",
  description:
    "Book your Arya Samaj marriage in Hyderabad at Mettuguda or Nagaram. Same-day Vedic weddings, love marriages, inter-caste marriages with legally valid certificates.",
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    type: "website",
    title: "Arya Samaj Marriage Hyderabad | Verified Same-Day Vedic Weddings",
    description:
      "Book your Arya Samaj marriage in Hyderabad. Same-day Vedic weddings with legally valid certificates.",
    url: `${siteUrl}/`,
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
    title: "Arya Samaj Marriage Hyderabad | Verified Same-Day Vedic Weddings",
    description:
      "Book your Arya Samaj marriage in Hyderabad. Same-day Vedic weddings with legally valid certificates.",
    images: [`${siteUrl}/logo.png`],
  },
};

export const revalidate = 0; // Make dynamic

export default async function Home() {
  // Fetch branches and services from DB
  const branches: Branch[] = await db.branch.findMany();
  const services: Service[] = await db.service.findMany();

  // Read gallery images dynamically and filter for homepage (014-020)
  const allImages = getGalleryImages();
  const homeImages = allImages.filter((img) => {
    const filename = img.src.split("/").pop() || "";
    return /0(14|15|16|17|18|19|20)\./.test(filename);
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF9] text-slate-800">
      {/* 1. Hero Section */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center pt-16 pb-20 md:py-24 overflow-hidden border-b border-maroon-100/40">

        {/* Background Video at 100% Opacity (covers full left-to-right) */}
        <div className="absolute inset-0 z-0">
          <video
            src="/make_this_image_animation_lik.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
            style={{ filter: 'none' }}
          />
          {/* Separate light warm overlay layer for text readability without altering background image quality */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(255, 248, 235, 0.15)', backdropFilter: 'none' }}
          ></div>
        </div>

        {/* Content Overlay Container (Center-aligned columns) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl flex flex-col gap-6 items-center text-center mx-auto md:mx-0">

            {/* Top small text / symbol */}
            <div className="flex items-center gap-3 text-[#4A3524] font-serif">
              <div className="h-[1px] w-10 bg-[#4A3524]/30"></div>
              <span className="text-2xl font-bold tracking-widest text-[#4A3524]" style={{ textShadow: '0 2px 4px rgba(60,35,15,0.2)' }}>ॐ</span>
              <div className="h-[1px] w-10 bg-[#4A3524]/30"></div>
            </div>

            {/* Main Heading & Sub Heading */}
            <div className="flex flex-col items-center">
              <h1
                className="font-serif text-5xl sm:text-7xl font-extrabold tracking-widest uppercase leading-none text-[#F8E7B5] pb-1"
                style={{
                  textShadow: '0 3px 12px rgba(0,0,0,0.18)',
                }}
              >
                ARYASAMAJ
              </h1>
              <h2
                className="font-serif text-lg sm:text-2xl font-bold tracking-widest text-[#FFF5DD] uppercase mt-2"
                style={{
                  textShadow: '0 2px 8px rgba(255, 255, 255, 0.15)',
                  letterSpacing: '0.075em',
                }}
              >
                METTUGUDA &amp; NAGARAM
              </h2>
            </div>

            {/* Tagline */}
            <div className="flex flex-col items-center gap-2 max-w-lg">
              <p
                className="text-[#5A4030] text-sm sm:text-base md:text-lg font-serif italic font-medium leading-relaxed"
                style={{ textShadow: '0 1px 2px rgba(255,255,255,0.4)' }}
              >
                Rooted in Vedic Traditions, Committed to Simple, Sacred &amp; Meaningful Marriages.
              </p>
              <div className="h-0.5 w-16 bg-[#5A4030]/20 mt-1"></div>
            </div>

            {/* Feature Icons Grid (Centered) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full justify-center mt-2">
              <div className="flex flex-col items-center gap-2">
                <div className="h-11 w-11 rounded-full bg-[#5A0F16] flex items-center justify-center text-white shadow-sm shrink-0">
                  <Flame className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-[#4A3524] text-center leading-tight">Vedic Rituals</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="h-11 w-11 rounded-full bg-[#5A0F16] flex items-center justify-center text-white shadow-sm shrink-0">
                  <Flower2 className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-[#4A3524] text-center leading-tight">Pure &amp; Traditional</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="h-11 w-11 rounded-full bg-[#5A0F16] flex items-center justify-center text-white shadow-sm shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-[#4A3524] text-center leading-tight">Simple Process</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="h-11 w-11 rounded-full bg-[#5A0F16] flex items-center justify-center text-white shadow-sm shrink-0">
                  <Handshake className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-[#4A3524] text-center leading-tight">Trust &amp; Respect</span>
              </div>
            </div>

            {/* CTA Buttons (Centered, Premium Pill-shaped layouts) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-5 w-full mt-6 max-w-4xl mx-auto">

              {/* Call Now */}
              <a
                href="tel:+918099333754"
                className="group flex-1 flex items-center gap-4 px-6 py-3.5 bg-gradient-to-br from-[#5C0D17] to-[#7A1824] hover:from-[#7A1824] hover:to-[#962230] text-white rounded-[22px] shadow-[0_10px_25px_rgba(92,13,23,0.25)] hover:shadow-[0_15px_30px_rgba(92,13,23,0.4)] border border-[#C78A2A]/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 hover:scale-[1.04] relative overflow-hidden"
              >
                {/* Glossy highlight top edge */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                {/* Glass reflections */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                {/* White circular badge with gold outline */}
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#5C0D17] border border-[#C78A2A]/30 shadow-[0_2px_6px_rgba(0,0,0,0.12)] shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
                  <Phone className="h-[18px] w-[18px] fill-current" />
                </div>

                <div className="flex flex-col items-start text-left leading-none">
                  <span className="text-[9px] uppercase font-semibold tracking-widest text-white/70 mb-1">Call Now</span>
                  <span className="text-sm font-bold tracking-wide">Click to Call</span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918099333754?text=Hello,%20I%20would%20like%20to%20book%20an%20Arya%20Samaj%20Marriage."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 flex items-center gap-4 px-6 py-3.5 bg-gradient-to-br from-[#176A3D] to-[#2A8E54] hover:from-[#2A8E54] hover:to-[#38ab69] text-white rounded-[22px] shadow-[0_10px_25px_rgba(23,106,61,0.25)] hover:shadow-[0_15px_30px_rgba(23,106,61,0.4)] border border-[#C78A2A]/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 hover:scale-[1.04] relative overflow-hidden"
              >
                {/* Glossy highlight top edge */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                {/* Glass reflections */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                {/* White circular badge with gold outline */}
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#176A3D] border border-[#C78A2A]/30 shadow-[0_2px_6px_rgba(0,0,0,0.12)] shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
                  <MessageSquare className="h-[18px] w-[18px] fill-current" />
                </div>

                <div className="flex flex-col items-start text-left leading-none">
                  <span className="text-[9px] uppercase font-semibold tracking-widest text-white/70 mb-1">WhatsApp</span>
                  <span className="text-sm font-bold tracking-wide">Chat with Us</span>
                </div>
              </a>

              {/* Booking */}
              <a
                href="https://wa.me/918099333754?text=Hello,%20I%20would%20like%20to%20book%20a%20slot%20for%20an%20Arya%20Samaj%20Marriage."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 flex items-center gap-4 px-6 py-3.5 bg-gradient-to-br from-[#C78A2A] to-[#E0A93A] hover:from-[#E0A93A] hover:to-[#f0be54] text-white rounded-[22px] shadow-[0_10px_25px_rgba(199,138,42,0.25)] hover:shadow-[0_15px_30px_rgba(199,138,42,0.4)] border border-[#C78A2A]/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 hover:scale-[1.04] relative overflow-hidden"
              >
                {/* Glossy highlight top edge */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                {/* Glass reflections */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                {/* White circular badge with gold outline */}
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#C78A2A] border border-[#C78A2A]/40 shadow-[0_2px_6px_rgba(0,0,0,0.12)] shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
                  <Calendar className="h-[18px] w-[18px]" />
                </div>

                <div className="flex flex-col items-start text-left leading-none">
                  <span className="text-[9px] uppercase font-semibold tracking-widest text-white/70 mb-1">Booking</span>
                  <span className="text-sm font-bold tracking-wide">Enquire Now</span>
                </div>
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* 2. About Us Preview */}
      <section className="py-20 bg-[#FFFDF9] border-b border-maroon-100/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 items-center">
          <span className="font-serif text-gold-600 font-bold uppercase tracking-widest text-xs">Vedic Heritage</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-700">
            About Arya Samaj Mettuguda
          </h2>
          <div className="h-0.5 w-20 bg-gold-500"></div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Established on the timeless principles of Swami Dayanand Saraswati, we conduct sacred Vedic marriage rituals. Rejecting orthodox practices, we believe in universal brotherhood, simplification of procedures, and strict compliance with the Arya Samaj Marriage Validation Act of 1937.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 border border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-white rounded-full font-bold text-sm transition-all"
          >
            <span>Learn More About Us</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 3. Services Preview */}
      <section className="py-20 bg-white border-b border-maroon-100/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="font-serif text-gold-600 font-bold uppercase tracking-widest text-xs">Sacred Rituals</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-700">
              Our Marriage Services
            </h2>
            <div className="h-0.5 w-20 bg-gold-500 mx-auto"></div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2">
              All marriages are performed with traditional Vedic rituals, including holy havan and mantra chanting, issuing a globally acceptable temple certificate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-[#FFFDF9] border border-maroon-100/30 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div className="flex flex-col gap-4">
                  <span className="font-serif text-lg font-bold text-maroon-700">
                    {service.title}
                  </span>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-maroon-100/20 mt-6 pt-4">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Consultation</p>
                    <p className="text-xs font-semibold text-emerald-600">Available</p>
                  </div>
                  <Link
                    href="/services"
                    className="flex items-center gap-1.5 text-xs font-bold text-maroon-700 hover:text-gold-600 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-bold text-maroon-700 hover:text-gold-600 transition-colors text-sm"
            >
              <span>Explore All Services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Documents Required Preview */}
      <section className="py-20 bg-[#FFFDF9] border-b border-maroon-100/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 items-center">
          <span className="font-serif text-gold-600 font-bold uppercase tracking-widest text-xs">Legal Compliance</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-700">
            Required Documents Checklist
          </h2>
          <div className="h-0.5 w-20 bg-gold-500"></div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Prior to scheduling the ceremony, both partners must prepare their statutory age proof, local address verification, and organize two adult witnesses with valid identities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left mt-4">
            <div className="bg-white border border-maroon-100/30 p-6 rounded-2xl flex flex-col gap-2">
              <FileText className="h-6 w-6 text-gold-600" />
              <h4 className="font-serif font-bold text-slate-800 text-sm">Bride Documents</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Age Proof (18+), Identity Proof, Address Proof, and 8 Photos.</p>
            </div>
            <div className="bg-white border border-maroon-100/30 p-6 rounded-2xl flex flex-col gap-2">
              <FileText className="h-6 w-6 text-gold-600" />
              <h4 className="font-serif font-bold text-slate-800 text-sm">Groom Documents</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Age Proof (21+), Identity Proof, Address Proof, and 8 Photos.</p>
            </div>
            <div className="bg-white border border-maroon-100/30 p-6 rounded-2xl flex flex-col gap-2">
              <FileText className="h-6 w-6 text-gold-600" />
              <h4 className="font-serif font-bold text-slate-800 text-sm">Witnesses</h4>
              <p className="text-xs text-slate-500 leading-relaxed">2 adult witnesses with valid Aadhar Card, PAN Card, or Passport.</p>
            </div>
          </div>

          <Link
            href="/documents-required"
            className="inline-flex items-center gap-2 px-6 py-3 bg-maroon-700 hover:bg-maroon-800 text-white rounded-full font-serif font-bold text-sm transition-all shadow-md"
          >
            <span>View Full Document Guidelines</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 5. Our Locations */}
      <section className="py-20 bg-white border-b border-maroon-100/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="font-serif text-gold-600 font-bold uppercase tracking-widest text-xs">Official Temples</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-700">
              Our Locations
            </h2>
            <div className="h-0.5 w-20 bg-gold-500 mx-auto"></div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2">
              Visit either of our two consecrated branches in Hyderabad to coordinate your ceremony details.
            </p>
          </div>

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
      </section>

      {/* 6. Image Gallery Carousel */}
      <section className="py-20 bg-[#FFFDF9] border-b border-maroon-100/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col gap-3">
            <span className="font-serif text-gold-600 font-bold uppercase tracking-widest text-xs">Vedic Celebrations</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-700">
              Temple Image Gallery
            </h2>
            <div className="h-0.5 w-20 bg-gold-500 mx-auto"></div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2">
              Browse moments from the sacred Vedic rituals conducted at our Mettuguda and Nagaram temple sites.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <HomeGalleryCarousel images={homeImages} allImages={allImages} />
          </div>
        </div>
      </section>

      {/* 6.5. Slot Booking Form Section */}
      <section className="py-20 bg-[#FFF8F0] border-b border-maroon-100/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center gap-2">
            <span className="text-[#5A0F16] text-xl font-serif">ॐ</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#5A0F16]">
              Book a Wedding Slot
            </h2>
            <div className="flex items-center justify-center gap-3 mt-1">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C78A2A]/60"></div>
              <span className="text-[#C78A2A] text-xs">◆</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C78A2A]/60"></div>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2 max-w-lg">
              Select your preferred branch, date, and marriage type. Secure your date instantly over WhatsApp.
            </p>
          </div>

          {/* Form Component */}
          <BookingForm />

        </div>
      </section>

      {/* 7. Contact Section */}
      <section className="py-16 bg-[#FFFDF9] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-maroon-900 to-maroon-950 text-white rounded-3xl p-8 md:p-12 border-t-4 border-gold-500 shadow-xl flex flex-col items-center gap-5">
            <span className="font-serif text-gold-500 font-bold uppercase tracking-widest text-xs">Immediate Assistance</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Have Questions? Speak to Our Pandits Directly
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              We are available daily from 9:00 AM to 6:00 PM to assist you with dates scheduling, document checks, and queries over Phone or WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full justify-center">
              <a
                href="tel:+918099333754"
                className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-900 rounded-full font-bold text-base shadow-lg transition-all"
              >
                Call Helpline: +91 8099333754
              </a>
              <a
                href="https://wa.me/918099333754?text=Hello,%20I%20would%20like%20to%20book%20an%20Arya%20Samaj%20Marriage."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border border-slate-400 hover:border-white text-white rounded-full font-bold text-base transition-colors"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
