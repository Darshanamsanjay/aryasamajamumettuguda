import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { UserCheck, ShieldAlert, Users, CheckCircle2, Phone, MessageSquare } from "lucide-react";
import { getWhatsAppUrl } from "@/constants/business";

const siteUrl = "https://www.aryasamajamumettuguda.com";

export const metadata: Metadata = {
  title: "Documents Required",
  description:
    "Complete checklist of documents required for Arya Samaj marriage in Hyderabad. Age proofs, identity documents, witness criteria, and special case requirements.",
  alternates: { canonical: `${siteUrl}/documents-required` },
  openGraph: {
    type: "website",
    title: "Documents Required for Arya Samaj Marriage | Legal Checklist",
    description:
      "Complete checklist of documents required for Arya Samaj marriage in Hyderabad. Age proofs, identity documents, and witness criteria.",
    url: `${siteUrl}/documents-required`,
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
    title: "Documents Required for Arya Samaj Marriage | Legal Checklist",
    description:
      "Complete checklist of documents required for Arya Samaj marriage in Hyderabad. Age proofs, identity documents, and witness criteria.",
    images: [`${siteUrl}/logo.png`],
  },
};

export default function DocumentsRequired() {
  return (
    <div className="bg-[#FFF8F0] min-h-screen text-slate-800 pb-16">
      
      {/* 1. Page Hero Banner */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-maroon-100/40 flex items-center justify-center text-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Vedic Wedding Havan Background"
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
            Required Documents
          </h1>
          {/* Breadcrumbs */}
          <nav className="flex justify-center items-center gap-2 mt-4 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-[#5A0F16] transition-colors">Home</Link>
            <span className="text-slate-400">/</span>
            <span className="text-[#5A0F16] font-bold">Documents Checklist</span>
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        
        {/* Sub-header instruction */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-2">
          <span className="text-[#5A0F16] text-xl font-serif">ॐ</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#5A0F16]">
            Wedding Checklist Protocol
          </h2>
          <div className="flex items-center justify-center gap-3 mt-1">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C78A2A]/60"></div>
            <span className="text-[#C78A2A] text-xs">◆</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C78A2A]/60"></div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mt-2 max-w-lg">
            Please prepare all the following documents before your wedding day to ensure a smooth, legally compliant ceremony and immediate certificate issuance.
          </p>
        </div>

        {/* 2. Document Checklists Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          
          {/* Card 1: Bride Documents */}
          <div className="bg-[#FFFDF9] border border-maroon-100/20 rounded-[24px] p-6 md:p-8 shadow-xs relative overflow-hidden group hover:border-[#C78A2A]/40 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none"></div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#5A0F16] text-white flex items-center justify-center border border-[#C78A2A]/30 shadow-xs shrink-0">
                <UserCheck className="h-5 w-5" />
              </div>
              <h3 className="font-serif font-extrabold text-[#5A0F16] text-lg">
                Bride Checklist
              </h3>
            </div>
            
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-col gap-2.5 bg-[#FFF8EB]/70 p-4 border border-maroon-100/10 rounded-xl leading-relaxed">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#C78A2A]" />
                  <span>1. Age Proof (Any One)</span>
                </span>
                <p className="text-xs text-slate-600 pl-6">Aadhar Card, Birth Certificate, School Study Certificate, 10th Marks Memo, or Passport.</p>
                <span className="text-[10px] text-rose-600 font-bold pl-6 uppercase tracking-wider">Statutory Age: 18 Years or Older</span>
              </div>
              
              <div className="flex flex-col gap-2.5 bg-[#FFF8EB]/70 p-4 border border-maroon-100/10 rounded-xl leading-relaxed">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#C78A2A]" />
                  <span>2. Identity &amp; Address (Any One)</span>
                </span>
                <p className="text-xs text-slate-600 pl-6">Aadhar Card, Voter ID Card, Passport, or Driving License.</p>
              </div>

              <div className="flex flex-col gap-2.5 bg-[#FFF8EB]/70 p-4 border border-maroon-100/10 rounded-xl leading-relaxed">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#C78A2A]" />
                  <span>3. Photographs</span>
                </span>
                <p className="text-xs text-slate-600 pl-6">8 recent individual passport-size color photographs.</p>
              </div>
            </div>
          </div>

          {/* Card 2: Groom Documents */}
          <div className="bg-[#FFFDF9] border border-maroon-100/20 rounded-[24px] p-6 md:p-8 shadow-xs relative overflow-hidden group hover:border-[#C78A2A]/40 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none"></div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#5A0F16] text-white flex items-center justify-center border border-[#C78A2A]/30 shadow-xs shrink-0">
                <UserCheck className="h-5 w-5" />
              </div>
              <h3 className="font-serif font-extrabold text-[#5A0F16] text-lg">
                Groom Checklist
              </h3>
            </div>
            
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-col gap-2.5 bg-[#FFF8EB]/70 p-4 border border-maroon-100/10 rounded-xl leading-relaxed">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#C78A2A]" />
                  <span>1. Age Proof (Any One)</span>
                </span>
                <p className="text-xs text-slate-600 pl-6">Aadhar Card, Birth Certificate, School Study Certificate, 10th Marks Memo, or Passport.</p>
                <span className="text-[10px] text-rose-600 font-bold pl-6 uppercase tracking-wider">Statutory Age: 21 Years or Older</span>
              </div>
              
              <div className="flex flex-col gap-2.5 bg-[#FFF8EB]/70 p-4 border border-maroon-100/10 rounded-xl leading-relaxed">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#C78A2A]" />
                  <span>2. Identity &amp; Address (Any One)</span>
                </span>
                <p className="text-xs text-slate-600 pl-6">Aadhar Card, Voter ID Card, Passport, or Driving License.</p>
              </div>

              <div className="flex flex-col gap-2.5 bg-[#FFF8EB]/70 p-4 border border-maroon-100/10 rounded-xl leading-relaxed">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#C78A2A]" />
                  <span>3. Photographs</span>
                </span>
                <p className="text-xs text-slate-600 pl-6">8 recent individual passport-size color photographs.</p>
              </div>
            </div>
          </div>

          {/* Card 3: Witness Documents */}
          <div className="bg-[#FFFDF9] border border-maroon-100/20 rounded-[24px] p-6 md:p-8 shadow-xs relative overflow-hidden group hover:border-[#C78A2A]/40 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none"></div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#5A0F16] text-white flex items-center justify-center border border-[#C78A2A]/30 shadow-xs shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-serif font-extrabold text-[#5A0F16] text-lg">
                Witness Requirements
              </h3>
            </div>
            
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-col gap-2.5 bg-[#FFF8EB]/70 p-4 border border-maroon-100/10 rounded-xl leading-relaxed">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#C78A2A]" />
                  <span>1. Number of Witnesses</span>
                </span>
                <p className="text-xs text-slate-600 pl-6">Exactly 2 adult witnesses are required. They can be parents, relatives, or friends.</p>
              </div>
              
              <div className="flex flex-col gap-2.5 bg-[#FFF8EB]/70 p-4 border border-maroon-100/10 rounded-xl leading-relaxed">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#C78A2A]" />
                  <span>2. Identity Proof (Any One)</span>
                </span>
                <p className="text-xs text-slate-600 pl-6">Aadhar Card, PAN Card, Voter ID Card, or Passport of both witnesses.</p>
              </div>

              <div className="flex flex-col gap-2.5 bg-[#FFF8EB]/70 p-4 border border-maroon-100/10 rounded-xl leading-relaxed">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#C78A2A]" />
                  <span>3. Physical Presence</span>
                </span>
                <p className="text-xs text-slate-600 pl-6">Both witnesses must be physically present throughout the ceremony and sign the temple marriage registry.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Special Cases Card */}
        <div className="bg-[#FFFDF9] border border-maroon-100/20 rounded-[24px] p-6 md:p-8 max-w-6xl mx-auto shadow-xs flex flex-col gap-6 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none"></div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#5A0F16] text-white flex items-center justify-center border border-[#C78A2A]/30 shadow-xs shrink-0">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="font-serif font-extrabold text-[#5A0F16] text-lg">
              Special Case Additions
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-maroon-100/10 pt-6">
            <div className="flex flex-col gap-1.5 bg-[#FFF8EB]/70 p-4 border border-maroon-100/10 rounded-xl leading-relaxed">
              <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#C78A2A]" />
                <span>1. Divorced Individuals</span>
              </span>
              <p className="text-xs text-slate-600 pl-6">A certified copy of the Divorce Decree issued by the family court is mandatory.</p>
            </div>
            <div className="flex flex-col gap-1.5 bg-[#FFF8EB]/70 p-4 border border-maroon-100/10 rounded-xl leading-relaxed">
              <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#C78A2A]" />
                <span>2. Widowed Individuals</span>
              </span>
              <p className="text-xs text-slate-600 pl-6">Death Certificate of the deceased spouse is required.</p>
            </div>
          </div>
        </div>

        {/* 4. Action Card */}
        <div className="bg-gradient-to-br from-[#5C0D17] to-[#7A1824] text-white rounded-[28px] p-8 md:p-12 text-center flex flex-col items-center gap-5 border-t-4 border-[#E0A93A] shadow-xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-white/5 to-transparent rounded-full blur-xl pointer-events-none"></div>

          <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#E0A93A] tracking-wide">
            Have Questions About Documents?
          </h2>
          <p className="text-slate-200 text-sm max-w-xl leading-relaxed">
            Avoid procedural errors by consulting our pandits. Reach out over Phone or WhatsApp for document reviews.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full mt-4 max-w-lg mx-auto">
            {/* Call Now */}
            <a
              href="tel:+918099333754"
              className="group flex-1 flex items-center justify-center gap-3 px-5 py-3 bg-white text-[#5C0D17] hover:bg-[#FFF6E5] rounded-full text-xs font-bold shadow-md transition-all duration-200 active:scale-95 border border-[#C78A2A]/20 shrink-0"
            >
              <div className="h-7 w-7 rounded-full bg-[#5C0D17] flex items-center justify-center text-white shrink-0">
                <Phone className="h-3 w-3 fill-current" />
              </div>
              <span>Click to Call</span>
            </a>

            {/* WhatsApp */}
            <a
              href={getWhatsAppUrl("Hello, I would like to inquire about documents required.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 flex items-center justify-center gap-3 px-5 py-3 bg-gradient-to-br from-[#176A3D] to-[#2A8E54] hover:from-[#2A8E54] hover:to-[#38ab69] text-white rounded-full text-xs font-bold shadow-md transition-all duration-200 active:scale-95 border border-[#C78A2A]/20 shrink-0"
            >
              <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center text-[#176A3D] shrink-0">
                <MessageSquare className="h-3.5 w-3.5 fill-current" />
              </div>
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
