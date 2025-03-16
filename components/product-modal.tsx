"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ImageFullScreen from "@/components/image-full-screen"

export default function ProductModal({ product, isOpen, onOpenChange }) {
  const allImages = [product.mainImage, ...(product.gallery || [])]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageFullScreen, setIsImageFullScreen] = useState(false)
  const [touchStartX, setTouchStartX] = useState(null)

  const handleTelegramOrder = () => {
    // Create a message with product details
    const message = `NovoToys.uz dan buyurtma:
Mahsulot: ${product.name}
Narxi: ${product.price}`

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message)

    // Open Telegram chat with the admin (replace ADMIN_USERNAME with actual username)
    window.open(`https://t.me/ADMIN_USERNAME?start=${encodedMessage}`, "_blank")
  }

  const handleImageChange = (index) => {
    setCurrentImageIndex(index)
  }

  const openFullScreenImage = () => {
    setIsImageFullScreen(true)
  }

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return

    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX

    // Minimum swipe distance
    const minSwipeDistance = 50

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swipe left, go to next image
        handleImageChange((currentImageIndex + 1) % allImages.length)
      } else {
        // Swipe right, go to previous image
        handleImageChange((currentImageIndex - 1 + allImages.length) % allImages.length)
      }
    }

    setTouchStartX(null)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 bg-white border border-gray-100 rounded-xl">
          <div className="p-6">
            <DialogHeader>
              <div className="flex flex-col">
                <DialogTitle className="text-xl font-semibold">{product.name}</DialogTitle>
                <DialogDescription className="text-purple-600 font-medium text-lg mt-1">
                  {product.price}
                </DialogDescription>
              </div>
            </DialogHeader>
            <div className="grid gap-6 py-4 md:grid-cols-2">
              <div
                className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden group"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* View full screen button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={openFullScreenImage}
                >
                  <Eye className="h-4 w-4 text-purple-600" />
                </Button>

                {/* Image container */}
                <div
                  className="relative w-full h-full cursor-pointer flex items-center justify-center"
                  onClick={openFullScreenImage}
                >
                  <Image
                    src={allImages[currentImageIndex] || "/placeholder.svg"}
                    alt={`${product.name} - image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Image navigation arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleImageChange((currentImageIndex - 1 + allImages.length) % allImages.length)
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1.5 hover:bg-white z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5 text-purple-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleImageChange((currentImageIndex + 1) % allImages.length)
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1.5 hover:bg-white z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5 text-purple-600" />
                    </button>
                  </>
                )}

                {/* Image indicators */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleImageChange(index)
                        }}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          index === currentImageIndex ? "bg-purple-600" : "bg-purple-200"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mt-2 overflow-x-auto pb-2 md:hidden">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? "border-purple-600" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Mahsulot haqida</h4>
                  <div className="text-gray-600 prose prose-sm max-w-none">
                    {typeof product.description === "string" ? <p>{product.description}</p> : product.description}
                  </div>
                </div>
                <Button onClick={handleTelegramOrder} className="w-full bg-[#0088cc] hover:bg-[#0088cc]/90">
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
                    className="mr-2"
                  >
                    <path d="M18 8L5 12.5 9.5 14M18 8l-8.5 6M18 8l-4 12-4.5-6.5" />
                  </svg>
                  Telegram orqali buyurtma berish
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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

