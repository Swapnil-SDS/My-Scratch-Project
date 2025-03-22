"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useToast } from "@/components/ui/use-toast"
import type { Medicine } from "@/types/medicine"

interface ProductCardProps {
  product: Medicine
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart(product, 1)

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
        duration: 3000,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
        duration: 3000,
      })
    }
  }

  const alreadyInCart = isInCart(product.id)
  const alreadyInWishlist = isInWishlist(product.id)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white dark:bg-gray-800 rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-700">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {product.discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-[#650CB5]">{product.discount}% OFF</Badge>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
          </div>

          <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
          <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>

          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-[#650CB5]">
              ₹{product.price - (product.price * product.discount) / 100}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">₹{product.price}</span>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-[#650CB5] to-[#57BA98] text-white hover:opacity-90"
              onClick={handleAddToCart}
              disabled={alreadyInCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {alreadyInCart ? "In Cart" : "Add"}
            </Button>
            <Button
              size="sm"
              variant={alreadyInWishlist ? "default" : "outline"}
              className={`flex-1 ${alreadyInWishlist ? "bg-[#650CB5]" : ""}`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-4 w-4 mr-1 ${alreadyInWishlist ? "fill-white" : ""}`} />
              {alreadyInWishlist ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

