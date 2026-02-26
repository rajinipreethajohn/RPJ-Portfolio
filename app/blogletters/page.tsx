"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string | null;
  tags: string[];
  cover: string;
  excerpt: string;
  whisper: string;
}

export default function BlogLettersPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  // 🪶 1️⃣ While loading
  if (loading)
    return (
      <main className="text-center py-24 text-gray-600">
        Loading your BlogLetters...
      </main>
    );

  // 🌸 2️⃣ Add your “Coming Soon” safeguard HERE
  if (posts.length === 0) {
    return (
      <main className="text-center py-24 text-gray-600">
        BlogLetters will open soon 🌿
      </main>
    );
  }

  // 🌿 3️⃣ Normal rendering when you have 2+ posts
  return (
    <main className="blogletters-page max-w-5xl mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl text-center mb-12 blogletters-title"
      >
        BlogLetters ✨
      </motion.h1>

      <div className="space-y-20">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blogletters/${post.slug}`}
            className="block"
          >
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="blogletters-card overflow-hidden blogletters-fade cursor-pointer hover:opacity-95 transition"
            >
              <div className="p-8">
                <h2 className="text-3xl mb-3 blogletters-title">
                  {post.title}
                </h2>

                {post.date && (
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}

                <p className="text-gray-700 leading-relaxed mb-4">
                  {post.excerpt ||
                    "A new reflection from Letters From My Soul."}
                </p>

                {post.whisper && (
                  <blockquote className="blogletters-quote">
                    {post.whisper}
                  </blockquote>
                )}

                {post.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm px-3 py-1 bg-[#efe6d8] text-[#5a4633] rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </main>
  );
}
