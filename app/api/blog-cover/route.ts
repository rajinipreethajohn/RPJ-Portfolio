import { NextResponse } from "next/server";

const TRUSTED_IMAGE_HOSTS = new Set([
  "file.notion.so",
  "secure.notion-static.com",
  "prod-files-secure.s3.us-west-2.amazonaws.com",
  "s3.us-west-2.amazonaws.com",
]);

function isTrustedImageUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    return (
      parsedUrl.protocol === "https:" &&
      TRUSTED_IMAGE_HOSTS.has(parsedUrl.hostname)
    );
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const coverUrl = searchParams.get("url");

    if (!coverUrl) {
      return NextResponse.json({ error: "Missing cover URL" }, { status: 400 });
    }

    if (!isTrustedImageUrl(coverUrl)) {
      return NextResponse.json(
        { error: "Unsupported cover image host" },
        { status: 400 }
      );
    }

    console.log("🖼️ Fetching cover image:", coverUrl.substring(0, 100) + "...");

    // Notion file URLs are signed, so this request must not forward NOTION_TOKEN.
    const response = await fetch(coverUrl, {
      redirect: "follow",
    });

    console.log("🖼️ Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Cover image fetch failed:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch cover image", status: response.status, details: errorText },
        { status: response.status }
      );
    }

    // Get the image as a buffer
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    console.log("🖼️ Image fetched successfully, size:", imageBuffer.byteLength, "bytes");

    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error: any) {
    console.error("❌ Failed to proxy cover image:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
