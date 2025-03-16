'use server'

import { cache } from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

async function readMarkdownFiles(directory: string) {
  try {
    const contentDir = path.join(process.cwd(), directory)

    if (!fs.existsSync(contentDir)) {
      console.error(`Directory not found: ${contentDir}`)
      return []
    }

    const fileNames = fs.readdirSync(contentDir)

    return fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const id = fileName.replace(/\.md$/, "")
        const fullPath = path.join(contentDir, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const matterResult = matter(fileContents)

        return {
          id,
          ...matterResult.data,
        }
      })
  } catch (error) {
    console.error(`Error reading markdown files from directory: ${directory}`, error)
    return []
  }
}

export const getCategories = cache(async () => {
  try {
    const categories = await readMarkdownFiles("content/categories")
    return categories.map((category) => ({
      id: category.id,
      name: category.title,
      image: category.image,
    }))
  } catch (error) {
    console.error("Error reading categories:", error)
    return []
  }
})

export const getCategoryById = cache(async (id: string) => {
  try {
    const categories = await getCategories()
    return categories.find((category) => category.id === id) || null
  } catch (error) {
    console.error("Error getting category by ID:", error)
    return null
  }
})

export const getAllProducts = cache(async () => {
  try {
    const products = await readMarkdownFiles("content/products")
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      mainImage: product.mainImage,
      gallery: product.gallery || [],
      price: product.price,
      description: product.description,
      category: product.category,
    }))
  } catch (error) {
    console.error("Error reading products:", error)
    return []
  }
})

export const getProductsByCategory = cache(async (categoryId: string) => {
  try {
    const allProducts = await getAllProducts()
    const categories = await getCategories()

    const category = categories.find((cat) => cat.id === categoryId)
    if (!category) return []

    return allProducts.filter((product) => 
      product.category.toLowerCase() === category.name.toLowerCase()
    )
  } catch (error) {
    console.error("Error getting products by category:", error)
    return []
  }
})

export const getProductById = cache(async (id: string) => {
  try {
    const products = await getAllProducts()
    return products.find((product) => product.id === id) || null
  } catch (error) {
    console.error("Error getting product by ID:", error)
    return null
  }
})