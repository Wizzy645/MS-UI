'use client';

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HowItWorksCard from "./components/HowItWorksCard";
import StyledHowItWorksWrapper from "./components/StyledHowItWorksWrapper";
import Lottie from "lottie-react";
import scanAnimation from "@/animations/scan.json";
import trustAnimation from "@/animations/trust.json";
import { ClipboardType, BrainCircuit, ShieldCheck } from "lucide-react";
import ParticleBackground from "./components/ParticleBackground";
import RedesignedTestimonials from "./components/RedesignedTestimonials";
import Image from "next/image";


export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      delay: 100,
      easing: 'ease-in-out'
    });
  }, []);

  return (
    <main className="relative bg-gradient-to-br from-[#0e0e0e] to-black text-white font-sans">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="min-h-screen py-28 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" data-aos="fade-right">
              AI-Powered Scam Detection<br />
              <span className="text-purple-400">
                For the <span className="glitch" data-glitch="Digital">Digital</span> Age
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Paste any message or suspicious link. MamaSecure tells you if it’s a scam — instantly.
            </p>
            <a
  href="/scanner"
  className="bg-purple-700 hover:bg-purple-600 text-white font-bold px-6 py-3 rounded-xl tilt-hover cursor-crosshair"
>
  Start Scanning
</a>

          </div>
          <div className="mt-10 md:mt-0 w-full max-w-md" data-aos="fade-left">
            <Lottie animationData={scanAnimation} loop className="w-full max-w-xl h-96" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <StyledHowItWorksWrapper>
        <section className="bg-[#1a1a1a]/60 text-white py-28 px-6 md:px-20 backdrop-blur-md border border-purple-700/30 shadow-xl">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-10 text-purple-400">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 justify-center">
              {[
                {
                  title: "Paste Suspicious Content",
                  icon: <ClipboardType className="w-8 h-8 text-purple-400" />,
                  description: "Copy and paste any text or link you find suspicious.",
                },
                {
                  title: "AI Analyzes It",
                  icon: <BrainCircuit className="w-8 h-8 text-purple-400" />,
                  description: "Our system scans for scam patterns in real-time.",
                },
                {
                  title: "You Get a Scam Risk Result",
                  icon: <ShieldCheck className="w-8 h-8 text-purple-400" />,
                  description: "Instantly see whether it’s safe or dangerous.",
                },
              ].map((card) => (
                <HowItWorksCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>
      </StyledHowItWorksWrapper>

      {/* Trust Section */}
      <section className="py-24 px-6 bg-[#0e0e0e]/70 backdrop-blur-lg border-t border-purple-800/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-[#1a1a1a]/60 border border-purple-700/20 rounded-2xl p-8 shadow-lg backdrop-blur-md" data-aos="fade-up">
            <h2 className="text-4xl font-extrabold text-purple-400 mb-6 tracking-tight">
              Why Trust <span className="text-white">MamaSecure</span>?
            </h2>
            <ul className="space-y-5 text-lg text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl animate-float">🧠</span>
                <span>94% AI-powered scam detection accuracy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl animate-float">⚡</span>
                <span>Real-time scanning with lightning speed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl animate-float">🔍</span>
                <span>Built using verified, constantly updated scam data</span>
              </li>
            </ul>
          </div>
          <div className="bg-[#1a1a1a]/40 border border-purple-700/10 rounded-2xl p-6 shadow-inner backdrop-blur-md">
            <Lottie animationData={trustAnimation} loop className="w-full max-w-xl h-[26rem]" />
          </div>
        </div>
      </section>

      {/* Recent Scam Alerts */}
      <section className="py-16 bg-[#1a1a1a]/60 backdrop-blur-lg border-t border-purple-900/10">
        <div className="flex flex-wrap justify-center gap-8 text-left">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative bg-[#0e0e0e]/70 backdrop-blur p-6 rounded-xl border border-purple-600/30 shadow-lg hover:shadow-purple-400/40 transition duration-300 hover:scale-[1.03] cursor-crosshair"
              data-aos="zoom-in"
              data-aos-delay={i * 200}
            >
              <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-xs animate-badge-fade">
  NEW
</div>

              <h4 className="text-2xl font-bold text-purple-300 mb-2">Phishing Email</h4>
              <p className="text-sm text-red-400 mb-1">Risk Level: <strong>High</strong></p>
              <p className="text-gray-400 text-xs">Detected: 2 hours ago</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="bg-[#0e0e0e] py-28 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-purple-400 mb-4">
            Your Scam Radar Command Center
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Visualize real-time scam trends, threat activity, and detection data — all in one analyst-focused dashboard.
          </p>
          <div className="relative max-w-4xl mx-auto" data-aos="zoom-in">
           <div className="relative w-full h-[500px]">
  <Image
    src="/Annotation 2025-06-28 223258.png"
    alt="Dashboard Preview"
    fill
    className="object-cover rounded-xl shadow-lg blur-sm hover:blur-none transition duration-500"
    priority
  />
</div>

            <div className="absolute top-4 left-4 bg-purple-600/90 text-white text-xs px-3 py-1 rounded shadow-lg animate-float-slow z-20">
              Scam Surge: +42%
            </div>
            <div className="absolute bottom-6 right-8 bg-yellow-400/90 text-black text-xs px-3 py-1 rounded shadow animate-float-slower z-20">
              ⚠️ 187 Active Threats
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full bg-white/90 text-black text-[11px] px-2 py-1 rounded shadow-lg animate-pulse-slow z-20">
              Real-Time Monitoring Enabled
            </div>
          </div>
          <a
            href="#"
            className="inline-block mt-10 px-8 py-3 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded-xl transition transform hover:scale-105 hover:rotate-[0.5deg] ring-1 ring-purple-500/40 hover:ring-purple-500 cursor-crosshair focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Request Analyst Access
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <RedesignedTestimonials />

      {/* Join the Mission */}
      <section className="py-28 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-purple-400 mb-6">Join the Mission</h2>
            <p className="text-gray-300 mb-6">
              MamaSecure is built to empower everyday Nigerians to stay safe.
            </p>
          </div>
          <form className="bg-[#1a1a1a] p-6 rounded-lg shadow border border-purple-600/20">
            <input
              type="text"
              aria-label="Your name"
              placeholder="Name"
              className="w-full pl-4 py-3 mb-4 rounded-lg bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="email"
              aria-label="Your email"
              placeholder="Email"
              className="w-full pl-4 py-3 mb-4 rounded-lg bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <textarea
              aria-label="Reason for joining"
              placeholder="Reason for Joining (Optional)"
              className="w-full pl-4 py-3 mb-4 rounded-lg bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit"
              aria-label="Submit Join Form"
              className="w-full py-3 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded-xl transition transform hover:scale-105 hover:rotate-[0.5deg] ring-1 ring-purple-500/40 hover:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-crosshair"
            >
              Join Our Mission
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-gradient-to-t from-[#0e0e0e] to-[#1a1a1a] text-gray-400 py-12 border-t border-purple-900/30 mt-20 select-none">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 items-start text-sm">
    
    {/* Branding */}
    <div>
      <h2 className="text-2xl font-extrabold text-purple-400 mb-2 hover:drop-shadow-glow transition duration-300 cursor-pointer">
        MamaSecure
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed">
        AI-powered scam detection for every Nigerian. Built to protect, built to scale.
      </p>
      <div className="mt-3 text-xs text-green-400 animate-pulse-slow">
        ⚙️ Dark mode powered
      </div>
    </div>

    {/* Navigation */}
    <div className="flex flex-col items-center md:items-start space-y-2">
      {["Home", "How It Works", "Contact", "GitHub"].map((link, i) => (
        <a
          key={i}
          href="#"
          className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-600 rounded"
        >
          {link}
        </a>
      ))}
    </div>

    {/* Socials / Info */}
    <div className="flex flex-col items-center md:items-end space-y-2">
      <span className="text-xs text-gray-500">© 2025 MamaSecure</span>
      <span className="text-xs text-gray-500">Built in 🇳🇬 with 💜</span>
      <div className="flex gap-4 mt-2">
        <a
          href="#"
          aria-label="Twitter"
          className="hover:text-purple-400 transform hover:scale-110 transition duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.22 4.22 0 001.84-2.32 8.38 8.38 0 01-2.67 1.02 4.19 4.19 0 00-7.13 3.82A11.89 11.89 0 013 4.79a4.18 4.18 0 001.3 5.6 4.18 4.18 0 01-1.9-.52v.05a4.2 4.2 0 003.36 4.12 4.23 4.23 0 01-1.89.07 4.21 4.21 0 003.93 2.92A8.4 8.4 0 012 19.54a11.83 11.83 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.36 8.36 0 0022.46 6z"/>
          </svg>
        </a>
        <a
          href="#"
          aria-label="GitHub"
          className="hover:text-purple-400 transform hover:scale-110 transition duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.64.07-.63.07-.63 1 .07 1.52 1.07 1.52 1.07.9 1.56 2.37 1.1 2.95.84.1-.68.35-1.1.63-1.35-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.38-2.03 1-2.74-.1-.26-.43-1.28.1-2.66 0 0 .82-.27 2.7 1.04a9.14 9.14 0 014.92 0c1.9-1.3 2.7-1.04 2.7-1.04.53 1.38.2 2.4.1 2.66.62.7 1 1.62 1 2.74 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9v2.81c0 .27.18.59.7.48A10.03 10.03 0 0022 12.26C22 6.58 17.52 2 12 2z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</footer>

    </main>
  );
}
