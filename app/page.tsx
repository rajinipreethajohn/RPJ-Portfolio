'use client';

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <main className="max-w-6xl mx-auto">

      <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="order-1 md:order-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">My name is Rajini Preetha John</h1>
          <p className="text-lg leading-relaxed">
            I am a data scientist & machine learning engineer, artist, and culinary enthusiast.
            My life spans continents — born in India, married to a German, raising our two daughters who’ve grown up in China, and now calling Malaysia home.
            <br /><br />
            I’m a polyglot and an avid reader who enjoys staying fit and cooking wholesome meals.
            I thrive on curiosity and craft — in both the digital and the domestic — always learning, building, and experimenting.
          </p>
        </div>
        <Image
          src="/images/pree.jpg"
          alt="Preetha seated in a sculptural chair, barefoot, at home"
          width={800}
          height={1430}
          className="w-full h-auto max-w-[400px] object-contain shadow-lg rounded-xl order-2 md:order-2"
        />
      </section>

      <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.img
          src="/images/bicycle-clean2.png"
          alt="Family on bicycles"
          className="w-full max-w-xl mx-auto order-1 md:order-1 float"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        />
        <div className="order-2 md:order-2">
          <h2 className="text-2xl font-semibold mb-4">Riding Through Life</h2>
          <p className="text-lg leading-relaxed">
            We love riding through life together — often quite literally on a bike!
            These everyday moments with my husband and daughters inspire the heart of
            my work — balancing tech, mindfulness, and creativity.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-8 items-center">
        <Image
          src="/images/travel.png"
          alt="Family travel illustration"
          width={400}
          height={400}
          className="w-full max-w-md mx-auto order-1 md:order-2 float"
        />
        <div className="order-2 md:order-1">
          <h2 className="text-2xl font-semibold mb-4">Wandering Together</h2>
          <p className="text-lg leading-relaxed">
            Traveling the world has become second nature for our little family.
            From bustling cities to quiet corners of nature, each journey adds a layer to our shared story.
            It keeps our hearts open, our minds curious, and our lives full of unforgettable moments.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-8 items-center">
        <Image
          src="/images/mindful.png"
          alt="Mindful living icon"
          width={300}
          height={300}
          className="w-2/3 mx-auto order-1 md:order-1 float"
        />
        <div className="order-2 md:order-2">
          <h2 className="text-2xl font-semibold mb-4">Living Between Worlds</h2>
          <p className="text-lg leading-relaxed">
            Being at home in many cultures, I find meaning in storytelling, quiet mornings,
            and observing the little patterns in life and nature. These reflections make their
            way into my code, designs, and dishes.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-8 items-center">
        <Image
          src="/images/tech.png"
          alt="Human-centered tech icon"
          width={300}
          height={300}
          className="w-2/3 mx-auto order-1 md:order-2 float"
        />
        <div className="order-2 md:order-1">
          <h2 className="text-2xl font-semibold mb-4">Human-Centered Tech</h2>
          <p className="text-lg leading-relaxed">
            I use data science and machine learning not to automate away magic —
            but to amplify human creativity, wellbeing, and connection. Every project,
            like every meal I cook or art I create, carries intention.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 max-w-2xl mx-auto">
          If you're interested in tech, food, collaboration, or a creative exchange — I'd love to hear from you.
        </h2>
        <a
          href="/contact"
          className="inline-block mt-8 px-6 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition"
        >
          Contact Me
        </a>
      </section>

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
