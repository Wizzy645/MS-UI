"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import {
  MdReportProblem,
  MdCheckCircle,
  MdShield,
  MdInfoOutline,
} from "react-icons/md";

export default function ReportScamPage() {
  const [link, setLink] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    // Simulate backend call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);

      setLink("");
      setNotes("");
      setAnonymous(false);

      setTimeout(() => setSubmitted(false), 4000);
    }, 1000);
  };

  const handleChange = (setter: (val: string) => void) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    setter(e.target.value);
  };

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-black to-[#0f172a]">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <MdReportProblem className="text-red-500" />
        Report a Scam
      </h1>

      <p className="text-white/70 mb-8 max-w-2xl">
        Help the community by reporting suspicious links, messages, or domains.
        Reports enhance our AI detection system.
      </p>

      <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
        <MdShield className="text-green-400" />
        Your report is confidential and encrypted in transit.
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label htmlFor="link" className="block mb-2 font-semibold">
            Suspicious Link or Message <span className="text-red-400">*</span>
          </label>
          <textarea
            id="link"
            name="link"
            placeholder="Paste the suspicious content here..."
            required
            value={link}
            onChange={handleChange(setLink)}
            className="w-full p-4 rounded-lg bg-white/10 text-white border border-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block mb-2 font-semibold">
            Optional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Describe what made it suspicious..."
            value={notes}
            onChange={handleChange(setNotes)}
            rows={4}
            className="w-full p-4 rounded-lg bg-white/10 text-white border border-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="anonymous"
            name="anonymous"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
            className="accent-red-500 w-4 h-4"
          />
          <label htmlFor="anonymous" className="text-sm text-white/80">
            Report anonymously
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 rounded-xl text-white font-bold transition-all duration-200 ${
            loading
              ? "bg-red-700 cursor-not-allowed opacity-70"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          {loading ? "Submitting..." : "Submit Scam Report"}
        </button>

        {submitted && (
          <div className="mt-4 flex items-center gap-2 p-4 border border-green-400 bg-green-400/10 text-green-300 rounded-lg animate-fade-in-down">
            <MdCheckCircle className="text-green-400" />
            Scam report submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
}

