import { NextResponse } from "next/server";

export async function GET() {
  try {
    const base = "https://360harmonyhub.netlify.app";

    const res = await fetch(`${base}/newsletter`, {
      next: { revalidate: 3600 },
    });

    const html = await res.text();

    // Helper to clean and normalize text
    const clean = (text: string) =>
      text
        .replace(/<[^>]+>/g, "") // remove HTML tags
        .replace(/\s+/g, " ") // normalize whitespace
        .replace(/([a-zA-Z0-9])([A-Z])/g, "$1. $2") // add missing space between sentences
        .replace(/([^.!?])$/g, "$1.") // ensure sentence ends with period
        .trim();

    // Extract title, date, and paragraph
    const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const title = titleMatch
      ? clean(titleMatch[1])
      : "The Yin Yang Newsletter.";

    const dateMatch = html.match(/<h2[^>]*>(.*?)<\/h2>/i);
    const date = dateMatch ? clean(dateMatch[1]) : "";

    const paragraphMatch = html.match(/<p[^>]*>(.*?)<\/p>/i);
    let excerpt = paragraphMatch
      ? clean(paragraphMatch[1])
      : "Explore the latest insights on harmony, balance, and mindful living.";

    // 🧠 Remove repeated title/date if they appear again in the paragraph
    excerpt = excerpt
      .replace(title, "")
      .replace(date, "")
      .replace(/\s+/g, " ")
      .trim();

    // ✅ Robust latest-issue link detection
    // Adjust/add patterns to match your actual issue URLs on 360.
    const issueLinkPatterns = [
      /<a[^>]*href="(\/newsletter\/[^"]+)"[^>]*>/i,
      /<a[^>]*href="(\/yin[^"]+)"[^>]*>/i,
      /<a[^>]*href="(\/posts\/[^"]+)"[^>]*>/i,
      /<a[^>]*href="(\/blog\/[^"]+)"[^>]*>/i,
    ];

    let link = `${base}/newsletter`; // fallback (landing page)

    for (const re of issueLinkPatterns) {
      const m = html.match(re);
      if (m?.[1]) {
        link = `${base}${m[1]}`;
        break;
      }
    }

    return NextResponse.json({ title, date, excerpt, link });
  } catch (error) {
    console.error("Newsletter fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletter" },
      { status: 500 },
    );
  }
}
