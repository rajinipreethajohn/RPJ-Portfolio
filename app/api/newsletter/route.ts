import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://360harmonyhub.netlify.app/newsletter", {
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
    const title = titleMatch ? clean(titleMatch[1]) : "The Yin Yang Newsletter.";

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

    const linkMatch = html.match(/<a[^>]*href="([^"]+)"[^>]*>.*?(?:Read|Full Issue).*?<\/a>/i);
    const link = linkMatch
      ? (linkMatch[1].startsWith("http")
          ? linkMatch[1]
          : `https://360harmonyhub.netlify.app${linkMatch[1]}`)
      : "https://360harmonyhub.netlify.app/newsletter";

    return NextResponse.json({ title, date, excerpt, link });
  } catch (error) {
    console.error("Newsletter fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch newsletter" }, { status: 500 });
  }
}
