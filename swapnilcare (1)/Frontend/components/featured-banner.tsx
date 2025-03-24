"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const banners = [
  {
    id: 1,
    title: "Quality Healthcare Products",
    description: "Get up to 30% off on all healthcare essentials",
    buttonText: "Shop Now",
    buttonLink: "/products",
    image: "https://t3.ftcdn.net/jpg/00/92/34/56/360_F_92345619_pUlEznFdreTJy5amSBspNNtQT0sqhTwM.webp",
    color: "from-[#650CB5] to-[#57BA98]",
  },
  {
    id: 2,
    title: "Prescription Medicines",
    description: "Fast delivery for all your prescription needs",
    buttonText: "Upload Prescription",
    buttonLink: "/upload-prescription",
    image: "https://t3.ftcdn.net/jpg/02/08/12/48/360_F_208124828_uyDWVaxmehsQ3aIhG327vCs7k3ivNPs7.jpg",
    color: "from-[#182628] to-[#389456]",
  },
  {
    id: 3,
    title: "Health Supplements",
    description: "Boost your immunity with our premium supplements",
    buttonText: "Explore",
    buttonLink: "/products?category=supplements",
    image: "https://t4.ftcdn.net/jpg/03/79/28/33/360_F_379283311_jZ5EPa0efXAcbzFwiOeYCvZA2wulZTo8.webp",
    color: "from-[#650CB5] to-[#182628]",
  },
]

export default function FeaturedBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handlePrevious = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative overflow-hidden rounded-2xl h-[300px] md:h-[400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className={`h-full w-full bg-gradient-to-r ${banners[current].color}`}>
            <div className="container h-full mx-auto px-4 flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                <div className="text-white space-y-4">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold"
                  >
                    {banners[current].title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-lg md:text-xl"
                  >
                    {banners[current].description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Button asChild className="bg-white text-[#182628] hover:bg-white/90">
                      <Link href={banners[current].buttonLink}>{banners[current].buttonText}</Link>
                    </Button>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="hidden md:flex justify-center"
                >
                  <div className="relative w-[300px] h-[300px]">
                    <Image
                      src={banners[current].image || "/placeholder.svg"}
                      alt={banners[current].title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 text-white hover:bg-white/30 hover:text-white"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 text-white hover:bg-white/30 hover:text-white"
        onClick={handleNext}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === current ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  )
}

