"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image"; // ✅ Import next/image

const testimonials = [
  {
    id: 1,
    name: "Samuel",
    location: "Lagos",
    role: "Tech Support",
    quote: "MamaSecure helped me avoid a fake loan scam. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Amina",
    location: "Abuja",
    role: "Small Business Owner",
    quote: "I feel much safer knowing MamaSecure is watching out for scams.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Chinedu",
    location: "Port Harcourt",
    role: "Student",
    quote: "The real-time scam alerts are a game changer for me.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg"
  }
];

export default function RedesignedTestimonials() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) next();
    if (info.offset.x > 50) prev();
  };

  return (
    <section className="py-20 bg-gradient-to-tr from-[#0e0e0e] via-[#1a1a1a] to-[#0e0e0e]">
      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <h2 className="text-4xl font-extrabold text-purple-400 mb-12 tracking-wide drop-shadow-lg">
          Trusted by Nigerians
        </h2>

        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#1a1a1a] hover:bg-purple-500 text-white rounded-full p-2 shadow-lg transition cursor-crosshair"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1a1a1a] hover:bg-purple-500 text-white rounded-full p-2 shadow-lg transition cursor-crosshair"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="bg-[#1a1a1a] rounded-2xl p-8 shadow-lg relative cursor-grab hover:cursor-grabbing"
            aria-live="polite"
          >
            <Quote className="absolute top-4 left-4 text-purple-400 opacity-20 w-10 h-10" />
            <div className="flex justify-center mb-6">
              <Image
                src={testimonial.avatar}
                alt={`Avatar of ${testimonial.name}`}
                width={80}
                height={80}
                className="rounded-full border-4 border-purple-400 shadow object-cover animate-float"
              />
            </div>
            <blockquote className="text-gray-300 italic text-lg leading-relaxed mb-6 relative">
              “{testimonial.quote}”
            </blockquote>
            <p className="text-purple-400 font-semibold text-xl">
              {testimonial.name}
              <span className="text-sm block text-gray-400 mt-1">
                {testimonial.role} – {testimonial.location}
              </span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
