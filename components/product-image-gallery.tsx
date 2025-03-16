"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useFavorites } from "@/contexts/favorites-context"

export default function ProductImageGallery({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeView, setActiveView] = useState("front") // 'front' or 'back'
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()

  const favorite = isFavorite(product.id)
  const allImages = [product.mainImage, ...(product.gallery || [])].filter(Boolean)

  // If we have less than 2 images, add a placeholder
  const displayImages = allImages.length < 2 ? [...allImages, "/placeholder.svg?height=400&width=400"] : allImages

  const toggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (favorite) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product.id)
    }
  }

  return (
    <div className="flex gap-4">
      {/* Thumbnails column on the left */}
      <div className="flex flex-col gap-2 w-24">
        {displayImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border transition-colors ${
              index === currentIndex ? "border-orange-500" : "border-gray-200"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${product.name} - thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
            {index === currentIndex && <div className="absolute inset-0 border-2 border-orange-500 rounded-md"></div>}
          </button>
        ))}
      </div>

      {/* Main product images */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main image */}
        <div className="relative aspect-square bg-white rounded-lg overflow-hidden border border-gray-100">
          <Image
            src={displayImages[currentIndex] || "/placeholder.svg"}
            alt={`${product.name} - image ${currentIndex + 1}`}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />

          {/* Brand logo */}
          <div className="absolute bottom-2 right-2">
            <Image src="/placeholder.svg?height=30&width=80&text=LOGO" alt="Brand logo" width={80} height={30} />
          </div>
        </div>

        {/* Secondary image (only on desktop) */}
        <div className="relative aspect-square bg-white rounded-lg overflow-hidden border border-gray-100 hidden md:block">
          <Image
            src={displayImages[currentIndex === 0 ? 1 : 0] || "/placeholder.svg"}
            alt={`${product.name} - secondary view`}
            fill
            className="object-contain p-4"
            sizes="50vw"
          />

          {/* Favorite button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white shadow-md"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-6 w-6 ${favorite ? "fill-black text-black" : "text-gray-400"}`} />
          </button>

          {/* Brand logo */}
          <div className="absolute bottom-2 right-2">
            <Image src="/placeholder.svg?height=30&width=80&text=LOGO" alt="Brand logo" width={80} height={30} />
          </div>
        </div>
      </div>
    </div>
  )
}

