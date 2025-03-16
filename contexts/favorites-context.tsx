"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type FavoritesContextType = {
  favorites: string[]
  addToFavorites: (productId: string) => void
  removeFromFavorites: (productId: string) => void
  isFavorite: (productId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Initialize with empty array to prevent hydration mismatch
  const [favorites, setFavorites] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  // Only run after component is mounted (client-side)
  useEffect(() => {
    setMounted(true)
    try {
      const storedFavorites = localStorage.getItem("favorites")
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error)
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites))
      } catch (error) {
        console.error("Error saving favorites to localStorage:", error)
      }
    }
  }, [favorites, mounted])

  const addToFavorites = (productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) return prev
      return [...prev, productId]
    })
  }

  const removeFromFavorites = (productId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== productId))
  }

  const isFavorite = (productId: string) => {
    return favorites.includes(productId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

