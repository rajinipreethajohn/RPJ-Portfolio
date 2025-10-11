"use client";
import { motion } from "framer-motion";

export default function TechPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 text-center">
      {/* Section title */}
      <motion.h1
        className="text-4xl font-bold mb-12 text-center"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 1.4 }}
      >
        ✨ Projects for the Soul ✨
      </motion.h1>

      {/* Intro text */}
      <motion.div
        className="text-gray-700 max-w-3xl mx-auto mb-20 leading-loose"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <p>
          I love to code, design, and weave together science and soul — crafting mindful digital
          experiences that inspire curiosity, creativity, and calm. Many of these creations emerged
          from my own journey — from rituals, reflections, and cross-cultural experiences that shaped
          my path — evolving into projects that nurture awareness, compassion, and collective harmony.
        </p>
        <br />
        <p>
          My work blends art and logic — from developing in Next.js, Python, and Supabase to crafting
          interfaces in Tailwind, Figma, and Framer Motion. I’m endlessly fascinated by how design,
          data, and sound come together — much like music — to create rhythm, emotion, and flow in
          digital spaces.
        </p>
      </motion.div>

      

      {/* Animated project cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[
          {
            href: "https://klcityguide.it.com",
            emoji: "🌇",
            title: "KL City Guide: For Expats",
            desc: "A curated web directory for expats in Kuala Lumpur — featuring schools, healthcare, pet services, and more. Built using Next.js and Supabase.",
          },
          {
            href: "https://360harmonyhub.netlify.app/",
            emoji: "🌿",
            title: "360 Harmony Hub: Mindful Living Reimagined",
            desc: "A holistic wellness ecosystem integrating mindfulness, movement, and modern AI — blending yoga, astrology, affirmations, and self-discovery through soulful, data-driven design.",
          },
          {
            href: "https://mysticaltarotgarden.netlify.app",
            emoji: "🌌",
            title: "The Archetype Engine: Tuning Into Your Frequency",
            desc: "A web-based tool mapping 78 ancient archetypes to modern psychological states — blending symbolic storytelling with interactive design and cognitive science.",
          },
          {
            href: "https://youtube.com/@NurtureNestTube",
            emoji: "🎥",
            title: "NurtureNestTube: AI-Powered Storytelling",
            desc: "An AI-powered YouTube channel exploring emotional intelligence, parenting, and modern mental health — crafted with Eleven Labs narration, visual storytelling, and educational research.",
          },
        ].map((project, i) => (
          <motion.a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={i + 1}
          >
            <h3 className="text-xl font-semibold mb-2">
              {project.emoji} {project.title}
            </h3>
            <p className="text-gray-600">{project.desc}</p>
          </motion.a>
        ))}
      </div>
    </main>
  );
}
