"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Home, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function OrderSuccessPage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Generate a random order number
  const orderNumber = `SC${Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")}`

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
              >
                <CheckCircle className="h-10 w-10 text-green-600" />
              </motion.div>
            </div>
            <CardTitle className="text-2xl">Order Placed Successfully!</CardTitle>
            <CardDescription>Thank you for shopping with SwapnilCare</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <p className="font-bold text-lg">{orderNumber}</p>
            </div>

            <div className="space-y-2 text-center">
              <p className="text-sm">We've sent a confirmation email with your order details.</p>
              <p className="text-sm text-muted-foreground">Your order will be delivered within 3-5 business days.</p>
            </div>

            <div className="flex items-center justify-center space-x-2 pt-2">
              <div className="w-3 h-3 rounded-full bg-[#650CB5]"></div>
              <div className="w-3 h-3 rounded-full bg-[#57BA98]"></div>
              <div className="w-3 h-3 rounded-full bg-[#389456]"></div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button asChild className="w-full bg-gradient-to-r from-[#650CB5] to-[#57BA98]">
              <Link href="/account/orders">
                <Package className="mr-2 h-4 w-4" />
                Track Your Order
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

