"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import MobileAppBar from "@/components/mobile-app-bar"
import LoadingSpinner from "@/components/loading-spinner"
import { useFavorites } from "@/contexts/favorites-context"
import { getAllProducts } from "@/lib/utils"

export default function FavoritesPage() {
  const [loading, setLoading] = useState(true)
  const [favoriteProducts, setFavoriteProducts] = useState([])
  const [error, setError] = useState(null)
  const { favorites } = useFavorites()

  useEffect(() => {
    let isMounted = true

    async function loadFavorites() {
      try {
        if (favorites.length === 0) {
          setFavoriteProducts([])
          setLoading(false)
          return
        }

        // Get all products
        const allProducts = await getAllProducts()
        const filteredProducts = allProducts.filter((product) => favorites.includes(product.id))

        if (isMounted) {
          setFavoriteProducts(filteredProducts)
          setLoading(false)
        }
      } catch (error) {
        console.error("Error loading favorites:", error)
        if (isMounted) {
          setError("Ma'lumotlarni yuklashda xatolik yuz berdi")
          setLoading(false)
        }
      }
    }

    loadFavorites()

    return () => {
      isMounted = false
    }
  }, [favorites])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-500">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Xatolik yuz berdi</h1>
          <p className="text-gray-500 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Qayta yuklash</Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30 backdrop-blur-md bg-white/90">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-purple-600">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-bold text-xl">Sevimlilar</h1>
          </div>
        </div>
      </header>

      {/* Favorites Content */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          {favoriteProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {favoriteProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-lg">
              <p className="text-gray-500">Sevimli mahsulotlar yo'q</p>
              <Link href="/" className="text-purple-600 font-medium mt-4 inline-block hover:underline">
                Mahsulotlarni ko'rish
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Mobile App Bar */}
      <MobileAppBar />
    </main>
  )
}

