import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Flame, 
  Heart, 
  Users, 
  Handshake, 
  Sparkles
} from "lucide-react";

const siteUrl = "https://www.aryasamajamumettuguda.com";

export const metadata: Metadata = {
  title: "Marriage Services",
  description:
    "View our range of traditional Arya Samaj services including Vedic marriages, love marriages, inter-caste marriages, inter-religion marriages, and same day marriages in Hyderabad.",
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    type: "website",
    title: "Arya Samaj Marriage Services | Hyderabad",
    description:
      "Traditional Vedic marriage services in Hyderabad — love marriages, inter-caste, inter-religion, and same-day ceremonies.",
    url: `${siteUrl}/services`,
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
    title: "Arya Samaj Marriage Services | Hyderabad",
    description:
      "Traditional Vedic marriage services in Hyderabad — love marriages, inter-caste, inter-religion, and same-day ceremonies.",
    images: [`${siteUrl}/logo.png`],
  },
};

export const revalidate = 0;

export default async function ServicesPage() {
  const services = await db.service.findMany({
    orderBy: {
      title: "asc",
    },
  });

  // Helper to select icon dynamically based on service title
  const getServiceIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("samaj")) return <Flame className="h-6 w-6" />;
    if (t.includes("love")) return <Heart className="h-6 w-6 fill-current" />;
    if (t.includes("caste")) return <Handshake className="h-6 w-6" />;
    if (t.includes("religion")) return <Users className="h-6 w-6" />;
    return <Sparkles className="h-6 w-6" />;
  };

  return (
    <div className="bg-[#FFF8F0] min-h-screen text-slate-800 pb-16">
      
      {/* 1. Page Hero Banner */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-maroon-100/40 flex items-center justify-center text-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Wedding Ceremony Background"
            fill
            priority
            className="object-cover object-center"
            quality={60}
          />
          {/* Light warm ivory overlay */}
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
            Our Marriage Services
          </h1>
          {/* Breadcrumbs */}
          <nav className="flex justify-center items-center gap-2 mt-4 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-[#5A0F16] transition-colors">Home</Link>
            <span className="text-slate-400">/</span>
            <span className="text-[#5A0F16] font-bold">Services</span>
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        
        {/* 2. Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#FFFDF9] border border-maroon-100/20 rounded-[24px] p-6 md:p-8 shadow-xs hover:border-[#C78A2A]/40 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5 hover:shadow-md relative overflow-hidden group"
            >
              {/* Subtle gold decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#C78A2A]/10 transition-colors"></div>

              <div className="flex flex-col gap-4">
                {/* Large circular maroon badge with gold outline for icon */}
                <div className="h-14 w-14 rounded-full bg-[#5A0F16] text-white flex items-center justify-center shadow-md border border-[#C78A2A]/30 shrink-0 transition-transform duration-300 group-hover:scale-105">
                  {getServiceIcon(service.title)}
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="inline-flex self-start items-center gap-1 text-[9px] font-bold text-[#5A0F16] bg-[#5A0F16]/5 px-2 py-0.5 rounded border border-[#5A0F16]/10 uppercase tracking-wider">
                    Vedic Ceremony
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#5A0F16] tracking-wide">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed mt-1">
                  {service.description}
                </p>
              </div>

              {/* Card Footer with CTA buttons & procedures link */}
              <div className="flex flex-col gap-3.5 border-t border-maroon-100/10 mt-6 pt-6">
                
                {/* Horizontal call & message buttons inside each card (pill-shaped, no numbers) */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Call Now */}
                  <a
                    href="tel:+918099333754"
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-br from-[#5C0D17] to-[#7A1824] hover:from-[#7A1824] hover:to-[#962230] text-white rounded-full text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 border border-[#C78A2A]/15 shrink-0"
                  >
                    <div className="h-5 w-5 rounded-full bg-white flex items-center justify-center text-[#5C0D17] shrink-0">
                      <Phone className="h-3 w-3 fill-current" />
                    </div>
                    <span>Call Now</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/918099333754?text=Hello,%20I%20would%20like%20to%20book%20an%20Arya%20Samaj%20Marriage%20for%20${encodeURIComponent(service.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-br from-[#176A3D] to-[#2A8E54] hover:from-[#2A8E54] hover:to-[#38ab69] text-white rounded-full text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 border border-[#C78A2A]/15 shrink-0"
                  >
                    <div className="h-5 w-5 rounded-full bg-white flex items-center justify-center text-[#176A3D] shrink-0">
                      <MessageSquare className="h-3 w-3 fill-current" />
                    </div>
                    <span>WhatsApp</span>
                  </a>
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="text-[11px] font-bold text-[#5A0F16] hover:text-[#C78A2A] transition-colors flex items-center justify-center gap-1 mt-1 pt-1"
                >
                  <span>View Details &amp; Documents Required</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Legal Disclaimer Box */}
        <div className="mt-24 max-w-4xl mx-auto p-8 md:p-10 bg-[#FFFDF9] border border-[#C78A2A]/30 rounded-[28px] shadow-sm flex flex-col sm:flex-row gap-6 items-start relative overflow-hidden">
          {/* Subtle gold decoration top-right */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none"></div>

          <div className="h-12 w-12 rounded-full bg-[#5A0F16] text-white flex items-center justify-center shrink-0 shadow-md border border-[#C78A2A]/20 mt-1">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[#5A0F16] text-xs font-serif">ॐ</span>
              <h4 className="font-serif font-extrabold text-[#5A0F16] text-xl">
                Legal Validation Guaranteed
              </h4>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every marriage performed in our temple branches includes the holy fire havan and traditional mantras. The temple Marriage Certificate is valid proof of marriage under the **Arya Samaj Marriage Marriage Validation Act, 1937** and is the primary document required to apply for a Government Marriage Registration Certificate under the Hindu Marriage Act.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#176A3D]" />
                <span>Immediate Certificate Issuance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#176A3D]" />
                <span>Experienced Vedic Pandits</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
