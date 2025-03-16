import LoadingSpinner from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-500">Yuklanmoqda...</p>
      </div>
    </div>
  )
}

