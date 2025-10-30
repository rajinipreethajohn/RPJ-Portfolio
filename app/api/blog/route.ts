import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID!;

export async function GET() {
  try {
    // ✅ Correct API call for Notion v5.3.0
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    // Transform Notion response into a simpler structure
    const posts = response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props.Title?.title?.[0]?.plain_text || "Untitled",
        slug: props.Slug?.rich_text?.[0]?.plain_text || "",
        date: props.Date?.date?.start || null,
        tags: props.Tags?.multi_select?.map((t: any) => t.name) || [],
        cover:
          page.cover?.external?.url ||
          page.cover?.file?.url ||
          "https://via.placeholder.com/1200x600?text=Letters+From+My+Soul",
        excerpt: props.Excerpt?.rich_text?.[0]?.plain_text || "",
        whisper: props.Whisper?.rich_text?.[0]?.plain_text || "",
      };
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("❌ Failed to fetch from Notion:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
