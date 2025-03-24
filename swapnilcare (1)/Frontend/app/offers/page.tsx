"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Copy, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

const offers = [
  {
    id: 1,
    title: "20% OFF on All Products",
    description: "Use code SWAPNIL20 at checkout",
    code: "SWAPNIL20",
    discount: "20%",
    minOrder: "₹500",
    validUntil: "June 30, 2023",
    category: "all",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "15% OFF on Health Supplements",
    description: "Use code HEALTH15 at checkout",
    code: "HEALTH15",
    discount: "15%",
    minOrder: "No minimum",
    validUntil: "July 15, 2023",
    category: "supplements",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "10% OFF on All Products",
    description: "Use code CARE10 at checkout",
    code: "CARE10",
    discount: "10%",
    minOrder: "No minimum",
    validUntil: "August 31, 2023",
    category: "all",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "5% OFF for First-Time Customers",
    description: "Use code FIRST5 at checkout",
    code: "FIRST5",
    discount: "5%",
    minOrder: "No minimum",
    validUntil: "December 31, 2023",
    category: "all",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "Buy 1 Get 1 Free on Vitamins",
    description: "No code needed, automatically applied at checkout",
    code: "BOGO",
    discount: "Buy 1 Get 1",
    minOrder: "No minimum",
    validUntil: "July 31, 2023",
    category: "vitamins",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    title: "Free Shipping on Orders Over ₹1000",
    description: "No code needed, automatically applied at checkout",
    code: "FREESHIP",
    discount: "Free Shipping",
    minOrder: "₹1000",
    validUntil: "Ongoing",
    category: "all",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    title: "25% OFF on Baby Care Products",
    description: "Use code BABY25 at checkout",
    code: "BABY25",
    discount: "25%",
    minOrder: "₹800",
    validUntil: "August 15, 2023",
    category: "baby",
    image: "/placeholder.svg",
  },
  {
    id: 8,
    title: "30% OFF on Skin Care Range",
    description: "Use code SKIN30 at checkout",
    code: "SKIN30",
    discount: "30%",
    minOrder: "₹1200",
    validUntil: "July 20, 2023",
    category: "skincare",
    image: "/placeholder.svg",
  },
]

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  const filteredOffers = activeTab === "all" ? offers : offers.filter((offer) => offer.category === activeTab)

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Code copied!",
      description: `${code} has been copied to your clipboard.`,
      duration: 3000,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-[#182628]">Special Offers & Discounts</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Take advantage of our exclusive deals and save on your healthcare needs.
        </p>
      </div>

      <div className="mb-10">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-4 md:grid-cols-5 w-full max-w-3xl">
              <TabsTrigger value="all">All Offers</TabsTrigger>
              <TabsTrigger value="supplements">Supplements</TabsTrigger>
              <TabsTrigger value="vitamins">Vitamins</TabsTrigger>
              <TabsTrigger value="skincare">Skin Care</TabsTrigger>
              <TabsTrigger value="baby" className="hidden md:inline-flex">
                Baby Care
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} onCopyCode={handleCopyCode} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="supplements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} onCopyCode={handleCopyCode} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vitamins" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} onCopyCode={handleCopyCode} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skincare" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} onCopyCode={handleCopyCode} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="baby" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} onCopyCode={handleCopyCode} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-gradient-to-r from-[#650CB5] to-[#57BA98] rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe for Exclusive Offers</h2>
          <p className="mb-6">Be the first to know about our special promotions, new products, and health tips.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-md bg-white/20 border-white/30 text-white placeholder:text-white/70 flex-1"
            />
            <Button className="bg-white text-[#650CB5] hover:bg-white/90">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface OfferCardProps {
  offer: {
    id: number
    title: string
    description: string
    code: string
    discount: string
    minOrder: string
    validUntil: string
    category: string
    image: string
  }
  onCopyCode: (code: string) => void
}

function OfferCard({ offer, onCopyCode }: OfferCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden h-full">
        <div className="relative h-40 bg-gradient-to-r from-[#650CB5]/10 to-[#57BA98]/10">
          <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-contain p-4" />
          <Badge className="absolute top-3 right-3 bg-[#650CB5]">{offer.discount}</Badge>
        </div>
        <CardHeader>
          <CardTitle>{offer.title}</CardTitle>
          <CardDescription>{offer.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Minimum Order:</span>
              <span className="font-medium">{offer.minOrder}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Valid Until:</span>
              <span className="font-medium">{offer.validUntil}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-2" onClick={() => onCopyCode(offer.code)}>
            <Copy className="h-4 w-4" />
            {offer.code}
          </Button>
          <Button asChild className="bg-gradient-to-r from-[#650CB5] to-[#57BA98]">
            <Link href="/products">
              <Tag className="h-4 w-4 mr-2" />
              Shop Now
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

