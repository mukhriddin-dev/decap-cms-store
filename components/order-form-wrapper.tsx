"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import OrderForm from "@/components/order-form"

export default function OrderFormWrapper({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className="w-full bg-purple-600 hover:bg-purple-700">
        <ShoppingCart className="h-4 w-4 mr-2" />
        Buyurtma berish
      </Button>

      <OrderForm product={product} isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}

