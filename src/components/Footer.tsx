import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t-4 border-maroon-700">
      {/* Top Banner: Legal Accreditation / Trust */}
      <div className="bg-maroon-900/10 border-b border-maroon-900/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-maroon-700/20 text-gold-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="font-serif font-bold text-white text-base">
                100% Legally Valid Vedic Ceremonies
              </p>
              <p className="text-xs text-slate-400">
                Certified and registered under the Arya Samaj Marriage Validation Act, 1937.
              </p>
            </div>
          </div>
          <Link
            href="/documents-required"
            className="text-xs font-semibold text-gold-500 hover:text-gold-600 bg-maroon-700/10 border border-gold-500/30 px-4 py-2 rounded-full transition-all"
          >
            View Required Documents &rarr;
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Organization Intro */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-8 w-12">
                <Image
                  src="/logo.png"
                  alt="Arya Samaj Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-lg font-bold text-white">Arya Samaj</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Conducting sacred Vedic marriages and religious rituals in Secunderabad and Hyderabad. We follow the 10 core principles of Swami Dayanand Saraswati, rejecting orthodoxy to promote universal brotherhood.
            </p>
            <div className="mt-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 p-3 rounded-lg leading-relaxed">
              <span className="font-bold text-white block mb-1">Legal Status:</span>
              Marriages solemnized in our temples are legally recognized under the Arya Samaj Marriage Validation Act, 1937.
            </div>
          </div>

          {/* Column 2: Branch 1 - Nagaram */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-white font-bold text-lg border-b border-slate-800 pb-2">
              Nagaram Branch
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  H.No. 4-13/6/A/1, Road No. 5/4, West Gandhi Nagar, Nagaram, Keesara, Medchal-Malkajgiri, Hyderabad – 500083
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-gold-500 shrink-0" />
                <a href="tel:+918099333754" className="hover:text-gold-500 transition-colors font-semibold">
                  +91 8099333754
                </a>
              </li>
              <li className="flex gap-3 items-center text-slate-400">
                <Clock className="h-5 w-5 text-gold-500 shrink-0" />
                <span>10:00 AM - 05:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Branch 2 - Mettuguda */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-white font-bold text-lg border-b border-slate-800 pb-2">
              Mettuguda Branch
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  12-8-390/A & B, Near Pillar No.1122, Mettuguda, Secunderabad, Hyderabad – 500017
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-gold-500 shrink-0" />
                <a href="tel:+918099333754" className="hover:text-gold-500 transition-colors font-semibold">
                  +91 8099333754
                </a>
              </li>
              <li className="flex gap-3 items-center text-slate-400">
                <Clock className="h-5 w-5 text-gold-500 shrink-0" />
                <span>10:00 AM - 05:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-white font-bold text-lg border-b border-slate-800 pb-2">
              Useful Links
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/about" className="hover:text-gold-500 transition-colors py-1">About Us</Link>
              <Link href="/services" className="hover:text-gold-500 transition-colors py-1">Services</Link>
              <Link href="/documents-required" className="hover:text-gold-500 transition-colors py-1">Documents Required</Link>
              <Link href="/contact" className="hover:text-gold-500 transition-colors py-1">Contact Us</Link>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col items-center justify-center text-center gap-2">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Arya Samaj. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Designed by{" "}
            <a
              href="https://www.instagram.com/darshanam_sanjay/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-500 hover:text-gold-400 transition-colors"
            >
              Sanjay Darshanam
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
