"use client"

import { useState, useEffect, useRef } from "react"
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ImageFullScreen({ images, initialIndex = 0, alt, onClose, onIndexChange }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [touchStartX, setTouchStartX] = useState(null)
  const containerRef = useRef(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  useEffect(() => {
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden"

    // Handle ESC key to close
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      } else if (e.key === "ArrowRight") {
        nextImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    // Reset zoom and position when changing images
    setScale(1)
    setPosition({ x: 0, y: 0 })

    // Notify parent component of index change
    if (onIndexChange) {
      onIndexChange(currentIndex)
    }
  }, [currentIndex, onIndexChange])

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4))
  }

  const handleZoomOut = () => {
    if (scale > 1) {
      setScale((prev) => Math.max(prev - 0.5, 1))
      // Reset position if zooming out to 1
      if (scale - 0.5 <= 1) {
        setPosition({ x: 0, y: 0 })
      }
    }
  }

  const resetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    setTouchStartX(touch.clientX)

    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      })
    }
  }

  const handleTouchMove = (e) => {
    const touch = e.touches[0]

    if (isDragging && scale > 1) {
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      })
      // Prevent default to stop page scrolling when zoomed in
      e.preventDefault()
    }
  }

  const handleTouchEnd = (e) => {
    setIsDragging(false)

    // Only handle swipe if not zoomed in
    if (scale === 1 && touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX
      const diff = touchStartX - touchEndX

      // Check if the swipe distance is significant enough
      if (Math.abs(diff) > minSwipeDistance) {
        if (diff > 0) {
          // Swipe left, go to next image
          nextImage()
        } else {
          // Swipe right, go to previous image
          prevImage()
        }
      }

      setTouchStartX(null)
    }
  }

  // Handle navigation button clicks with stopPropagation
  const handlePrevClick = (e) => {
    e.stopPropagation()
    prevImage()
  }

  const handleNextClick = (e) => {
    e.stopPropagation()
    nextImage()
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
      <div className="absolute top-4 right-4 flex gap-2 z-[10001]">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 hover:bg-white/20 rounded-full"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-5 w-5 text-white" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 hover:bg-white/20 rounded-full"
          onClick={handleZoomOut}
          disabled={scale <= 1}
        >
          <ZoomOut className="h-5 w-5 text-white" />
        </Button>
        <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 rounded-full" onClick={onClose}>
          <X className="h-5 w-5 text-white" />
        </Button>
      </div>

      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-hidden"
        style={{ cursor: scale > 1 ? "move" : "default", zIndex: 10000 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`${alt} - image ${currentIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={resetZoom}
          />
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevClick}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 rounded-full p-2 hover:bg-white/30 z-[10001]"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={handleNextClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 rounded-full p-2 hover:bg-white/30 z-[10001]"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-[10001]">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

