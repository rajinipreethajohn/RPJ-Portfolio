"use client";
import useSWR from "swr";
import { motion } from "framer-motion";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NewsletterPage() {
  const { data, error } = useSWR("/api/newsletter", fetcher);

  if (error)
    return (
      <main className="text-center py-20 text-gray-600">
        Failed to load latest edition.
      </main>
    );

  if (!data)
    return (
      <main className="text-center py-20 text-gray-600">Loading...</main>
    );

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 text-center">
      {/* Page heading */}
      <motion.h1
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🪶 Weekly Insight from the Yin–Yang Journal
      </motion.h1>

      {/* Newsletter card */}
      <motion.div
        className="bg-white rounded-2xl shadow-md max-w-2xl mx-auto p-8 leading-relaxed text-gray-800"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">
          {data.title.replace("Newsletter", "").trim()}
        </h2>
        <p className="text-gray-600 mb-4 italic">{data.date}</p>
        <p className="text-gray-700">{data.excerpt}</p>
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-6 py-2 border border-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition"
        >
          Read the Full Issue →
        </a>
      </motion.div>
    </main>
  );
}
