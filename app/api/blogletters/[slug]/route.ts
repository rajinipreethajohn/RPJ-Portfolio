import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID!;

async function getAllBlocks(blockId: string) {
  let allBlocks: any[] = [];
  let cursor: string | undefined = undefined;
  let hasMore = true;

  while (hasMore) {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    });

    allBlocks = [...allBlocks, ...response.results];
    hasMore = response.has_more;
    cursor = response.next_cursor ?? undefined;
  }

  return allBlocks;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const dbRes = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Slug",
        rich_text: { equals: slug },
      },
    });

    const page = dbRes.results[0] as any;

    if (!page) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const blocks = await getAllBlocks(page.id);

    const props = page.properties;

    return NextResponse.json({
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
      blocks,
    });
  } catch (error: any) {
    console.error("❌ Failed to fetch post:", error.message);

    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 },
    );
  }
}
