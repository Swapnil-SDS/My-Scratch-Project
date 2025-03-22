"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    id: 1,
    name: "Pain Relief",
    image: "/placeholder.svg",
    link: "/products?category=pain-relief",
  },
  {
    id: 2,
    name: "Fever",
    image: "/placeholder.svg",
    link: "/products?category=fever",
  },
  {
    id: 3,
    name: "Cold & Cough",
    image: "/placeholder.svg",
    link: "/products?category=cold-cough",
  },
  {
    id: 4,
    name: "Vitamins",
    image: "/placeholder.svg",
    link: "/products?category=vitamins",
  },
  {
    id: 5,
    name: "Diabetes",
    image: "/placeholder.svg",
    link: "/products?category=diabetes",
  },
  {
    id: 6,
    name: "Skin Care",
    image: "/placeholder.svg",
    link: "/products?category=skin-care",
  },
  {
    id: 7,
    name: "Personal Care",
    image: "/placeholder.svg",
    link: "/products?category=personal-care",
  },
  {
    id: 8,
    name: "Baby Care",
    image: "/placeholder.svg",
    link: "/products?category=baby-care",
  },
]

export default function CategorySlider() {
  const sliderRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#182628]">Shop by Category</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full" onClick={scrollLeft}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" onClick={scrollRight}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 w-[150px]"
          >
            <Link href={category.link} className="block">
              <div className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-all text-center">
                <div className="relative w-full h-[100px] bg-gradient-to-br from-[#650CB5]/10 to-[#57BA98]/10">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm">{category.name}</h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

