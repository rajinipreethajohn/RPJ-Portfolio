"use client";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 1, ease: "easeOut" },
    }),
  };

  return (
    <main className="max-w-6xl mx-auto text-gray-700 antialiased">
      {/* INTRO */}
      <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="order-1 md:order-1"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-yellow-700">
            Science × Creativity × Human Potential
          </p>
          <h1 className="text-4xl font-bold mb-8 text-gray-900">
            My name is Rajini Preetha John
          </h1>
          <p className="text-lg leading-loose">
            I design and build practical AI systems, intelligent automation, and
            digital products that solve real-world problems.
            <br />
            <br />
            From production web platforms and local-LLM workflows to educational
            technology and content automation, I enjoy turning ideas into
            software that saves time, reduces friction, and creates meaningful
            impact.
            <br />
            <br />
            I don’t build AI for its own sake. I build systems that quietly
            remove friction, giving people and small teams more time to focus on
            what truly matters.
            <br />
            <br />
            Every project I share has been independently conceived, architected,
            developed, deployed, and maintained by me as a solo builder.
            <br />
            <br />
            Born in India, married to a German, having lived in China, and now
            based in Malaysia, I bring a global perspective to technology,
            creativity, and human-centered design.
          </p>
        </motion.div>

        <Image
          src="/images/pree.jpg"
          alt="Preetha seated in a sculptural chair, barefoot, at home"
          width={800}
          height={1430}
          className="w-full h-auto max-w-[400px] object-contain shadow-lg rounded-xl order-2 md:order-2"
        />
      </section>

      {/* BUILDING WITH AI */}
      <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-8 items-center">
        <Image
          src="/images/1.png"
          alt="Family on bicycles"
          className="w-full max-w-xl mx-auto order-1 md:order-1"
          width={500}
          height={500}
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="order-2 md:order-2"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Building with AI
          </h2>
          <p className="text-lg leading-relaxed">
            I build practical AI systems that automate repetitive work — from
            personalized tutoring agents and local-LLM workflows to content
            generation and everyday productivity tools.
          </p>
        </motion.div>
      </section>

      {/* SHIPPING PRODUCTS */}
      <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-8 items-center">
        <Image
          src="/images/2.png"
          alt="Family travel illustration"
          width={400}
          height={400}
          className="w-full max-w-md mx-auto order-1 md:order-2"
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="order-2 md:order-1"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Shipping Products
          </h2>
          <p className="text-lg leading-relaxed">
            I enjoy taking ideas from concept to production, building and
            maintaining real platforms like KL City Guide and 360 Harmony Hub as
            independent, end-to-end projects.
          </p>
        </motion.div>
      </section>

      {/* A GLOBAL PERSPECTIVE */}
      <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-8 items-center">
        <Image
          src="/images/3.png"
          alt="Mindful living icon"
          width={300}
          height={300}
          className="w-2/3 mx-auto order-1 md:order-1"
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="order-2 md:order-2"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            A Global Perspective
          </h2>
          <p className="text-lg leading-relaxed">
            Living across India, China, Malaysia, and Germany has shaped how I
            approach technology — with curiosity, empathy, and an appreciation
            for diverse ways of thinking.
          </p>
        </motion.div>
      </section>

      {/* SCIENCE X CREATIVITY */}
      <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-8 items-center">
        <Image
          src="/images/4.png"
          alt="Human-centered tech icon"
          width={300}
          height={300}
          className="w-2/3 mx-auto order-1 md:order-2"
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="order-2 md:order-1"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Science × Creativity
          </h2>
          <p className="text-lg leading-relaxed">
            Whether writing code, creating digital art, or designing immersive
            experiences, I’m drawn to work that blends analytical thinking with
            imagination and human connection.
          </p>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section className="max-w-6xl mx-auto py-20 px-4 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 max-w-2xl mx-auto"
        >
          If you&apos;re interested in AI systems, digital products, collaboration,
          or a creative exchange — I&apos;d love to hear from you.
        </motion.h2>
        <a
          href="/contact"
          className="inline-block mt-8 px-6 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition"
        >
          Contact Me
        </a>
      </section>

      {/* FOOTER */}
      <footer className="mt-2 mb-4 flex justify-center gap-6 text-gray-700">
        <a
          href="https://github.com/rajinipreethajohn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition"
          title="GitHub"
        >
          <Github size={34} strokeWidth={1.5} />
        </a>
        <a
          href="https://www.linkedin.com/in/rajini-preetha-john-71757b7/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700 transition"
          title="LinkedIn"
        >
          <Linkedin size={34} strokeWidth={1.5} />
        </a>
      </footer>
    </main>
  );
}
