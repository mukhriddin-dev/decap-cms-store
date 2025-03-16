import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted p-4">
      <div className="text-center max-w-md bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg border border-white/20">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-primary">404</span>
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Sahifa topilmadi</h2>
        <p className="text-muted-foreground mb-6">
          Siz qidirayotgan sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>
        <Button asChild>
          <Link href="/">Bosh sahifaga qaytish</Link>
        </Button>
      </div>
    </div>
  )
}

