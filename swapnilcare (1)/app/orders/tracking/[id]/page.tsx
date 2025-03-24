"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Box, Check, Clock, Home, MapPin, Package, Phone, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

// Mock order data
const orderStatuses = [
  { id: 1, status: "Order Placed", date: "July 25, 2023, 10:30 AM", completed: true },
  { id: 2, status: "Order Confirmed", date: "July 25, 2023, 11:45 AM", completed: true },
  { id: 3, status: "Processing", date: "July 25, 2023, 2:15 PM", completed: true },
  { id: 4, status: "Shipped", date: "July 26, 2023, 9:20 AM", completed: true },
  { id: 5, status: "Out for Delivery", date: "July 27, 2023, 10:05 AM", completed: false },
  { id: 6, status: "Delivered", date: "", completed: false },
]

const orderDetails = {
  id: "SC123456",
  date: "July 25, 2023",
  total: 1250,
  paymentMethod: "Credit Card",
  shippingAddress: "123 Health Street, Medical District, Mumbai, Maharashtra, India - 400001",
  items: [
    { id: 1, name: "Paracetamol 500mg", quantity: 2, price: 50 },
    { id: 2, name: "Vitamin C 1000mg", quantity: 1, price: 350 },
    { id: 3, name: "Blood Glucose Monitor", quantity: 1, price: 1599 },
  ],
  estimatedDelivery: "July 27, 2023",
}

export default function OrderTrackingPage() {
  const { id } = useParams()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(4) // Shipped status
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    // Calculate progress percentage
    const completedSteps = orderStatuses.filter((status) => status.completed).length
    const totalSteps = orderStatuses.length
    const progress = (completedSteps / totalSteps) * 100
    setProgressValue(progress)
    setCurrentStep(completedSteps)
  }, [])

  const handleContactSupport = () => {
    toast({
      title: "Support request sent",
      description: "Our customer support team will contact you shortly.",
      duration: 3000,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/account/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2 text-[#182628]">Track Your Order</h1>
        <p className="text-muted-foreground">Order #{id || orderDetails.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Status */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>Estimated delivery: {orderDetails.estimatedDelivery}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Progress value={progressValue} className="h-2" />
              </div>

              <div className="relative">
                {orderStatuses.map((status, index) => (
                  <div key={status.id} className="mb-8 relative">
                    <div className="flex items-start">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          status.completed
                            ? "bg-[#57BA98] text-white"
                            : index === currentStep
                              ? "bg-[#650CB5] text-white"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {status.completed ? (
                          <Check className="h-5 w-5" />
                        ) : index === currentStep ? (
                          <Clock className="h-5 w-5" />
                        ) : (
                          getStatusIcon(status.status)
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-lg">{status.status}</h3>
                        <p className="text-sm text-muted-foreground">{status.date || "Pending"}</p>
                        {index === currentStep && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 p-3 bg-[#650CB5]/10 rounded-md text-sm"
                          >
                            {getStatusMessage(status.status)}
                          </motion.div>
                        )}
                      </div>
                    </div>
                    {index < orderStatuses.length - 1 && (
                      <div
                        className={`absolute left-5 top-10 w-0.5 h-12 ${
                          status.completed ? "bg-[#57BA98]" : "bg-muted"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <Button variant="outline" onClick={handleContactSupport}>
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
                <Button className="bg-gradient-to-r from-[#650CB5] to-[#57BA98]">
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Placed on {orderDetails.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Items</h3>
                  <div className="space-y-3">
                    {orderDetails.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="text-sm">₹{orderDetails.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Shipping</span>
                    <span className="text-sm">Free</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{orderDetails.total}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p className="text-sm">{orderDetails.shippingAddress}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-sm">{orderDetails.paymentMethod}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function getStatusIcon(status: string) {
  switch (status) {
    case "Order Placed":
      return <Box className="h-5 w-5" />
    case "Order Confirmed":
      return <Check className="h-5 w-5" />
    case "Processing":
      return <Package className="h-5 w-5" />
    case "Shipped":
      return <Truck className="h-5 w-5" />
    case "Out for Delivery":
      return <Truck className="h-5 w-5" />
    case "Delivered":
      return <Home className="h-5 w-5" />
    default:
      return <Clock className="h-5 w-5" />
  }
}

function getStatusMessage(status: string) {
  switch (status) {
    case "Order Placed":
      return "Your order has been received and is being processed."
    case "Order Confirmed":
      return "Your order has been confirmed and is being prepared."
    case "Processing":
      return "Your order is being prepared for shipping."
    case "Shipped":
      return "Your order has been shipped and is on its way to you."
    case "Out for Delivery":
      return "Your order is out for delivery and will arrive today."
    case "Delivered":
      return "Your order has been delivered. Enjoy your products!"
    default:
      return "Status update pending."
  }
}

