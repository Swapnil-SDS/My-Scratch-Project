import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Heart, Shield, Star, Truck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#182628]">
              Your Health Is Our <span className="text-[#650CB5]">Priority</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              SwapnilCare is a modern online pharmacy dedicated to providing quality healthcare products and exceptional
              service to our customers. Our mission is to make healthcare accessible, affordable, and convenient for
              everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-gradient-to-r from-[#650CB5] to-[#57BA98]">
                <Link href="/products">Explore Products</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg" alt="About SwapnilCare" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-20 border-t">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#182628]">Our Story</h2>
          <p className="text-muted-foreground">
            The journey of SwapnilCare began with a simple vision: to revolutionize how people access healthcare
            products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4 text-[#182628]">From Vision to Reality</h3>
            <p className="text-muted-foreground mb-4">
              Founded in 2020, SwapnilCare started as a small online store with a limited range of products. Our
              founder, Dr. Swapnil Sharma, a pharmacist with over 15 years of experience, recognized the challenges
              people faced in accessing quality healthcare products, especially in remote areas.
            </p>
            <p className="text-muted-foreground mb-4">
              What began as a modest venture has now grown into one of India's most trusted online pharmacies, serving
              thousands of customers daily across the country.
            </p>
            <p className="text-muted-foreground">
              Our growth is a testament to our unwavering commitment to quality, authenticity, and customer
              satisfaction. We continue to expand our product range and improve our services to meet the evolving
              healthcare needs of our customers.
            </p>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden order-1 md:order-2">
            <Image src="/placeholder.svg" alt="SwapnilCare Story" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 md:py-20 bg-muted/30 rounded-2xl">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#182628]">Our Core Values</h2>
          <p className="text-muted-foreground">These principles guide everything we do at SwapnilCare.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#650CB5]/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-[#650CB5]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#182628]">Quality Assurance</h3>
            <p className="text-muted-foreground">
              We source our products directly from authorized manufacturers and distributors to ensure authenticity and
              quality.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#57BA98]/10 flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-[#57BA98]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#182628]">Customer Care</h3>
            <p className="text-muted-foreground">
              We put our customers at the center of everything we do, providing personalized care and support.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#389456]/10 flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-[#389456]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#182628]">Reliable Delivery</h3>
            <p className="text-muted-foreground">
              We understand the urgency of healthcare needs and strive to deliver products promptly and safely.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#650CB5]/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-[#650CB5]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#182628]">Authenticity</h3>
            <p className="text-muted-foreground">
              We guarantee 100% authentic products with proper storage and handling to maintain efficacy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#57BA98]/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-[#57BA98]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#182628]">Accessibility</h3>
            <p className="text-muted-foreground">
              We strive to make healthcare accessible to all through competitive pricing and wide delivery network.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#389456]/10 flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-[#389456]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#182628]">Innovation</h3>
            <p className="text-muted-foreground">
              We continuously improve our platform and services to enhance the customer experience.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-20 border-t">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#182628]">Our Leadership Team</h2>
          <p className="text-muted-foreground">Meet the dedicated professionals behind SwapnilCare.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
              <Image src="/placeholder.svg" alt="Dr. Swapnil Sharma" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-bold text-[#182628]">Dr. Swapnil Sharma</h3>
            <p className="text-[#650CB5] mb-2">Founder & CEO</p>
            <p className="text-sm text-muted-foreground">
              Pharmacist with 15+ years of experience in healthcare industry.
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
              <Image src="/placeholder.svg" alt="Dr. Priya Patel" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-bold text-[#182628]">Dr. Priya Patel</h3>
            <p className="text-[#650CB5] mb-2">Chief Medical Officer</p>
            <p className="text-sm text-muted-foreground">Specializes in pharmaceutical research and quality control.</p>
          </div>

          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
              <Image src="/placeholder.svg" alt="Rahul Mehta" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-bold text-[#182628]">Rahul Mehta</h3>
            <p className="text-[#650CB5] mb-2">Chief Technology Officer</p>
            <p className="text-sm text-muted-foreground">
              Tech innovator with expertise in e-commerce and healthcare platforms.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="bg-gradient-to-r from-[#650CB5] to-[#57BA98] rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join the SwapnilCare Family</h2>
            <p className="mb-6">Experience the difference with SwapnilCare. Your health journey is our priority.</p>
            <Button asChild className="bg-white text-[#650CB5] hover:bg-white/90">
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

