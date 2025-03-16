"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OrderForm({ product, isOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
    comment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuantityChange = (value) => {
    setFormData((prev) => ({ ...prev, quantity: Number.parseInt(value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Order submitted:", {
        product: product.name,
        productId: product.id,
        ...formData,
      })

      setSubmitSuccess(true)

      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          address: "",
          quantity: 1,
          comment: "",
        })
        setSubmitSuccess(false)
        onOpenChange(false)
      }, 2000)
    } catch (error) {
      console.error("Error submitting order:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-700 to-purple-500 p-6 text-white relative">
          <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4 text-white/80 hover:text-white">
            <X className="h-5 w-5" />
          </button>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Buyurtma berish</DialogTitle>
            <DialogDescription className="text-white/80">
              {product.name} mahsulotini buyurtma qilish uchun ma'lumotlarni to'ldiring
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Ismingiz</Label>
              <Input
                id="name"
                name="name"
                placeholder="To'liq ismingizni kiriting"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Telefon raqamingiz</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+998 90 123 45 67"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Manzil</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Yetkazib berish manzilini kiriting"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quantity">Miqdori</Label>
              <Select value={formData.quantity.toString()} onValueChange={handleQuantityChange}>
                <SelectTrigger id="quantity">
                  <SelectValue placeholder="Miqdorni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} dona
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="comment">Qo'shimcha izoh (ixtiyoriy)</Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Qo'shimcha ma'lumotlar"
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Mahsulot:</span>
              <span className="font-medium">{product.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Narxi:</span>
              <span className="font-medium">{product.price}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Miqdori:</span>
              <span className="font-medium">{formData.quantity} dona</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="font-medium">Jami:</span>
              <span className="font-bold text-purple-600">{product.price}</span>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isSubmitting || submitSuccess}
            >
              {isSubmitting ? "Yuborilmoqda..." : submitSuccess ? "Muvaffaqiyatli yuborildi!" : "Buyurtma berish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

