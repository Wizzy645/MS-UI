"use client";

import { useState } from "react";
import {
  MdOutlineDownload,
  MdTimeline,
  MdBugReport,
  MdUpdate,
} from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const aiStats = [
  { label: "Total Scans", value: 1543 },
  { label: "Detection Accuracy", value: "92%" },
  { label: "False Positives", value: 12 },
  { label: "False Negatives", value: 9 },
];

const trendData = [
  { day: "Mon", scams: 30, safe: 60 },
  { day: "Tue", scams: 25, safe: 75 },
  { day: "Wed", scams: 35, safe: 65 },
  { day: "Thu", scams: 40, safe: 50 },
  { day: "Fri", scams: 28, safe: 72 },
  { day: "Sat", scams: 20, safe: 80 },
  { day: "Sun", scams: 18, safe: 82 },
];

export default function ReportsPage() {
  const [exporting, setExporting] = useState(false);

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-black to-[#0f172a]">
      <h1 className="text-3xl font-bold mb-6">AI Reports</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {aiStats.map((item, i) => (
          <div
            key={i}
            className="p-5 bg-white/10 border border-white/10 rounded-xl backdrop-blur shadow-md"
          >
            <p className="text-gray-400 text-sm mb-1">{item.label}</p>
            <h3 className="text-3xl font-bold">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Trend Chart */}
      <div className="bg-white/10 border border-white/10 rounded-xl p-6 mb-10 backdrop-blur">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MdTimeline /> Weekly Scan Trends
          </h2>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={trendData}>
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis />
            <Tooltip contentStyle={{ background: "#1e293b", border: "none" }} />
            <Bar dataKey="scams" fill="#f87171" name="Scam Links" />
            <Bar dataKey="safe" fill="#34d399" name="Safe Links" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Feedback + Actions */}
      <div className="bg-white/10 border border-white/10 rounded-xl p-6 mb-10 backdrop-blur">
        <h2 className="text-xl font-semibold mb-4">Low Confidence Predictions</h2>
        <ul className="text-sm space-y-2">
          <li>
            🔎 <span className="text-yellow-300">http://freenft.xyz</span> — Confidence: 67%
          </li>
          <li>
            ⚠️ <span className="text-yellow-300">https://promo.airdrop.com</span> — Confidence: 70%
          </li>
          <li>
            ✅ <span className="text-yellow-300">https://legit.store</span> — Confidence: 73%
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setExporting(true)}
          disabled={exporting}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-bold transition"
        >
          <MdOutlineDownload /> {exporting ? "Exporting..." : "Export Logs (CSV)"}
        </button>

        <button className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 px-6 py-3 rounded-xl font-bold transition">
          <MdBugReport /> Review AI Errors
        </button>

        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-xl font-bold transition">
          <MdUpdate /> Retrain / Update Model
        </button>
      </div>
    </div>
  );
}
