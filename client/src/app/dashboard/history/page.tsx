"use client";

import { useState } from "react";
import {
  MdSearch,
  MdOutlineDelete,
  MdRefresh,
  MdDownload,
  MdOutlineAdminPanelSettings,
  MdCheckCircle,
} from "react-icons/md";

const mockHistory = [
  { link: "bit.ly/freegift", status: "Scam", confidence: 97, date: "2024-06-26" },
  { link: "google.com", status: "Safe", confidence: 94, date: "2024-06-25" },
  { link: "mama-secure.io/update", status: "Safe", confidence: 91, date: "2024-06-24" },
  { link: "freemoney.io", status: "Scam", confidence: 95, date: "2024-06-23" },
  { link: "binance.com", status: "Safe", confidence: 93, date: "2024-06-22" },
];

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isAdminView, setIsAdminView] = useState(false);
  const [history, setHistory] = useState(mockHistory);
  const [toast, setToast] = useState("");

  const filtered = history
    .filter((entry) => entry.link.toLowerCase().includes(search.toLowerCase()))
    .filter((entry) => (filter === "All" ? true : entry.status === filter));

  const handleExportCSV = () => {
    const csv = [
      ["Link", "Status", "Confidence", "Date"],
      ...filtered.map((e) => [e.link, e.status, `${e.confidence}%`, e.date]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scan-history.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    setToast("Exported scan-history.csv");
    setTimeout(() => setToast(""), 3000);
  };

  const handleRescan = (link: string) => {
    const newConfidence = Math.floor(Math.random() * 20) + 80;
    const newStatus = newConfidence < 90 ? "Scam" : "Safe";
    setHistory((prev) =>
      prev.map((entry) =>
        entry.link === link
          ? { ...entry, confidence: newConfidence, status: newStatus }
          : entry
      )
    );
    setToast("Re-scanned link.");
    setTimeout(() => setToast(""), 3000);
  };

  const handleDelete = (link: string) => {
    setHistory((prev) => prev.filter((entry) => entry.link !== link));
    setToast("Entry deleted.");
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-black to-[#0f172a] relative">
      <h1 className="text-3xl font-bold mb-6">Scan History</h1>

      {/* Filters and Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Search */}
        <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
          <MdSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search scanned links..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-white placeholder:text-white/40 w-60"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {["All", "Scam", "Safe"].map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === opt
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Admin View Toggle */}
        <label className="flex items-center text-sm gap-2 text-white bg-white/10 px-4 py-2 rounded-lg backdrop-blur border border-white/10 cursor-pointer">
          <input
            type="checkbox"
            checked={isAdminView}
            onChange={() => setIsAdminView(!isAdminView)}
            className="accent-purple-600"
          />
          <MdOutlineAdminPanelSettings />
          Show all user scans
        </label>

        {/* Export Button */}
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 text-sm px-4 py-2 border border-white/10 rounded-lg text-white bg-white/5 hover:bg-white/10"
        >
          <MdDownload /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-xl backdrop-blur">
        <table className="w-full text-sm text-white">
          <thead>
            <tr className="border-b border-white/10 text-left text-gray-300">
              <th className="py-3 px-4">Link</th>
              <th>Status</th>
              <th>Confidence</th>
              <th>Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="py-3 px-4">{entry.link}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      entry.status === "Scam"
                        ? "bg-red-600/20 text-red-400"
                        : "bg-green-600/20 text-green-400"
                    }`}
                  >
                    {entry.status}
                  </span>
                </td>
                <td>{entry.confidence}%</td>
                <td>{entry.date}</td>
                <td className="text-right">
                  <button
                    className="text-indigo-400 hover:underline text-sm mr-4"
                    onClick={() => handleRescan(entry.link)}
                  >
                    <MdRefresh className="inline" /> Re-Scan
                  </button>
                  <button
                    className="text-red-500 hover:underline text-sm"
                    onClick={() => handleDelete(entry.link)}
                  >
                    <MdOutlineDelete className="inline" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-white/50 py-6">
            No scan results match your filters.
          </p>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-lg z-50">
          <MdCheckCircle /> {toast}
        </div>
      )}
    </div>
  );
}
