"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";

type NotionBlock = any;

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string | null;
  tags: string[];
  cover: string;
  excerpt: string;
  whisper: string;
  blocks?: NotionBlock[];
}

function renderRichText(richText: any[] = []) {
  return richText.map((t, i) => {
    const text = t.plain_text ?? "";
    const a = t.annotations ?? {};

    const className = [
      a.bold ? "font-semibold" : "",
      a.italic ? "italic" : "",
      a.underline ? "underline" : "",
      a.strikethrough ? "line-through" : "",
      a.code ? "px-1 py-0.5 rounded bg-black/5 font-mono text-[0.95em]" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const node = (
      <span key={i} className={className}>
        {text}
      </span>
    );

    if (t.href) {
      return (
        <a
          key={i}
          href={t.href}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:opacity-80"
        >
          {node}
        </a>
      );
    }

    return node;
  });
}

function RenderBlocks({ blocks }: { blocks?: NotionBlock[] }) {
  if (!blocks || blocks.length === 0) {
    return (
      <p className="text-gray-700 leading-relaxed">
        No content found yet. Paste your writing into the Notion page body 🌿
      </p>
    );
  }

  const out: React.ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const { id, type } = block;

    // --- group bulleted list items ---
    if (type === "bulleted_list_item") {
      const items: any[] = [];
      while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
        items.push(blocks[i]);
        i++;
      }
      i--; // step back because for-loop will i++

      out.push(
        <ul key={id} className="list-disc pl-6 space-y-2 my-4">
          {items.map((b) => (
            <li key={b.id}>
              {renderRichText(b.bulleted_list_item?.rich_text)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // --- group numbered list items ---
    if (type === "numbered_list_item") {
      const items: any[] = [];
      while (i < blocks.length && blocks[i].type === "numbered_list_item") {
        items.push(blocks[i]);
        i++;
      }
      i--;

      out.push(
        <ol key={id} className="list-decimal pl-6 space-y-2 my-4">
          {items.map((b) => (
            <li key={b.id}>
              {renderRichText(b.numbered_list_item?.rich_text)}
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    if (type === "paragraph") {
      const rt = block.paragraph?.rich_text || [];

      // blank line => stanza break
      if (rt.length === 0) {
        out.push(<div key={id} className="h-6" />);
      } else {
        out.push(
          <p key={id} className="my-0 whitespace-pre-wrap">
            {renderRichText(rt)}
          </p>,
        );
      }
      continue;
    }

    if (type === "heading_1") {
      out.push(
        <h1 key={id} className="text-4xl mt-10 mb-3">
          {renderRichText(block.heading_1?.rich_text)}
        </h1>,
      );
      continue;
    }

    if (type === "heading_2") {
      out.push(
        <h2 key={id} className="text-3xl mt-8 mb-3">
          {renderRichText(block.heading_2?.rich_text)}
        </h2>,
      );
      continue;
    }

    if (type === "heading_3") {
      out.push(
        <h3 key={id} className="text-2xl mt-6 mb-2">
          {renderRichText(block.heading_3?.rich_text)}
        </h3>,
      );
      continue;
    }

    if (type === "quote") {
      out.push(
        <blockquote
          key={id}
          className="border-l-4 pl-4 italic text-gray-700 my-6"
        >
          {renderRichText(block.quote?.rich_text)}
        </blockquote>,
      );
      continue;
    }

    if (type === "divider") {
      out.push(<hr key={id} className="my-10 opacity-30" />);
      continue;
    }
  }

  // ✅ IMPORTANT: return `out`, not blocks.map(...)
  return (
    <div className="mt-10 space-y-2 text-[17px] leading-7 text-gray-800">
      {out}
    </div>
  );
}

export default function BlogLetterDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/blogletters/${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data?.error ? null : data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="text-center py-24 text-gray-600">
        Loading this BlogLetter...
      </main>
    );
  }

  if (!post) {
    return (
      <main className="text-center py-24 text-gray-600">
        This BlogLetter wasn’t found 🌿
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-5xl mb-4 blogletters-title">{post.title}</h1>
      {post.cover && (
        <img
          src={post.cover}
          alt={post.title}
          className="w-full rounded-2xl mb-8 object-cover max-h-[420px]"
        />
      )}

      {post.date && (
        <p className="text-sm text-gray-500 mb-8">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}

      {post.whisper && (
        <blockquote className="blogletters-quote mb-10">
          {post.whisper}
        </blockquote>
      )}

      <RenderBlocks blocks={post.blocks} />
    </main>
  );
}
