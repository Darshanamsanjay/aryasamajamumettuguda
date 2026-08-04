import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import {
  CheckCircle2,
  FileText,
  ChevronRight,
  ShieldCheck,
  Phone,
  MessageSquare,
  ArrowLeft,
  ListOrdered,
  BookOpen
} from "lucide-react";
import { getWhatsAppUrl } from "@/constants/business";

interface ServiceProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = "https://www.aryasamajamumettuguda.com";

export async function generateMetadata({ params }: ServiceProps) {
  const { slug } = await params;
  const service = await db.service.findUnique({ where: { slug } });
  
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: `${service.title} | Arya Samaj Hyderabad`,
    description: service.description,
    alternates: { canonical: `${siteUrl}/services/${slug}` },
    openGraph: {
      type: "website",
      title: `${service.title} | Arya Samaj Hyderabad`,
      description: service.description,
      url: `${siteUrl}/services/${slug}`,
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
      title: `${service.title} | Arya Samaj Hyderabad`,
      description: service.description,
      images: [`${siteUrl}/logo.png`],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceProps) {
  const { slug } = await params;
  const service = await db.service.findUnique({
    where: { slug },
  });

  if (!service) {
    notFound();
  }

  // Helper to split text by newline and filter out empty strings
  const parseList = (text: string) => {
    return text.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
  };

  const eligibility = parseList(service.eligibility);
  const documents = parseList(service.documents);
  const benefits = parseList(service.benefits);
  const steps = parseList(service.steps);

  return (
    <div className="bg-[#FFF8F0] min-h-screen text-slate-800 pb-16">
      
      {/* 1. Page Hero Banner */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-maroon-100/40 flex items-center justify-center text-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Wedding Mandap Detail Background"
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
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#5A0F16] uppercase tracking-wider leading-tight">
            {service.title}
          </h1>
          {/* Breadcrumbs */}
          <nav className="flex justify-center items-center gap-2 mt-4 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-[#5A0F16] transition-colors">Home</Link>
            <span className="text-slate-400">/</span>
            <Link href="/services" className="hover:text-[#5A0F16] transition-colors">Services</Link>
            <span className="text-slate-400">/</span>
            <span className="text-[#5A0F16] font-bold">Details</span>
          </nav>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#5A0F16] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Services</span>
        </Link>

        {/* 2. Main Detail Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Ceremony Details */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Overview Card */}
            <div className="bg-[#FFFDF9] border border-maroon-100/20 rounded-[24px] p-8 md:p-10 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none"></div>

              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#5A0F16] flex items-center gap-2.5">
                  <BookOpen className="h-5 w-5 text-[#C78A2A]" />
                  <span>Service Overview</span>
                </h2>
                <div className="h-0.5 w-12 bg-[#C78A2A]/60 mt-1"></div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-6 whitespace-pre-line">
                {service.overview}
              </p>
            </div>

            {/* Steps & Procedure Card */}
            <div className="bg-[#FFFDF9] border border-maroon-100/20 rounded-[24px] p-8 md:p-10 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none"></div>

              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#5A0F16] flex items-center gap-2.5">
                  <ListOrdered className="h-5 w-5 text-[#C78A2A]" />
                  <span>Ceremony Steps &amp; Procedure</span>
                </h2>
                <div className="h-0.5 w-12 bg-[#C78A2A]/60 mt-1"></div>
              </div>

              <div className="flex flex-col gap-5 mt-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    {/* Index circular badge */}
                    <div className="h-8 w-8 rounded-full bg-[#5A0F16] text-white flex items-center justify-center font-bold text-xs shrink-0 border border-[#C78A2A]/20 shadow-xs">
                      {index + 1}
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Card */}
            <div className="bg-[#FFFDF9] border border-maroon-100/20 rounded-[24px] p-8 md:p-10 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none"></div>

              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-[#5A0F16] flex items-center gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-[#C78A2A]" />
                  <span>Key Benefits</span>
                </h2>
                <div className="h-0.5 w-12 bg-[#C78A2A]/60 mt-1"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3 bg-[#FFF8F0]/70 p-4 border border-maroon-100/10 rounded-xl items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#176A3D] shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Checklists & Booking Assistance Widget */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Eligibility Requirements Card */}
            <div className="bg-[#FFFDF9] border border-maroon-100/20 rounded-[24px] p-6 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none"></div>

              <h3 className="font-serif text-lg font-bold text-[#5A0F16] mb-4 pb-2 border-b border-maroon-100/10">
                Eligibility Criteria
              </h3>
              <ul className="space-y-3.5">
                {eligibility.map((item, index) => (
                  <li key={index} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#C78A2A] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents Card (Gold bordered) */}
            <div className="bg-[#FFFDF9] border-2 border-[#C78A2A]/30 rounded-[24px] p-6 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none"></div>

              <h3 className="font-serif text-lg font-bold text-[#5A0F16] mb-4 pb-2 border-b border-maroon-100/10 flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#C78A2A]" />
                <span>Documents Needed</span>
              </h3>
              <ul className="space-y-3.5">
                {documents.map((item, index) => (
                  <li key={index} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#C78A2A] shrink-0 mt-2"></div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-5 pt-4 border-t border-maroon-100/10">
                <Link
                  href="/documents-required"
                  className="text-xs font-bold text-[#5A0F16] hover:text-[#C78A2A] flex items-center gap-1.5 transition-colors"
                >
                  <span>View Unified Document Guide</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Helpline Booking Widget (Pill shaped buttons, no numbers) */}
            <div className="bg-[#FFFDF9] border border-maroon-100/20 p-6 rounded-[24px] shadow-xs flex flex-col gap-4 relative overflow-hidden">
              <div>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Inquiries &amp; Assistance</p>
                <p className="text-lg font-bold text-[#5A0F16] font-serif">Helpline Desk</p>
                <p className="text-xs text-slate-500 mt-1 leading-normal">Speak directly to our administrative team for slots and queries.</p>
              </div>
              
              <div className="flex flex-col gap-3 mt-1">
                {/* Call Helpline */}
                <a
                  href="tel:+918099333754"
                  className="group w-full flex items-center justify-center gap-3 py-3 bg-gradient-to-br from-[#5C0D17] to-[#7A1824] hover:from-[#7A1824] hover:to-[#962230] text-white rounded-full text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 border border-[#C78A2A]/15 shrink-0"
                >
                  <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[#5C0D17] shrink-0">
                    <Phone className="h-3 w-3 fill-current" />
                  </div>
                  <span>Click to Call</span>
                </a>

                {/* WhatsApp Inquiry */}
                <a
                  href={getWhatsAppUrl(`Hello, I would like to book an Arya Samaj Marriage for ${service.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full flex items-center justify-center gap-3 py-3 bg-gradient-to-br from-[#176A3D] to-[#2A8E54] hover:from-[#2A8E54] hover:to-[#38ab69] text-white rounded-full text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 border border-[#C78A2A]/15 shrink-0"
                >
                  <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[#176A3D] shrink-0">
                    <MessageSquare className="h-3 w-3 fill-current" />
                  </div>
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
