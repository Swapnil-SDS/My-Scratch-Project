"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const categories = [
  {
    id: 1,
    name: "Pain Relief",
    description: "Medications for headaches, body pain, and inflammation",
    image: "/placeholder.svg",
    link: "/products?category=pain-relief",
    count: 24,
  },
  {
    id: 2,
    name: "Fever",
    description: "Antipyretics and fever reducing medications",
    image: "/placeholder.svg",
    link: "/products?category=fever",
    count: 18,
  },
  {
    id: 3,
    name: "Cold & Cough",
    description: "Remedies for cold, cough, and congestion",
    image: "/placeholder.svg",
    link: "/products?category=cold-cough",
    count: 32,
  },
  {
    id: 4,
    name: "Vitamins",
    description: "Supplements for daily nutrition and immunity",
    image: "/placeholder.svg",
    link: "/products?category=vitamins",
    count: 45,
  },
  {
    id: 5,
    name: "Diabetes",
    description: "Products for diabetes management and care",
    image: "/placeholder.svg",
    link: "/products?category=diabetes",
    count: 27,
  },
  {
    id: 6,
    name: "Skin Care",
    description: "Products for skin health and treatment",
    image: "/placeholder.svg",
    link: "/products?category=skin-care",
    count: 38,
  },
  {
    id: 7,
    name: "Personal Care",
    description: "Hygiene and personal care essentials",
    image: "/placeholder.svg",
    link: "/products?category=personal-care",
    count: 42,
  },
  {
    id: 8,
    name: "Baby Care",
    description: "Products for infant health and wellness",
    image: "/placeholder.svg",
    link: "/products?category=baby-care",
    count: 29,
  },
  {
    id: 9,
    name: "First Aid",
    description: "Emergency care and wound treatment supplies",
    image: "/placeholder.svg",
    link: "/products?category=first-aid",
    count: 22,
  },
  {
    id: 10,
    name: "Ayurvedic",
    description: "Traditional herbal remedies and supplements",
    image: "/placeholder.svg",
    link: "/products?category=ayurvedic",
    count: 36,
  },
  {
    id: 11,
    name: "Homeopathy",
    description: "Alternative medicine and homeopathic remedies",
    image: "/placeholder.svg",
    link: "/products?category=homeopathy",
    count: 31,
  },
  {
    id: 12,
    name: "Fitness",
    description: "Supplements and products for fitness enthusiasts",
    image: "/placeholder.svg",
    link: "/products?category=fitness",
    count: 25,
  },
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-[#182628]">Browse Categories</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our wide range of healthcare categories to find exactly what you need for your wellness journey.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Search categories..."
            className="pl-10 h-12 rounded-full border-primary/20 shadow-md focus:ring-2 focus:ring-primary/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <motion.div key={category.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Link href={category.link} className="block">
              <div className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
                <div className="relative w-full h-40 bg-gradient-to-br from-[#650CB5]/10 to-[#57BA98]/10">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-[#182628]">{category.name}</h3>
                    <span className="text-sm text-muted-foreground">{category.count} items</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  <Button variant="outline" className="w-full border-[#57BA98] text-[#57BA98] hover:bg-[#57BA98]/10">
                    Browse Products
                  </Button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No categories found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}

