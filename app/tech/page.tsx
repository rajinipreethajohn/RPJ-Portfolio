"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const featuredProducts = [
  {
    href: "https://klcityguide.it.com",
    emoji: "🌇",
    title: "KL City Guide",
    label: "Production web platform",
    desc: "A curated city guide for expats and newcomers in Kuala Lumpur, serving real users with practical local information across living, dining, events, and services.",
  },
  {
    href: "https://360harmonyhub.netlify.app/",
    emoji: "🌿",
    title: "360 Harmony Hub",
    label: "Newsletter and content ecosystem",
    desc: "A wellness platform and weekly content system built with Next.js, TypeScript, Tailwind, Supabase, and Netlify.",
  },
  {
    href: "/art",
    emoji: "🎨",
    title: "Art & Immersive Experiences",
    label: "Creative technology",
    desc: "A dedicated space for virtual exhibitions, symbolic work, interactive storytelling, and creative experiments.",
    internal: true,
  },
];

const caseStudies = [
  {
    emoji: "🤖",
    title: "AI-Powered Etsy & Social Content Automation",
    problem:
      "Running a one-person e-commerce brand meant manually writing Etsy listings, Pinterest pins, and Instagram captions for every new product.",
    solution:
      "Built a Streamlit app using a local LLM through Ollama to generate SEO-friendly listings and social copy, with Instagram Graph API publishing support.",
    outcome:
      "Expanded the catalog from 5 to 10 active listings using the AI-assisted workflow, reducing repetitive content work without recurring API costs.",
    demonstrates:
      "Practical local-LLM tooling for real operational bottlenecks, especially useful for SMEs that care about cost and privacy.",
  },
  {
    emoji: "📚",
    title: "AI Tutoring Agents",
    problem:
      "Creating and grading level-appropriate math assessments for my own kids in an IB international school was difficult to sustain manually.",
    solution:
      "Built AI agents that generate weekly math tests tailored to each student's topic and grade level, then grade completed work automatically.",
    outcome:
      "Produced and scored a 28-question math review alongside ongoing weekly assessments, creating a clearer view of learning progress.",
    demonstrates:
      "Applied AI in structured, rules-based domains, with patterns that transfer to training, onboarding, and internal certification workflows.",
  },
  {
    emoji: "🎬",
    title: "Automated Video Reel Engine",
    problem:
      "Short-form product videos required repeated manual editing, making daily publishing difficult for a solo operator.",
    solution:
      "Built a JSON-driven Remotion pipeline that turns structured content and images into reusable 15-second, 4-scene reels.",
    outcome:
      "Turned video creation into a repeatable workflow: generate images, update config, preview, and render.",
    demonstrates:
      "The ability to convert creative manual work into structured automation for marketing, reporting, or asset-generation pipelines.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: "easeOut" },
  }),
};

function FeaturedProductCard({
  product,
  index,
}: {
  product: (typeof featuredProducts)[number];
  index: number;
}) {
  const className =
    "block h-full rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-yellow-500 hover:shadow-lg";

  const content = (
    <>
      <p className="mb-4 text-3xl" aria-hidden="true">
        {product.emoji}
      </p>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-700">
        {product.label}
      </p>
      <h3 className="mb-3 text-2xl font-bold text-gray-900">{product.title}</h3>
      <p className="leading-relaxed text-gray-700">{product.desc}</p>
    </>
  );

  if (product.internal) {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={index + 1}
      >
        <Link href={product.href} className={className}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index + 1}
    >
      {content}
    </motion.a>
  );
}

export default function TechPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 text-gray-700">
      <motion.header
        className="mx-auto mb-16 max-w-4xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-yellow-700">
          Science × Creativity × Human Potential
        </p>
        <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
          Portfolio
        </h1>
        <p className="mx-auto max-w-3xl text-lg leading-loose text-gray-700">
          A collection of production platforms, AI systems, and automation
          projects I independently conceived, built, deployed, and continue to
          maintain.
        </p>
      </motion.header>

      <section className="mb-20" aria-labelledby="featured-products">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-700">
            Public-facing work
          </p>
          <h2
            id="featured-products"
            className="mb-4 text-3xl font-bold text-gray-900"
          >
            🚀 Featured Products
          </h2>
          <p className="max-w-2xl leading-relaxed text-gray-600">
            Clickable experiences that show product thinking, deployment,
            maintenance, and creative direction in public.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <FeaturedProductCard
              key={product.title}
              product={product}
              index={index}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="case-studies">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-700">
            Behind the Systems
          </p>
          <h2
            id="case-studies"
            className="mb-4 text-3xl font-bold text-gray-900"
          >
            ⚙️ AI Systems & Case Studies
          </h2>
          <p className="leading-relaxed text-gray-600">
            These systems are not separate websites. They show how I identify a
            repeated manual process, design a practical workflow, and turn it
            into maintainable software.
          </p>
        </div>

        <div className="space-y-6">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.title}
              className="rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm md:p-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index + 1}
            >
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
                <span className="text-3xl" aria-hidden="true">
                  {study.emoji}
                </span>
                <h3 className="text-2xl font-bold text-gray-900">
                  {study.title}
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">Problem</h4>
                  <p className="leading-relaxed text-gray-700">
                    {study.problem}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">Solution</h4>
                  <p className="leading-relaxed text-gray-700">
                    {study.solution}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">Outcome</h4>
                  <p className="leading-relaxed text-gray-700">
                    {study.outcome}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    What This Demonstrates
                  </h4>
                  <p className="leading-relaxed text-gray-700">
                    {study.demonstrates}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
