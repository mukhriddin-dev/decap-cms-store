"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, Phone, Menu, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

export default function MobileAppBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <>
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 z-40 md:hidden"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="h-12 w-12 rounded-full bg-purple-600 shadow-lg flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS-style bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="mx-4 mb-4">
          <div className="flex items-center justify-around bg-white rounded-full shadow-md py-3 px-6">
            <Link
              href="/"
              className={`flex flex-col items-center ${isActive("/") ? "text-purple-600" : "text-gray-500"}`}
            >
              <Home className="h-6 w-6" />
            </Link>

            <Link
              href="/favorites"
              className={`flex items-center px-6 py-2 rounded-full ${
                isActive("/favorites") ? "bg-pink-100 text-pink-600" : "text-gray-500"
              }`}
            >
              <Heart className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Likes</span>
            </Link>

            <a href="tel:+998901234567" className="flex flex-col items-center text-gray-500">
              <Phone className="h-6 w-6" />
            </a>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className={`flex flex-col items-center ${open ? "text-purple-600" : "text-gray-500"}`}>
                  <User className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-0 border-l">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">
                      <span className="text-purple-600">Novo</span>
                      <span className="text-purple-400">Toys</span>
                    </h2>
                  </div>

                  <div className="p-4 flex-1 overflow-auto">
                    <nav className="flex flex-col gap-4">
                      <Link
                        href="/"
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl"
                        onClick={() => setOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Home className="h-5 w-5 text-purple-600" />
                        </div>
                        <span className="font-medium">Bosh sahifa</span>
                      </Link>

                      <Link
                        href="/favorites"
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl"
                        onClick={() => setOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                          <Heart className="h-5 w-5 text-pink-600" />
                        </div>
                        <span className="font-medium">Sevimlilar</span>
                      </Link>

                      <div className="mt-2">
                        <div className="flex items-center gap-3 p-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <Menu className="h-5 w-5 text-purple-600" />
                          </div>
                          <span className="font-medium">Kategoriyalar</span>
                        </div>

                        {/* Categories list */}
                        <div className="pl-12 flex flex-col gap-3">
                          <Link
                            href="/category/yumshoq-oyinchoqlar"
                            className="p-2 hover:bg-gray-50 rounded-xl"
                            onClick={() => setOpen(false)}
                          >
                            Yumshoq o'yinchoqlar
                          </Link>
                          <Link
                            href="/category/konstruktorlar"
                            className="p-2 hover:bg-gray-50 rounded-xl"
                            onClick={() => setOpen(false)}
                          >
                            Konstruktorlar
                          </Link>
                          <Link
                            href="/category/talimiy-oyinlar"
                            className="p-2 hover:bg-gray-50 rounded-xl"
                            onClick={() => setOpen(false)}
                          >
                            Ta'limiy o'yinlar
                          </Link>
                          <Link
                            href="/category/transport-oyinchoqlari"
                            className="p-2 hover:bg-gray-50 rounded-xl"
                            onClick={() => setOpen(false)}
                          >
                            Transport o'yinchoqlari
                          </Link>
                        </div>
                      </div>
                    </nav>
                  </div>

                  <div className="p-4 border-t">
                    <a href="tel:+998901234567" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-medium">+998 90 123 45 67</span>
                    </a>

                    <div className="flex items-center justify-center gap-6 mt-6">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-600"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                      </a>
                      <a
                        href="https://t.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-600"
                        >
                          <path d="M18 8L5 12.5 9.5 14M18 8l-8.5 6M18 8l-4 12-4.5-6.5" />
                        </svg>
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-600"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  )
}

