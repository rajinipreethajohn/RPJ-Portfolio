'use client';

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("https://formspree.io/f/mwpoyklv", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (res.ok) {
      // Redirect manually
      window.location.href = "/thank-you";
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Let’s Connect</h1>
      <p className="text-lg text-gray-700 mb-10">
        I’d love to hear from you! Drop a message and I’ll get back to you soon.
      </p>

      <form onSubmit={handleSubmit} className="grid gap-6 text-left">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            id="message"
            rows={5}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-gray-900 text-white font-semibold rounded hover:bg-gray-700 transition"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
