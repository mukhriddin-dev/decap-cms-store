import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const categoryId = params.id

    // Build the file path
    const contentDir = path.join(process.cwd(), "content/categories")
    const filePath = path.join(contentDir, `${categoryId}.md`)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(null, { status: 404 })
    }

    // Read the file
    const fileContents = fs.readFileSync(filePath, "utf8")

    // Parse the markdown with gray-matter
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content)

    const contentHtml = processedContent.toString()

    // Format the category data
    const formattedCategory = {
      id: categoryId,
      name: data.title,
      image: data.image,
      content: contentHtml,
      markdown: content,
    }

    return NextResponse.json(formattedCategory, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("Error getting category by ID:", error)
    return NextResponse.json(null, { status: 404 })
  }
}

