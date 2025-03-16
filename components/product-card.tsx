"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Eye, ShoppingCart } from "lucide-react"
import ProductModal from "@/components/product-modal"
import ImageFullScreen from "@/components/image-full-screen"
import { useFavorites } from "@/contexts/favorites-context"

export default function ProductCard({ product }) {

  const [isImageFullScreen, setIsImageFullScreen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const allImages = [product.mainImage, ...(product.gallery || [])]
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()

  const favorite = isFavorite(product.id)

  const openFullScreenImage = (e) => {
    e.preventDefault() // Prevent navigation when clicking on image
    setCurrentImageIndex(0)
    setIsImageFullScreen(true)
  }

  const toggleFavorite = (e) => {
    e.preventDefault() // Prevent navigation when clicking on favorite button
    if (favorite) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product.id)
    }
  }

  const openOrderModal = (e) => {
    e.preventDefault() // Prevent navigation
    e.stopPropagation() // Stop event propagation
    setIsModalOpen(true)
  }

  return (
    <>
      <Card className="group overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-all duration-300 bg-white border-0 rounded-2xl">
        {/* Product Image - Clickable to open fullscreen */}
        <div className="relative h-40 sm:h-44 md:h-52 bg-gray-50 overflow-hidden flex items-center justify-center rounded-t-2xl">
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`h-8 w-8 rounded-full backdrop-blur-sm hover:bg-white ${
                favorite ? "bg-pink-100 text-pink-600 border-pink-200" : "bg-white/80 text-gray-400"
              }`}
              onClick={toggleFavorite}
            >
              <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={openFullScreenImage}
            >
              <Eye className="h-4 w-4 text-purple-600" />
            </Button>
          </div>

          <Link
            href={`/product/${product.id}`}
            className="relative w-full h-full cursor-pointer transition-transform duration-500 group-hover:scale-105"
          >
            <Image
              src={product.mainImage || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="p-3 flex-grow flex flex-col">
          
          <div className="mb-1">
            <span className="text-[8px] md:text-[10px] bg-gray-100 p-1 rounded-[20px] text-green-500 font-medium uppercase">{product.category}</span>
          </div>

          {/* Product Name - Clickable to navigate to product page */}
          <Link href={`/product/${product.id}`} className="hover:text-purple-600 transition-colors">
            <h3 className="font-medium text-xs md:text-base mb-1 line-clamp-2">{product.name}</h3>
          </Link>

          <p className="font-bold text-base md:text-lg text-purple-700 mt-auto">{product.price}</p>

          {/* Order Button - Opens modal */}
          <Button onClick={openOrderModal} className="w-full text-[12px] md:text-md   px-2 h-[32px] md:h-auto  mt-2 bg-purple-600 hover:bg-purple-700 rounded-xl">
            <ShoppingCart className="h-4 w-4 mr-1 md:mr-2" />
              Buyurtma berish
          </Button>
        </div>
      </Card>

      {/* Product Modal */}
      <ProductModal product={product} isOpen={isModalOpen} onOpenChange={setIsModalOpen} />

      {isImageFullScreen && (
        <ImageFullScreen
          images={allImages}
          initialIndex={currentImageIndex}
          alt={product.name}
          onClose={() => setIsImageFullScreen(false)}
          onIndexChange={setCurrentImageIndex}
        />
      )}
    </>
  )
}

