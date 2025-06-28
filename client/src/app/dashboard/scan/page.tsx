"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MdLink, MdMessage, MdFileUpload, MdCheckCircle, MdWarning } from "react-icons/md";
import Lottie from "lottie-react";
import typingAnimation from "@/animations/typing.json";

const tabs = [
  { label: "Link", icon: <MdLink /> },
  { label: "Message", icon: <MdMessage /> },
  { label: "Upload (soon)", icon: <MdFileUpload />, disabled: true },
];

export default function ScanPage() {
  const [mode, setMode] = useState("Link");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    status: "safe" | "scam";
    confidence: number;
    explanation: string[];
  }>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [mode]);

  const handleScan = () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const isScam = input.toLowerCase().includes("free");
      setResult({
        status: isScam ? "scam" : "safe",
        confidence: isScam ? 95 : 92,
        explanation: isScam
          ? ["Contains common scam trigger words", "Similar to phishing format"]
          : ["No suspicious patterns detected"],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-black to-[#0f172a]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manual Scan</h1>
        <p className="text-gray-400">
          Paste a suspicious {mode.toLowerCase()} and let MamaSecure AI analyze it.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => !tab.disabled && setMode(tab.label)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 text-sm font-semibold backdrop-blur transition ${
              mode === tab.label
                ? "bg-purple-700 text-white"
                : "text-gray-300 hover:bg-white/10"
            } ${tab.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="relative mb-6">
        <textarea
          ref={textareaRef}
          rows={5}
          placeholder={`Paste ${mode.toLowerCase()} here...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl resize-none text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-700 transition backdrop-blur"
        />
        <button
          onClick={handleScan}
          disabled={!input.trim() || loading}
          className="absolute bottom-2 right-2 bg-purple-700 hover:bg-purple-600 transition text-white font-bold px-6 py-2 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Scanning..." : "Scan"}
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center mb-6">
          <Lottie animationData={typingAnimation} className="w-24" />
        </div>
      )}

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 border rounded-xl backdrop-blur transition-all ${
            result.status === "scam"
              ? "bg-red-500/10 border-red-500/20"
              : "bg-emerald-500/10 border-emerald-500/20"
          }`}
        >
          <p
            className={`text-lg font-bold flex items-center gap-2 ${
              result.status === "scam" ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {result.status === "scam" ? <MdWarning /> : <MdCheckCircle />}
            {result.status === "scam" ? "⚠️ Scam Detected" : "✅ This appears safe"}
          </p>
          <p className="text-sm text-white/70 mt-2">
            Confidence: <strong>{result.confidence}%</strong>
          </p>
          <ul className="mt-3 text-white/70 list-disc list-inside space-y-1">
            {result.explanation.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
