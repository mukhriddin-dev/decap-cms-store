import Link from "next/link"
import Image from "next/image"
import { Phone, Instagram, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductCardWrapper from "@/components/product-card-wrapper"
import MobileAppBar from "@/components/mobile-app-bar"
import { getCategories, getProductsByCategory } from "@/lib/utils"

// Add route segment config for caching
export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  // Server-side data fetching
  const categories = await getCategories()

  // Fetch products for each category
  const productsByCategory = {}
  for (const category of categories) {
    const categoryProducts = await getProductsByCategory(category.id)
    productsByCategory[category.id] = categoryProducts
  }

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30 backdrop-blur-md bg-white/90">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="font-bold text-2xl">
              <span className="text-purple-600">Novo</span>
              <span className="text-purple-400">Toys</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Bosh sahifa
              </Link>
              <Link href="/#categories" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Kategoriyalar
              </Link>
              <a href="tel:+998901234567" className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-purple-600" />
                <span>+998 90 123 45 67</span>
              </a>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-gray-600 hover:text-purple-600 transition-colors" />
                </a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <path d="M18 8L5 12.5 9.5 14M18 8l-8.5 6M18 8l-4 12-4.5-6.5" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-gray-600 hover:text-purple-600 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Intro Banner */}
      <section className="relative w-full h-[250px] md:h-[400px] lg:h-[500px]">
        <Image src="/placeholder.svg" alt="Banner" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/70 to-purple-400/70 flex items-center justify-center">
          <div className="text-center text-white p-4 backdrop-blur-sm bg-white/10 rounded-xl border border-white/20 px-8 py-6">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">NovoToys</h1>
            <p className="text-base md:text-xl max-w-2xl mx-auto">Sifatli va xavfsiz bolalar o'yinchoqlari</p>
            <Button className="mt-6 bg-white text-purple-600 hover:bg-white/90">Katalogni ko'rish</Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Kategoriyalar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`} className="group">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-md">
                  <div className="relative h-32 md:h-48">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-600/80 flex items-end justify-center p-4">
                      <h3 className="font-semibold text-base md:text-lg text-white">{category.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Mahsulotlar</h2>

          {categories.map((category) => (
            <div key={category.id} id={`category-${category.id}`} className="mb-8 md:mb-12">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="text-lg md:text-2xl font-semibold">{category.name}</h3>
                <Link href={`/category/${category.id}`} className="text-sm text-purple-600 hover:underline">
                  Barchasini ko'rish
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {productsByCategory[category.id]
                  ?.slice(0, 4) // Show only up to 4 products per category on homepage
                  .map((product) => (
                    <ProductCardWrapper key={product.id} product={product} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Biz haqimizda</h3>
              <p className="text-white/80">
                NovoToys - bolalar uchun sifatli va xavfsiz o'yinchoqlar do'koni. Biz faqat eng yaxshi mahsulotlarni
                taqdim etamiz.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Aloqa</h3>
              <p className="text-white/80 mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                +998 90 123 45 67
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M18 8L5 12.5 9.5 14M18 8l-8.5 6M18 8l-4 12-4.5-6.5" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Manzil</h3>
              <p className="text-white/80">Toshkent shahri, Chilonzor tumani, 1-mavze</p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/80">
            <p>&copy; {new Date().getFullYear()} NovoToys.uz - Barcha huquqlar himoyalangan</p>
          </div>
        </div>
      </footer>

      {/* Mobile App Bar */}
      <MobileAppBar />
    </main>
  )
}

