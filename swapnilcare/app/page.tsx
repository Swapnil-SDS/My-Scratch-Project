"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import CategorySlider from "@/components/category-slider"
import FeaturedBanner from "@/components/featured-banner"
import { getMedicines } from "@/lib/firebase"
import type { Medicine } from "@/types/medicine"

export default function Home() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await getMedicines()
        setMedicines(data)
        setFilteredMedicines(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching medicines:", error)
        setIsLoading(false)
      }
    }

    fetchMedicines()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMedicines(medicines)
    } else {
      const filtered = medicines.filter(
        (medicine) =>
          medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          medicine.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredMedicines(filtered)
    }
  }, [searchQuery, medicines])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect above
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <FeaturedBanner />
      </motion.div>

      <div className="my-8">
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <Input
            type="text"
            placeholder="Search medicines, health products..."
            className="pl-10 h-12 rounded-full border-primary/20 shadow-md focus:ring-2 focus:ring-primary/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Button
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 bg-gradient-to-r from-[#650CB5] to-[#57BA98]"
          >
            Search
          </Button>
        </form>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <CategorySlider />
      </motion.div>

      <section className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#182628]">Featured Products</h2>
          <Button variant="link" className="text-[#650CB5]">
            View All
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-100 animate-pulse rounded-lg h-[300px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedicines.slice(0, 8).map((medicine) => (
              <ProductCard key={medicine.id} product={medicine} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#182628]">New Arrivals</h2>
          <Button variant="link" className="text-[#650CB5]">
            View All
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-100 animate-pulse rounded-lg h-[300px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedicines.slice(8, 12).map((medicine) => (
              <ProductCard key={medicine.id} product={medicine} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-16 mb-12">
        <div className="bg-gradient-to-r from-[#57BA98] to-[#389456] rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe for Health Tips & Offers</h2>
            <p className="mb-6">
              Stay updated with the latest health tips, medicine information, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Button className="bg-white text-[#389456] hover:bg-white/90">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

