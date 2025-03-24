"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import type { Medicine } from "@/types/medicine"

interface PriceAlertProps {
  product: Medicine
}

export default function PriceAlert({ product }: PriceAlertProps) {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState("")
  const [targetPrice, setTargetPrice] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const currentPrice = product.price - (product.price * product.discount) / 100

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowModal(false)

      toast({
        title: "Price alert set!",
        description: `We'll notify you when ${product.name} drops below ₹${targetPrice}.`,
        duration: 5000,
      })

      setEmail("")
      setTargetPrice("")
    }, 1000)
  }

  return (
    <>
      <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowModal(true)}>
        <Bell className="h-4 w-4" />
        Set Price Alert
      </Button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Set Price Alert</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Get notified when the price of {product.name} drops below your target price.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="targetPrice">Target Price (₹)</Label>
                    <span className="text-sm text-muted-foreground">Current: ₹{currentPrice.toFixed(2)}</span>
                  </div>
                  <Input
                    id="targetPrice"
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    max={currentPrice}
                    step="0.01"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Enter a price lower than the current price</p>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Setting Alert..." : "Set Alert"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

