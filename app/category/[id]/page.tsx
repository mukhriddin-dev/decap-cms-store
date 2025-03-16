import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import ProductCardWrapper from "@/components/product-card-wrapper"
import MobileAppBar from "@/components/mobile-app-bar"
import { getCategoryById, getProductsByCategory } from "@/lib/utils"

// Add route segment config for caching
export const revalidate = 3600 // Revalidate every hour

export default async function CategoryPage({ params }) {
  // Server-side data fetching
  const categoryId = params.id

  try {
    const category = await getCategoryById(categoryId)

    // If category doesn't exist, show 404
    if (!category) {
      notFound()
    }

    const products = await getProductsByCategory(categoryId)

    return (
      <main className="min-h-screen pb-20 md:pb-0">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-4 flex items-center">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-purple-600">
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <h1 className="font-bold text-xl">{category.name}</h1>
            </div>
          </div>
        </header>

        {/* Category Banner */}
        <section className="relative w-full h-[180px] md:h-[250px]">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/70 to-purple-400/70 flex items-center justify-center">
            <div className="text-center text-white p-4 bg-white/10 backdrop-blur-md rounded-xl">
              <h1 className="text-2xl md:text-4xl font-bold">{category.name}</h1>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-6 md:py-10">
          <div className="container mx-auto px-4">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {products.map((product) => (
                  <ProductCardWrapper key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-lg">
                <p className="text-gray-500">Bu kategoriyada mahsulotlar topilmadi.</p>
                <Link href="/" className="text-purple-600 font-medium mt-4 inline-block hover:underline">
                  Bosh sahifaga qaytish
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Mobile App Bar */}
        <MobileAppBar />
      </main>
    )
  } catch (error) {
    console.error(`Error loading category page for ${categoryId}:`, error)

    // Show error UI
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ma'lumotlarni yuklashda xatolik yuz berdi</h1>
          <p className="text-gray-500 mb-6">Iltimos, keyinroq qayta urinib ko'ring</p>
          <Button asChild>
            <Link href="/">Bosh sahifaga qaytish</Link>
          </Button>
        </div>
      </div>
    )
  }
}

