import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"

import MobileAppBar from "@/components/mobile-app-bar"
import OrderFormWrapper from "@/components/order-form-wrapper"
import ProductImageGallery from "@/components/product-image-gallery"
import { getProductById } from "@/lib/utils"

// Add route segment config for caching
export const revalidate = 3600 // Revalidate every hour

export default async function ProductPage({ params }) {
  // Server-side data fetching with error handling
  const productId = params.id

  try {
    const product = await getProductById(productId)

    // If product doesn't exist, show 404
    if (!product) {
      notFound()
    }

    return (
      <main className="min-h-screen pb-20 md:pb-0">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30 backdrop-blur-md bg-white/90">
          <div className="container mx-auto px-4 py-4 flex items-center">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-purple-600">
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <h1 className="font-bold text-xl">{product.name}</h1>
            </div>
          </div>
        </header>

        {/* Product Content */}
        <section className="py-6 md:py-10">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                {/* Product Image Gallery */}
                <ProductImageGallery product={product} />

                {/* Product Details */}
                <div className="mt-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={star <= 4.5 ? "currentColor" : "none"}
                              stroke={star > 4.5 ? "currentColor" : "none"}
                              className={`w-4 h-4 ${star <= 4.5 ? "text-yellow-400" : "text-gray-300"}`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">4.9 (25 otzyv) • 200+ buyurtma</span>
                      </div>
                    </div>
                    <p className="text-purple-600 font-semibold text-2xl">{product.price}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="font-medium mb-2">Mahsulot haqida</h2>
                    <div className="text-gray-600">
                      <p>{product.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold">Sifatli</div>
                      <div className="text-sm text-gray-500">Mahsulot</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold">1 yil</div>
                      <div className="text-sm text-gray-500">Kafolat</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold">Tez</div>
                      <div className="text-sm text-gray-500">Yetkazib berish</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold">24/7</div>
                      <div className="text-sm text-gray-500">Qo'llab-quvvatlash</div>
                    </div>
                  </div>

                  <OrderFormWrapper product={product} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Bar */}
        <MobileAppBar />
      </main>
    )
  } catch (error) {
    console.error(`Error loading product page for ${productId}:`, error)
    notFound()
  }
}

