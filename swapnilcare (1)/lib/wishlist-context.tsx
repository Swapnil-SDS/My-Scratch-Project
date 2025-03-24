"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Medicine } from "@/types/medicine"

interface WishlistContextType {
  wishlist: Medicine[]
  addToWishlist: (product: Medicine) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  totalItems: number
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  totalItems: 0,
})

export const useWishlist = () => useContext(WishlistContext)

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Medicine[]>([])
  const [totalItems, setTotalItems] = useState(0)

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist)
        setWishlist(parsedWishlist)
      } catch (error) {
        console.error("Error parsing wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    setTotalItems(wishlist.length)
  }, [wishlist])

  const addToWishlist = (product: Medicine) => {
    setWishlist((prevWishlist) => {
      const existingItem = prevWishlist.find((item) => item.id === product.id)

      if (existingItem) {
        return prevWishlist
      } else {
        return [...prevWishlist, product]
      }
    })
  }

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId))
  }

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId)
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        totalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

