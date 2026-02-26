import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID!;

// ---- helpers ----
function richTextToPlain(rt: any[] | undefined) {
  return (rt ?? []).map((t) => t.plain_text).join("");
}

function richTextToHtml(rt: any[] | undefined) {
  return (rt ?? [])
    .map((t) => {
      const text = t.plain_text ?? "";
      const a = t.annotations ?? {};
      let out = text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\n", "<br/>");

      if (a.code) out = `<code>${out}</code>`;
      if (a.bold) out = `<strong>${out}</strong>`;
      if (a.italic) out = `<em>${out}</em>`;
      if (a.underline) out = `<u>${out}</u>`;
      if (a.strikethrough) out = `<s>${out}</s>`;
      if (t.href)
        out = `<a href="${t.href}" target="_blank" rel="noreferrer">${out}</a>`;
      return out;
    })
    .join("");
}

async function getAllBlocks(blockId: string) {
  const blocks: any[] = [];
  let cursor: string | undefined = undefined;

  while (true) {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });

    blocks.push(...res.results);

    if (!res.has_more) break;
    cursor = res.next_cursor ?? undefined;
  }

  return blocks;
}

function blocksToHtml(blocks: any[]) {
  const html: string[] = [];
  let inBullets = false;
  let inNumbers = false;

  const closeLists = () => {
    if (inBullets) {
      html.push("</ul>");
      inBullets = false;
    }
    if (inNumbers) {
      html.push("</ol>");
      inNumbers = false;
    }
  };

  for (const b of blocks) {
    const type = b.type;

    if (type === "bulleted_list_item") {
      if (inNumbers) {
        html.push("</ol>");
        inNumbers = false;
      }
      if (!inBullets) {
        html.push("<ul>");
        inBullets = true;
      }
      const txt = richTextToHtml(b.bulleted_list_item?.rich_text);
      html.push(`<li>${txt}</li>`);
      continue;
    }

    if (type === "numbered_list_item") {
      if (inBullets) {
        html.push("</ul>");
        inBullets = false;
      }
      if (!inNumbers) {
        html.push("<ol>");
        inNumbers = true;
      }
      const txt = richTextToHtml(b.numbered_list_item?.rich_text);
      html.push(`<li>${txt}</li>`);
      continue;
    }

    // any non-list block closes lists
    closeLists();

    if (type === "paragraph") {
      const txt = richTextToHtml(b.paragraph?.rich_text);
      // skip empty paragraphs
      if (txt.trim()) html.push(`<p>${txt}</p>`);
      continue;
    }

    if (type === "heading_1") {
      html.push(`<h1>${richTextToHtml(b.heading_1?.rich_text)}</h1>`);
      continue;
    }

    if (type === "heading_2") {
      html.push(`<h2>${richTextToHtml(b.heading_2?.rich_text)}</h2>`);
      continue;
    }

    if (type === "heading_3") {
      html.push(`<h3>${richTextToHtml(b.heading_3?.rich_text)}</h3>`);
      continue;
    }

    if (type === "quote") {
      html.push(
        `<blockquote>${richTextToHtml(b.quote?.rich_text)}</blockquote>`,
      );
      continue;
    }

    if (type === "divider") {
      html.push("<hr/>");
      continue;
    }

    // fallback: ignore unknown block types for now
  }

  // close any open list at end
  if (inBullets) html.push("</ul>");
  if (inNumbers) html.push("</ol>");

  return html.join("\n");
}

// ---- route ----
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    const queryArgs: any = {
      database_id: databaseId,
      sorts: [{ property: "Date", direction: "descending" }],
    };

    // Optional: only show posts where Publication Date checkbox is checked
    // (comment this out if you don't want that behavior)
    const publishedFilter = {
      property: "Publication Date",
      checkbox: { equals: true },
    };

    if (slug) {
      queryArgs.filter = {
        and: [
          publishedFilter,
          {
            property: "Slug",
            rich_text: { equals: slug },
          },
        ],
      };
    } else {
      queryArgs.filter = publishedFilter;
    }

    const response = await notion.databases.query(queryArgs);

    const posts = await Promise.all(
      response.results.map(async (page: any) => {
        const props = page.properties;

        const base = {
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

        // Only fetch body content when requesting a single post by slug
        if (!slug) return base;

        const blocks = await getAllBlocks(page.id);
        const content = blocksToHtml(blocks);

        return { ...base, content };
      }),
    );

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("❌ Failed to fetch from Notion:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
