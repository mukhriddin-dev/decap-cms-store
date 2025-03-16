"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import LoadingSpinner from "@/components/loading-spinner"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    window.location.href = "/admin/index.html"
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <LoadingSpinner size="large" />
      <p className="mt-4 text-muted-foreground">Admin paneliga yo'naltirilmoqda...</p>
    </div>
  )
}

