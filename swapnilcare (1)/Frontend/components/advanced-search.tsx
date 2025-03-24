"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getMedicines } from "@/lib/firebase"
import type { Medicine } from "@/types/medicine"

export default function AdvancedSearch() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Medicine[]>([])
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Handle outside click to close search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300) // 300ms debounce time

    return () => {
      clearTimeout(timer)
    }
  }, [query])

  // Fetch search results when debounced query changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedQuery.length < 2) {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)
      try {
        const allMedicines = await getMedicines()
        const filtered = allMedicines.filter(
          (medicine) =>
            medicine.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            medicine.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            medicine.category.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            medicine.brand.toLowerCase().includes(debouncedQuery.toLowerCase()),
        )
        setSearchResults(filtered.slice(0, 5)) // Limit to 5 results for dropdown
      } catch (error) {
        console.error("Error fetching search results:", error)
      } finally {
        setIsSearching(false)
      }
    }

    if (debouncedQuery) {
      fetchSearchResults()
    } else {
      setSearchResults([])
    }
  }, [debouncedQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`)
      setShowResults(false)
    }
  }

  const handleInputFocus = () => {
    if (query.length >= 2) {
      setShowResults(true)
    }
  }

  const handleClearSearch = () => {
    setQuery("")
    setSearchResults([])
    setShowResults(false)
  }

  const handleResultClick = (productId: string) => {
    router.push(`/products/${productId}`)
    setShowResults(false)
  }

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search medicines, health products..."
          className="pl-10 h-12 rounded-full border-primary/20 shadow-md focus:ring-2 focus:ring-primary/30"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />

        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-12 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}

        <Button
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-10 bg-gradient-to-r from-[#650CB5] to-[#57BA98]"
        >
          Search
        </Button>
      </form>

      <AnimatePresence>
        {showResults && (searchResults.length > 0 || isSearching) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border overflow-hidden"
          >
            {isSearching ? (
              <div className="p-4 text-center">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="p-2 border-b">
                  <p className="text-xs text-muted-foreground">
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{debouncedQuery}"
                  </p>
                </div>
                <ul>
                  {searchResults.map((result) => (
                    <li key={result.id} className="border-b last:border-0">
                      <button
                        className="w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors flex items-center gap-3"
                        onClick={() => handleResultClick(result.id)}
                      >
                        <div className="w-10 h-10 bg-muted/30 rounded-md flex-shrink-0 relative overflow-hidden">
                          {result.images[0] && (
                            <img
                              src={result.images[0] || "/placeholder.svg"}
                              alt={result.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{result.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {result.category} • {result.brand}
                          </p>
                        </div>
                        <div className="ml-auto font-medium">
                          ₹{result.price - (result.price * result.discount) / 100}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="p-2 border-t">
                  <Button
                    variant="link"
                    className="w-full text-[#650CB5]"
                    onClick={() => router.push(`/products?search=${encodeURIComponent(query)}`)}
                  >
                    View all results
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

