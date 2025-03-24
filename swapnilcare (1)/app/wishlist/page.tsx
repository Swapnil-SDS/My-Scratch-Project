"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, totalItems } = useWishlist()
  const { addToCart, isInCart } = useCart()
  const { toast } = useToast()

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeFromWishlist(productId)
    toast({
      title: "Removed from wishlist",
      description: `${productName} has been removed from your wishlist`,
      duration: 3000,
    })
  }

  const handleAddToCart = (product: any) => {
    if (!isInCart(product.id)) {
      addToCart(product, 1)
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
        duration: 3000,
      })
    }
  }

  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any products to your wishlist yet.</p>
          <Button asChild className="bg-gradient-to-r from-[#650CB5] to-[#57BA98]">
            <Link href="/products">Explore Products</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#182628]">Your Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-700">
              <Link href={`/products/${product.id}`}>
                <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </Link>
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-[#650CB5] text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={() => handleRemoveFromWishlist(product.id, product.name)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-medium text-base mb-1 hover:text-[#650CB5] transition-colors">{product.name}</h3>
              </Link>
              <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>

              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-[#650CB5]">
                  ₹{product.price - (product.price * product.discount) / 100}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm text-muted-foreground line-through">₹{product.price}</span>
                )}
              </div>

              <Button
                className="w-full bg-gradient-to-r from-[#650CB5] to-[#57BA98]"
                onClick={() => handleAddToCart(product)}
                disabled={isInCart(product.id)}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

