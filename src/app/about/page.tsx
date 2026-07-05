import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";

const siteUrl = "https://www.aryasamajamumettuguda.com";

export const metadata: Metadata = {
  title: "About Our Vedic Priest",
  description:
    "Learn about Pandit Dr. Vishwashrawa Acharya, a highly respected Sanskrit scholar and Vedic priest in Hyderabad conducting authentic Arya Samaj weddings.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    type: "website",
    title: "About Our Vedic Priest | Arya Samaj Hyderabad",
    description:
      "Learn about Pandit Dr. Vishwashrawa Acharya, conducting authentic Arya Samaj Vedic weddings in Hyderabad.",
    url: `${siteUrl}/about`,
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
    title: "About Our Vedic Priest | Arya Samaj Hyderabad",
    description:
      "Learn about Pandit Dr. Vishwashrawa Acharya, conducting authentic Arya Samaj Vedic weddings in Hyderabad.",
    images: [`${siteUrl}/logo.png`],
  },
};

export default function AboutPage() {
  const credentials = [
    "M.A. in Sanskrit & Hindi",
    "Master of Education (M.Ed.)",
    "Ph.D. in Sanskrit (Sanskrit Lecturer)",
    "Vaidik Pracharak",
    "Vaidik Priest",
  ];

  return (
    <div className="bg-[#FFF8F0] min-h-screen text-slate-800 pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-20">
        
        {/* Main Priest Card */}
        <div className="bg-[#FFFDF9] border border-maroon-100/30 rounded-[32px] p-8 md:p-12 shadow-md hover:shadow-lg transition-all duration-300 max-w-3xl mx-auto relative overflow-hidden">
          {/* Subtle gold decoration top-right */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C78A2A]/5 to-transparent rounded-bl-full pointer-events-none"></div>

          {/* Centered Content */}
          <div className="text-center flex flex-col items-center gap-6">
            <div>
              <span className="text-[#5A0F16] text-sm font-serif">ॐ</span>
              <p className="text-gold-600 font-bold uppercase tracking-widest text-xs mt-1">
                Our Vedic Priest
              </p>
              <h1 className="font-serif text-3xl sm:text-4.5xl font-bold text-maroon-700 mt-2 mb-3 leading-tight">
                Pandit Dr. Vishwashrawa Acharya
              </h1>
              <div className="h-0.5 w-24 bg-[#C78A2A]/60 mx-auto"></div>
            </div>

            {/* Biography Content (Inter font, centered, line-height relaxed) */}
            <div className="flex flex-col gap-6 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-center font-sans">
              <p>
                Arya Samaj weddings are solemnized under the guidance of{" "}
                <strong className="text-maroon-800 font-bold">Pandit Dr. Vishwashrawa Acharya</strong>, a highly respected Sanskrit scholar and Vedic priest in Hyderabad.
              </p>
              <p>
                With decades of religious teaching and social service, Dr. Vishwashrawa Acharya performs Vedic rituals in their truest and most authentic forms. He explains the moral, physical, and spiritual significance of every marriage vow, helping couples understand the deeper meaning and values behind the sacred ceremony.
              </p>
            </div>

            {/* Separator / Ornament */}
            <div className="w-full max-w-xs flex items-center justify-center gap-3 my-2">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-[#C78A2A]/30"></div>
              <span className="text-[#C78A2A]/40 text-xs">◆</span>
              <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-[#C78A2A]/30"></div>
            </div>

            {/* Credentials Title */}
            <div className="w-full max-w-lg">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-maroon-700 mb-6 tracking-wide">
                Academic Credentials & Honors
              </h2>
              
              {/* Checklist Grid */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-md mx-auto font-sans text-sm text-slate-700">
                {credentials.map((cred, index) => (
                  <li key={index} className="flex gap-3 items-center">
                    <div className="h-6 w-6 rounded-full bg-amber-50 border border-gold-500/30 flex items-center justify-center text-gold-600 shrink-0">
                      <Check className="h-4 w-4 stroke-[3]" />
                    </div>
                    <span className="font-medium text-slate-700 leading-snug">{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Home Link */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-maroon-700 transition-colors uppercase tracking-widest"
          >
            <span>Back to Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
