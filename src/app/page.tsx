import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import type { Service } from "@/types";
import { db } from "@/lib/db";
import { getGalleryImages } from "@/lib/gallery";
import HomeGalleryCarousel from "@/components/HomeGalleryCarousel";
import BookingForm from "@/components/BookingForm";
import HeroActions from "@/components/HeroActions";
import {
  ArrowRight,
  FileText,
  Flower2,
} from "lucide-react";
import { getWhatsAppUrl } from "@/constants/business";

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
  // Fetch services from DB
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
      <section className="relative min-h-[100svh] flex items-center pt-16 pb-28 sm:py-24 overflow-hidden border-b border-maroon-100/40">

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
            <div className="flex items-center gap-3 text-[#D4AF37] font-serif">
              <div className="h-[1px] w-10 bg-[#D4AF37]/40"></div>
              <span className="text-2xl font-bold tracking-widest text-[#D4AF37]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>ॐ</span>
              <div className="h-[1px] w-10 bg-[#D4AF37]/40"></div>
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
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
                  letterSpacing: '0.075em',
                }}
              >
                METTUGUDA &amp; NAGARAM
              </h2>
            </div>

            {/* Divider 1 */}
            <div className="flex items-center gap-3 w-full max-w-md mx-auto mt-2">
              <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#D4AF37]/50"></div>
              <Flower2 className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
              <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#D4AF37]/50"></div>
            </div>

            {/* Subtitle Lines */}
            <div className="flex flex-col gap-1 items-center max-w-xl mx-auto w-full px-4">
              <p
                className="text-[#F6E7B0] text-[13px] sm:text-base md:text-lg font-semibold tracking-wide text-center"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
              >
                Simple, Legal &amp; Hassle-Free Same-Day Marriages
              </p>
              <p
                className="text-[#FFF5DD]/90 text-[10px] sm:text-sm font-medium tracking-wide text-center"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
              >
                Certified by Pandit Dr. Vishwashrawa Acharya, Sanskrit Ph.D. Priest
              </p>
            </div>

            {/* Divider 2 */}
            <div className="flex items-center gap-3 w-full max-w-md mx-auto">
              <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#D4AF37]/50"></div>
              <Flower2 className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
              <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#D4AF37]/50"></div>
            </div>

            {/* CTA Buttons — client component for modal interactivity */}
            <HeroActions />
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

      {/* 3. Image Gallery Carousel */}
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

      {/* 4. Marriage Services */}
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

      {/* 5. Documents Required Preview */}
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

      {/* 6. Slot Booking Form Section */}
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
                href={getWhatsAppUrl("Hello, I would like to book an Arya Samaj Marriage.")}
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
