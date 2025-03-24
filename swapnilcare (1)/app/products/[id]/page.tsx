"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { getMedicineById, getSimilarMedicines } from "@/lib/firebase"
import type { Medicine } from "@/types/medicine"
import ProductCard from "@/components/product-card"
import { useToast } from "@/components/ui/use-toast"
import PriceAlert from "@/components/price-alert"

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Medicine | null>(null)
  const [similarProducts, setSimilarProducts] = useState<Medicine[]>([])
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (typeof id === "string") {
          const productData = await getMedicineById(id)
          setProduct(productData)

          const similar = await getSimilarMedicines(productData.category)
          setSimilarProducts(similar.filter((item) => item.id !== id))

          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
        duration: 3000,
      })
    }
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 animate-pulse bg-gray-100 rounded-lg h-[400px]"></div>
          <div className="md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-100 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-100 rounded w-1/2 animate-pulse"></div>
            <div className="h-24 bg-gray-100 rounded w-full animate-pulse"></div>
            <div className="h-10 bg-gray-100 rounded w-1/3 animate-pulse"></div>
            <div className="h-12 bg-gray-100 rounded w-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Button className="mt-4" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="relative rounded-lg overflow-hidden mb-4 bg-white border shadow-sm aspect-square">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Image
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            </motion.div>
            {product.discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-[#650CB5]">{product.discount}% OFF</Badge>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative border rounded-md overflow-hidden cursor-pointer w-20 h-20 flex-shrink-0 transition-all ${
                  activeImage === index ? "ring-2 ring-[#650CB5]" : ""
                }`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-[#182628]">{product.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)} ({product.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-[#650CB5]">
                ₹{product.price - (product.price * product.discount) / 100}
              </span>
              {product.discount > 0 && <span className="text-muted-foreground line-through">₹{product.price}</span>}
              <PriceAlert product={product} />
            </div>
            <p className="text-muted-foreground mb-4">{product.description}</p>

            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                {product.category}
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-[#650CB5] to-[#57BA98] hover:opacity-90 transition-opacity"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Brand</p>
                <p className="font-medium">{product.brand}</p>
              </div>
              <div>
                <p className="text-muted-foreground">SKU</p>
                <p className="font-medium">{product.sku}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Prescription Required</p>
                <p className="font-medium">{product.prescriptionRequired ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Expiry Date</p>
                <p className="font-medium">{product.expiryDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p>{product.longDescription}</p>
              <h4 className="text-lg font-semibold mt-6 mb-2">Usage Instructions</h4>
              <p>{product.usage}</p>
              <h4 className="text-lg font-semibold mt-6 mb-2">Storage Information</h4>
              <p>{product.storage}</p>
            </div>
          </TabsContent>
          <TabsContent value="ingredients" className="mt-6">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
              <p>{product.ingredients}</p>
              <h4 className="text-lg font-semibold mt-6 mb-2">Warnings</h4>
              <ul className="list-disc pl-5 space-y-2">
                {product.warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              {product.reviewsList.map((review, index) => (
                <div key={index} className="border-b pb-4 mb-4 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{review.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{review.date}</p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Similar Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-[#182628]">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {similarProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

