"use client";

import React from "react";
import { useRouter } from "next/navigation"; // ✅ import router
import { motion } from "framer-motion";
import { MdSearch, MdHistory, MdSettings } from "react-icons/md";
import Chart from "../components/Dashboard/chart/chart";

const stats = [
  { title: "Total Scans", value: 152, color: "bg-purple-700" },
  { title: "Flagged Links", value: 42, color: "bg-red-600" },
  { title: "Safe Links", value: 110, color: "bg-emerald-600" },
  { title: "Trust Score", value: "89%", color: "bg-indigo-500" },
];

const recentScans = [
  { link: "bit.ly/freecrypto", status: "Scam", confidence: "97%", date: "June 26" },
  { link: "google.com", status: "Safe", confidence: "94%", date: "June 25" },
  { link: "mama.com/gift", status: "Scam", confidence: "91%", date: "June 24" },
  { link: "https://binance.com", status: "Safe", confidence: "93%", date: "June 23" },
  { link: "freelunch.app", status: "Scam", confidence: "95%", date: "June 22" },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <main className="p-6 text-white min-h-screen bg-gradient-to-b from-black to-[#0f172a] space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold mb-2">Welcome back, Olamide 👋</h1>
        <p className="text-gray-400">Here’s a snapshot of your security activity.</p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-xl shadow-lg ${card.color}`}
            role="region"
            aria-label={card.title}
          >
            <p className="text-sm uppercase text-gray-200 tracking-widest mb-1">{card.title}</p>
            <h3 className="text-3xl font-extrabold">{card.value}</h3>
          </motion.div>
        ))}
      </section>

      {/* Chart */}
      <section aria-label="Scam trends chart">
        <Chart />
      </section>

      {/* Recent Scans Table */}
      <section className="bg-white/10 border border-white/10 rounded-xl p-6 backdrop-blur-lg" aria-labelledby="recent-scans-title">
        <h2 id="recent-scans-title" className="text-xl font-semibold mb-4">Recent Scans</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="text-left text-gray-300 border-b border-white/10">
                <th scope="col" className="py-2">Link</th>
                <th scope="col">Status</th>
                <th scope="col">Confidence</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.map((item, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-2">{item.link}</td>
                  <td className={item.status === "Scam" ? "text-red-400" : "text-emerald-400"}>
                    {item.status}
                  </td>
                  <td>{item.confidence}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex flex-wrap gap-4" aria-label="Dashboard actions">
        <button
          onClick={() => router.push("/dashboard/scan")}
          aria-label="Scan a new link"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-xl font-bold transition"
        >
          <MdSearch size={20} /> Scan New Link
        </button>
        <button
          onClick={() => router.push("/dashboard/history")}
          aria-label="View your scan history"
          className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 px-6 py-3 rounded-xl font-bold transition"
        >
          <MdHistory size={20} /> View History
        </button>
        <button
          onClick={() => router.push("/dashboard/settings")}
          aria-label="Open dashboard settings"
          className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-600 px-6 py-3 rounded-xl font-bold transition"
        >
          <MdSettings size={20} /> Settings
        </button>
      </section>
    </main>
  );
}
