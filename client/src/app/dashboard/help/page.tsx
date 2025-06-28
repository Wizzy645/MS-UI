"use client";

import { useState } from "react";
import { MdSend, MdQuestionAnswer } from "react-icons/md";

const faqs = [
  {
    question: "How do I scan a suspicious link?",
    answer: "Go to Dashboard → Scan Link/Message, paste the content, then click Scan.",
  },
  {
    question: "What does the AI confidence score mean?",
    answer: "It represents how certain our model is that the content is safe or a scam.",
  },
  {
    question: "Is my data stored?",
    answer: "Only your scan history is saved for your dashboard view. We never store passwords or personal content.",
  },
];

export default function HelpCenter() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSent(true);
        form.reset();
      } else {
        alert("There was a problem submitting the form.");
      }
    } catch (error) {
  console.error("Form submission error:", error);
  alert("Something went wrong. Please try again later.");
}
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-black to-[#0f172a]">
      <h1 className="text-3xl font-bold mb-4">Help Center</h1>
      <p className="text-gray-400 mb-10">
        Get answers to common questions or reach out directly.
      </p>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        action="https://formspree.io/f/mzzgyeve"
        method="POST"
        className="bg-white/5 p-6 rounded-xl backdrop-blur border border-white/10 mb-12"
      >
        <h2 className="text-xl font-semibold mb-4">Need help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="sr-only" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            required
            onChange={() => sent && setSent(false)}
            className="p-3 rounded bg-black/50 text-white placeholder-white/40 border border-white/20"
          />
          <label className="sr-only" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your Email"
            required
            onChange={() => sent && setSent(false)}
            className="p-3 rounded bg-black/50 text-white placeholder-white/40 border border-white/20"
          />
        </div>
        <label className="sr-only" htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Your Message"
          required
          onChange={() => sent && setSent(false)}
          className="w-full mt-4 p-3 rounded bg-black/50 text-white placeholder-white/40 border border-white/20"
        />
        <button
          type="submit"
          className="mt-4 flex items-center gap-2 bg-purple-600 hover:bg-purple-500 py-3 px-6 rounded-lg font-bold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : (
            <>
              <MdSend /> Send Message
            </>
          )}
        </button>
        {sent && <p className="text-green-400 mt-2">Message sent successfully!</p>}
      </form>

      {/* FAQ Section */}
      <div className="bg-white/5 p-6 rounded-xl backdrop-blur border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setExpandedFAQ(i === expandedFAQ ? null : i)}
                className="w-full text-left font-bold flex items-center gap-2 text-white hover:text-purple-400 focus:outline-none"
              >
                <MdQuestionAnswer className="text-purple-500" />
                {faq.question}
              </button>
              {expandedFAQ === i && (
                <p className="text-gray-300 ml-7 mt-1">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


