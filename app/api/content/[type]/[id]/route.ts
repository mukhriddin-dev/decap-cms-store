import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

export async function GET(request: Request, { params }: { params: { type: string; id: string } }) {
  try {
    const { type, id } = params

    // Validate content type
    if (!["products", "categories"].includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    // Build the file path
    const contentDir = path.join(process.cwd(), "content", type)
    const filePath = path.join(contentDir, `${id}.md`)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Read the file
    const fileContents = fs.readFileSync(filePath, "utf8")

    // Parse the markdown with gray-matter
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content)

    const contentHtml = processedContent.toString()

    // Return both metadata and content
    return NextResponse.json(
      {
        id,
        metadata: data,
        content: contentHtml,
        markdown: content,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    )
  } catch (error) {
    console.error(`Error reading content file:`, error)
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 })
  }
}

