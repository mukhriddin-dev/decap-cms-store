"use client"

import ProductModal from "@/components/product-modal"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

export default function ProductModalWrapper({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className="w-full bg-purple-600 hover:bg-purple-700">
        <ShoppingCart className="h-4 w-4 mr-2" />
        Buyurtma berish
      </Button>

      <ProductModal product={product} isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}

