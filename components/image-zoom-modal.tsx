"use client"

import { useState, useEffect } from "react"
import { X, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ImageZoomModal({ isOpen, onClose, image, alt }) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
      // Reset zoom and position when modal closes
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 1))
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
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    }
  }

  const handleTouchMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="absolute top-4 right-4 flex gap-2">
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
        >
          <ZoomOut className="h-5 w-5 text-white" />
        </Button>
        <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 rounded-full" onClick={onClose}>
          <X className="h-5 w-5 text-white" />
        </Button>
      </div>

      <div
        className="w-full h-full flex items-center justify-center overflow-hidden cursor-move"
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
            src={image || "/placeholder.svg"}
            alt={alt || "Zoomed image"}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      </div>
    </div>
  )
}

