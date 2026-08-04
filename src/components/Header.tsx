"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppUrl } from "@/constants/business";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/documents-required", label: "Documents Required" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change — use a ref to track prev path
  // so we only call setIsOpen when the path actually changes (avoids
  // the react-hooks/set-state-in-effect cascading-render warning).
  const prevPathnameRef = React.useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FFFDF9]/95 backdrop-blur-md shadow-md py-3"
          : "bg-[#FFFDF9] py-4 border-b border-maroon-100/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-16 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo.png"
                alt="Arya Samaj Logo"
                fill
                sizes="64px"
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-maroon-700 tracking-tight leading-none group-hover:text-maroon-800 transition-colors">
                Arya Samaj
              </h1>
              <p className="text-[10px] sm:text-xs font-sans font-medium text-slate-500 tracking-widest uppercase mt-0.5">
                Mettuguda &amp; Nagaram
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-maroon-700 bg-maroon-50/60 font-semibold"
                      : "text-slate-700 hover:text-maroon-700 hover:bg-maroon-50/30"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="tel:+918099333754"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-maroon-700 to-maroon-800 text-white font-serif font-bold text-sm shadow-md hover:shadow-lg hover:from-maroon-800 hover:to-maroon-900 active:scale-95 transition-all border border-gold-500/20"
            >
              <Phone className="h-4 w-4" />
              <span>Call Helpline</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-maroon-700 hover:bg-maroon-50/50 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#FFFDF9] border-t border-maroon-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                      isActive
                        ? "text-maroon-700 bg-maroon-50 font-bold"
                        : "text-slate-800 hover:text-maroon-700 hover:bg-maroon-50/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href="tel:+918099333754"
                  className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <Phone className="h-5 w-5 text-maroon-700" />
                  <span>Call +91 8099333754</span>
                </a>
                <a
                  href={getWhatsAppUrl("Hello, I would like to book an Arya Samaj Marriage.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-bold shadow-md text-center hover:from-emerald-700 hover:to-emerald-800 transition-all"
                >
                  <MessageSquare className="h-5 w-5 fill-current" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
