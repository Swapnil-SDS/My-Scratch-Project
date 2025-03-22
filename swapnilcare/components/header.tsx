"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Heart, Menu, Search, ShoppingCart, User, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "next-themes"
import Logo from "@/components/logo"

export default function Header() {
  const { totalItems } = useCart()
  const { totalItems: wishlistItems } = useWishlist()
  const { user, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4 border-b">
                  <Logo size="small" />
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetTrigger>
                </div>

                <nav className="flex flex-col gap-1 py-4">
                  <Link href="/" className="flex items-center gap-2 px-4 py-2 text-lg hover:bg-muted rounded-md">
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="flex items-center gap-2 px-4 py-2 text-lg hover:bg-muted rounded-md"
                  >
                    Products
                  </Link>
                  <Link
                    href="/categories"
                    className="flex items-center gap-2 px-4 py-2 text-lg hover:bg-muted rounded-md"
                  >
                    Categories
                  </Link>
                  <Link href="/offers" className="flex items-center gap-2 px-4 py-2 text-lg hover:bg-muted rounded-md">
                    Offers
                  </Link>
                  <Link href="/about" className="flex items-center gap-2 px-4 py-2 text-lg hover:bg-muted rounded-md">
                    About Us
                  </Link>
                  <Link href="/contact" className="flex items-center gap-2 px-4 py-2 text-lg hover:bg-muted rounded-md">
                    Contact
                  </Link>
                </nav>

                <div className="mt-auto border-t py-4">
                  {user ? (
                    <div className="space-y-4">
                      <div className="px-4 py-2">
                        <p className="font-medium">Hello, {user.displayName || "User"}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="px-4 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Theme</span>
                          <Button variant="outline" size="sm" onClick={toggleTheme} className="gap-2">
                            {mounted && theme === "light" ? (
                              <>
                                <Moon className="h-4 w-4" />
                                Dark Mode
                              </>
                            ) : (
                              <>
                                <Sun className="h-4 w-4" />
                                Light Mode
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 px-4">
                        <Button asChild variant="outline" className="justify-start">
                          <Link href="/account">My Account</Link>
                        </Button>
                        <Button asChild variant="outline" className="justify-start">
                          <Link href="/account/orders">My Orders</Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 px-4">
                      <Button asChild>
                        <Link href="/login">Sign In</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/login?tab=register">Create Account</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-[#650CB5] transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-[#650CB5] transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-[#650CB5] transition-colors">
              Categories
            </Link>
            <Link href="/offers" className="text-sm font-medium hover:text-[#650CB5] transition-colors">
              Offers
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-[#650CB5] transition-colors">
              About Us
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="hidden md:block"
                >
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-[200px] pl-9 h-9 rounded-full"
                      autoFocus
                      onBlur={() => setShowSearch(false)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setShowSearch(!showSearch)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col h-full">
                  <div className="py-4 border-b">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <p className="text-sm text-muted-foreground">Your latest updates and offers</p>
                  </div>

                  <div className="py-4">
                    <h3 className="font-medium mb-3">Available Coupons</h3>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3 bg-muted/30">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[#650CB5]">SWAPNIL20</span>
                          <Badge>20% OFF</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Valid on all products. Min order ₹500</p>
                      </div>
                      <div className="border rounded-lg p-3 bg-muted/30">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[#650CB5]">HEALTH15</span>
                          <Badge>15% OFF</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Valid on health supplements only</p>
                      </div>
                      <div className="border rounded-lg p-3 bg-muted/30">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[#650CB5]">CARE10</span>
                          <Badge>10% OFF</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Valid on all products. No minimum order</p>
                      </div>
                      <div className="border rounded-lg p-3 bg-muted/30">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[#650CB5]">FIRST5</span>
                          <Badge>5% OFF</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">For first-time customers only</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-4 border-t">
                    <h3 className="font-medium mb-3">Recent Updates</h3>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <p className="text-sm font-medium">Your order #SC123456 has been shipped!</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <p className="text-sm font-medium">New arrivals in Vitamins category</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#650CB5]">
                    {wishlistItems}
                  </Badge>
                )}
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#650CB5]">
                    {totalItems}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>

            {user ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col h-full">
                    <div className="py-4 border-b">
                      <h2 className="text-lg font-semibold">My Account</h2>
                      <p className="text-sm text-muted-foreground">
                        {user.displayName || "User"} • {user.email}
                      </p>
                    </div>

                    <nav className="flex flex-col gap-1 py-4">
                      <Link href="/account" className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-md">
                        Profile
                      </Link>
                      <Link
                        href="/account/orders"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-md"
                      >
                        Orders
                      </Link>
                      <Link
                        href="/account/addresses"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-md"
                      >
                        Addresses
                      </Link>
                      <Link
                        href="/account/prescriptions"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-md"
                      >
                        Prescriptions
                      </Link>
                      <Link href="/wishlist" className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-md">
                        Wishlist
                      </Link>
                    </nav>

                    <div className="mt-auto border-t py-4">
                      <div className="px-4 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Theme</span>
                          <Button variant="outline" size="sm" onClick={toggleTheme} className="gap-2">
                            {mounted && theme === "light" ? (
                              <>
                                <Moon className="h-4 w-4" />
                                Dark Mode
                              </>
                            ) : (
                              <>
                                <Sun className="h-4 w-4" />
                                Light Mode
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      <Button variant="destructive" className="w-full" onClick={logout}>
                        Logout
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Login</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

