"use client"

import ProductCard from "@/components/product-card"

// This is a client component wrapper for the server-rendered product data
export default function ProductCardWrapper({ product }) {
  return <ProductCard product={product} />
}

