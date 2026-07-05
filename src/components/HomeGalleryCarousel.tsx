"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  src: string;
  width: number;
  height: number;
}

interface HomeGalleryCarouselProps {
  images: GalleryImage[];
  allImages: GalleryImage[];
}

export default function HomeGalleryCarousel({ images = [], allImages = [] }: HomeGalleryCarouselProps) {
  // Carousel active index state
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Modal states
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Full-screen Gallery Grid states
  const [isAllPhotosOpen, setIsAllPhotosOpen] = useState(false);
  const [activeGridLightboxIndex, setActiveGridLightboxIndex] = useState<number | null>(null);

  // Swipe states for main carousel
  const [carouselTouchStart, setCarouselTouchStart] = useState<number | null>(null);
  const [carouselTouchEnd, setCarouselTouchEnd] = useState<number | null>(null);

  // Swipe states for carousel lightbox
  const [lbTouchStart, setLbTouchStart] = useState<number | null>(null);
  const [lbTouchEnd, setLbTouchEnd] = useState<number | null>(null);

  // Swipe states for grid lightbox
  const [gridLbTouchStart, setGridLbTouchStart] = useState<number | null>(null);
  const [gridLbTouchEnd, setGridLbTouchEnd] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Carousel Autoplay: every 4 seconds, reset when slide changes
  useEffect(() => {
    if (images.length === 0 || isAllPhotosOpen || isLightboxOpen) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [nextSlide, activeIndex, images.length, isAllPhotosOpen, isLightboxOpen]);

  // Unified Keyboard event listener for carousel lightbox, grid modal, and sub-lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeGridLightboxIndex !== null) {
          setActiveGridLightboxIndex(null);
        } else if (isAllPhotosOpen) {
          setIsAllPhotosOpen(false);
        } else if (isLightboxOpen) {
          setIsLightboxOpen(false);
        }
      } else if (e.key === "ArrowRight") {
        if (activeGridLightboxIndex !== null) {
          setActiveGridLightboxIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : null));
        } else if (isLightboxOpen) {
          setLightboxIndex((prev) => (prev + 1) % images.length);
        }
      } else if (e.key === "ArrowLeft") {
        if (activeGridLightboxIndex !== null) {
          setActiveGridLightboxIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : null));
        } else if (isLightboxOpen) {
          setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
        }
      }
    };

    if (isLightboxOpen || isAllPhotosOpen || activeGridLightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent page scrolling
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, isAllPhotosOpen, activeGridLightboxIndex, images.length, allImages.length]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full flex items-center justify-center py-12 text-slate-500 font-serif">
        No images found in the gallery.
      </div>
    );
  }

  // Carousel touch handlers
  const handleCarouselTouchStart = (e: React.TouchEvent) => {
    setCarouselTouchEnd(null);
    setCarouselTouchStart(e.targetTouches[0].clientX);
  };

  const handleCarouselTouchMove = (e: React.TouchEvent) => {
    setCarouselTouchEnd(e.targetTouches[0].clientX);
  };

  const handleCarouselTouchEnd = () => {
    if (!carouselTouchStart || !carouselTouchEnd) return;
    const distance = carouselTouchStart - carouselTouchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Carousel Lightbox touch handlers
  const handleLbTouchStart = (e: React.TouchEvent) => {
    setLbTouchEnd(null);
    setLbTouchStart(e.targetTouches[0].clientX);
  };

  const handleLbTouchMove = (e: React.TouchEvent) => {
    setLbTouchEnd(e.targetTouches[0].clientX);
  };

  const handleLbTouchEnd = () => {
    if (!lbTouchStart || !lbTouchEnd) return;
    const distance = lbTouchStart - lbTouchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      setLightboxIndex((prev) => (prev + 1) % images.length);
    } else if (distance < -minSwipeDistance) {
      setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Grid Lightbox touch handlers
  const handleGridLbTouchStart = (e: React.TouchEvent) => {
    setGridLbTouchEnd(null);
    setGridLbTouchStart(e.targetTouches[0].clientX);
  };

  const handleGridLbTouchMove = (e: React.TouchEvent) => {
    setGridLbTouchEnd(e.targetTouches[0].clientX);
  };

  const handleGridLbTouchEnd = () => {
    if (!gridLbTouchStart || !gridLbTouchEnd) return;
    const distance = gridLbTouchStart - gridLbTouchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      setActiveGridLightboxIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : null));
    } else if (distance < -minSwipeDistance) {
      setActiveGridLightboxIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : null));
    }
  };

  // Get image title dynamically
  const getImageTitle = (src: string) => {
    const match = src.match(/\/gallery\/(\d+)\./);
    const num = match ? match[1] : "";
    return `Vedic Ceremony Rituals - Image ${num}`;
  };

  return (
    <div className="relative w-full flex flex-col items-center gap-6">
      {/* 1. Centered featured image carousel with side previews */}
      <div 
        className="w-full relative overflow-hidden py-4 select-none [--slide-w:78%] [--slide-gap:16px] [--slide-offset:11%] md:[--slide-w:55%] md:[--slide-gap:24px] md:[--slide-offset:22.5%]"
        onTouchStart={handleCarouselTouchStart}
        onTouchMove={handleCarouselTouchMove}
        onTouchEnd={handleCarouselTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            gap: "var(--slide-gap)",
            transform: `translateX(calc(var(--slide-offset) - ${activeIndex} * var(--slide-w) - ${activeIndex} * var(--slide-gap)))`
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => {
                if (i === activeIndex) {
                  setLightboxIndex(activeIndex);
                  setIsLightboxOpen(true);
                } else {
                  setActiveIndex(i);
                }
              }}
              className={`relative shrink-0 w-[var(--slide-w)] h-[300px] sm:h-[320px] md:h-[480px] rounded-[16px] md:rounded-[20px] overflow-hidden transition-all duration-500 shadow-md hover:shadow-lg cursor-pointer ${
                i === activeIndex
                  ? "scale-100 opacity-100 border border-gold-500/60 shadow-gold-500/10"
                  : "scale-[0.92] opacity-40 blur-[0.5px]"
              }`}
            >
              <Image
                src={img.src}
                alt={`Vedic Celebration Slide ${i + 1}`}
                fill
                sizes="(max-width: 768px) 80vw, 55vw"
                className="object-cover transition-transform duration-750 ease-out hover:scale-105"
                priority={i === 0} // Only preload the first visible image
                loading={i !== 0 ? "lazy" : undefined}
              />
              {i === activeIndex && (
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/75 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-serif text-xs font-semibold tracking-wide flex items-center gap-1.5 bg-maroon-950/50 backdrop-blur-xs px-4 py-2 rounded-full border border-gold-500/25">
                    <ZoomIn className="h-4 w-4 text-gold-500" />
                    Click to view full image
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Elegant Previous / Next Navigation Arrows */}
        <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="p-2.5 md:p-3 bg-white/95 hover:bg-white text-maroon-700 hover:text-maroon-800 rounded-full border border-maroon-100 shadow-md hover:shadow-lg transition-all flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer hover:border-gold-500/50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="p-2.5 md:p-3 bg-white/95 hover:bg-white text-maroon-700 hover:text-maroon-800 rounded-full border border-maroon-100 shadow-md hover:shadow-lg transition-all flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer hover:border-gold-500/50"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex ? "bg-[#5A0F16] w-5" : "bg-slate-300 hover:bg-slate-400 w-2"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* "View All Photos" Action Button */}
      {allImages && allImages.length > 0 && (
        <button
          onClick={() => setIsAllPhotosOpen(true)}
          className="mt-2 px-6 py-3 rounded-full bg-gradient-to-r from-maroon-700 to-maroon-800 text-white font-serif font-bold text-sm shadow-md hover:shadow-lg hover:from-maroon-800 hover:to-maroon-900 active:scale-95 transition-all border border-gold-500/20 cursor-pointer flex items-center gap-2 group"
        >
          <span>View All Photos</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 text-gold-500" />
        </button>
      )}

      {/* 2. Carousel Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setIsLightboxOpen(false)}
            onTouchStart={handleLbTouchStart}
            onTouchMove={handleLbTouchMove}
            onTouchEnd={handleLbTouchEnd}
          >
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
              }}
              className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % images.length);
              }}
              className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image Container with Crossfade Transition */}
            <div
              className="relative max-w-4xl max-h-[75vh] w-full aspect-[4/3] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={images[lightboxIndex].src}
                      alt={getImageTitle(images[lightboxIndex].src)}
                      fill
                      className="object-contain"
                      quality={100}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Lightbox Footer Details */}
              <div className="absolute bottom-[-60px] left-0 right-0 flex flex-col items-center gap-1">
                <p className="text-white/95 font-serif text-base md:text-lg tracking-wide bg-black/40 backdrop-blur-xs py-1 px-4 rounded-full">
                  {getImageTitle(images[lightboxIndex].src)}
                </p>
                <p className="text-white/60 text-xs font-sans tracking-widest font-semibold mt-1">
                  {lightboxIndex + 1} / {images.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Full-Screen Photo Gallery Grid Modal */}
      <AnimatePresence>
        {isAllPhotosOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-[#FFF8F0]/95 backdrop-blur-md overflow-y-auto p-4 sm:p-10 flex justify-center cursor-zoom-out"
            onClick={() => setIsAllPhotosOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-7xl relative bg-[#FFFDF9] rounded-[24px] p-6 sm:p-10 shadow-2xl border border-maroon-100/30 my-6 flex flex-col gap-8 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsAllPhotosOpen(false)}
                className="absolute top-6 right-6 p-2 bg-maroon-50 hover:bg-maroon-100 text-maroon-700 rounded-full transition-all cursor-pointer border border-maroon-100 shadow-sm hover:border-gold-500/50"
                aria-label="Close Gallery"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Gallery Header */}
              <div className="text-center max-w-xl mx-auto flex flex-col items-center gap-2 mt-4 select-none">
                <span className="text-[#5A0F16] text-xl font-serif">ॐ</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#5A0F16] tracking-wide uppercase">
                  Vedic Celebrations Photo Gallery
                </h2>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C78A2A]/60"></div>
                  <span className="text-[#C78A2A] text-xs">◆</span>
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C78A2A]/60"></div>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Browse all moments from sacred Vedic marriages and Havan rituals at our temple sites.
                </p>
              </div>

              {/* Masonry Columns Grid (Aspect Ratio Maintained, Uncropped) */}
              <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveGridLightboxIndex(index)}
                    className="break-inside-avoid bg-[#FFFDF9] rounded-[16px] overflow-hidden border border-maroon-100/20 shadow-sm hover:shadow-md hover:border-gold-500/40 transition-all duration-300 group cursor-zoom-in relative flex flex-col"
                  >
                    <div className="relative overflow-hidden w-full h-auto">
                      <Image
                        src={img.src}
                        alt={getImageTitle(img.src)}
                        width={img.width}
                        height={img.height}
                        className="w-full h-auto rounded-[16px] transition-transform duration-500 group-hover:scale-[1.025]"
                        loading="lazy"
                        quality={100}
                      />
                      {/* Premium hover highlight */}
                      <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 rounded-[16px]">
                        <span className="text-white font-serif text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1 bg-maroon-950/40 backdrop-blur-xs px-3 py-1.5 rounded-full border border-gold-500/20">
                          <ZoomIn className="h-3.5 w-3.5 text-gold-500" />
                          View Image
                        </span>
                      </div>
                    </div>
                    {/* Small Traditional Card Footer */}
                    <div className="p-3.5 border-t border-maroon-100/10 bg-[#FFFDF9] flex justify-between items-center rounded-b-[16px] select-none">
                      <span className="text-xs font-semibold text-slate-500 tracking-wider">
                        IMAGE {img.src.match(/\/gallery\/(\d+)\./)?.[1] || index + 1}
                      </span>
                      <span className="font-serif text-[10px] text-gold-600 font-bold uppercase tracking-widest">
                        ॐ ARYA SAMAJ
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Sub-Lightbox for Grid Overlay View */}
      <AnimatePresence>
        {activeGridLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-110 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md cursor-zoom-out"
            onClick={() => setActiveGridLightboxIndex(null)}
            onTouchStart={handleGridLbTouchStart}
            onTouchMove={handleGridLbTouchMove}
            onTouchEnd={handleGridLbTouchEnd}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveGridLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveGridLightboxIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : null));
              }}
              className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveGridLightboxIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : null));
              }}
              className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image Container with Crossfade Transition */}
            <div
              className="relative max-w-4xl max-h-[75vh] w-full aspect-[4/3] flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeGridLightboxIndex}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={allImages[activeGridLightboxIndex].src}
                      alt={getImageTitle(allImages[activeGridLightboxIndex].src)}
                      fill
                      className="object-contain"
                      quality={100}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Lightbox Footer Details */}
              <div className="absolute bottom-[-60px] left-0 right-0 flex flex-col items-center gap-1 select-none">
                <p className="text-white/90 font-serif text-base md:text-lg tracking-wide bg-black/40 backdrop-blur-xs py-1 px-4 rounded-full">
                  {getImageTitle(allImages[activeGridLightboxIndex].src)}
                </p>
                <p className="text-white/60 text-xs font-sans tracking-widest font-semibold mt-1">
                  {activeGridLightboxIndex + 1} / {allImages.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
