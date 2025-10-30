import dotenv from "dotenv";
dotenv.config({ path: ".env" }); // 👈 loads the .env file manually

import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

(async () => {
  try {
    console.log("🔍 Checking token:", process.env.NOTION_TOKEN?.slice(0, 8) + "...");
    console.log("🔍 Database ID:", process.env.NOTION_DATABASE_ID);

    const db = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    const title = (db as any).title?.[0]?.plain_text || "Unknown Database";
    console.log("✅ Connected to Notion Database:", title);
  } catch (error: any) {
    console.error("❌ Connection failed:", error.message);
  }
})();
