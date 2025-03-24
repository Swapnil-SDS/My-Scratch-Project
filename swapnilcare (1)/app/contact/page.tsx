"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
        duration: 5000,
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2 text-[#182628]">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions or need assistance? We're here to help. Reach out to our team through any of the channels
          below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="h-full">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#650CB5]/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-[#650CB5]" />
              </div>
              <CardTitle>Phone</CardTitle>
              <CardDescription>Call us directly</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-medium text-lg">+91 9876543210</p>
              <p className="text-sm text-muted-foreground mt-1">Monday to Saturday, 9am to 6pm</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="h-full">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#57BA98]/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-[#57BA98]" />
              </div>
              <CardTitle>Email</CardTitle>
              <CardDescription>Write to us anytime</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-medium text-lg">support@swapnilcare.com</p>
              <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="h-full">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#389456]/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-[#389456]" />
              </div>
              <CardTitle>Office</CardTitle>
              <CardDescription>Visit our headquarters</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-medium text-lg">123 Health Street, Mumbai</p>
              <p className="text-sm text-muted-foreground mt-1">Maharashtra, India - 400001</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#182628]">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Product Inquiry"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={5}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#650CB5] to-[#57BA98]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#182628]">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">What are your delivery timelines?</h3>
              <p className="text-muted-foreground">
                We deliver within 24-48 hours in major cities and 3-5 business days for other locations. Express
                delivery options are also available.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Do you accept returns?</h3>
              <p className="text-muted-foreground">
                Yes, we accept returns within 7 days of delivery if the product is unopened and in its original
                packaging. Please note that certain products cannot be returned due to safety regulations.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">How do I upload a prescription?</h3>
              <p className="text-muted-foreground">
                You can upload your prescription during checkout or through your account dashboard. We accept images and
                PDF formats.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Are all your products authentic?</h3>
              <p className="text-muted-foreground">
                Yes, we source all our products directly from authorized manufacturers and distributors. We guarantee
                100% authenticity for all products sold on our platform.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Do you ship internationally?</h3>
              <p className="text-muted-foreground">
                Currently, we only ship within India. We're working on expanding our services to international locations
                in the near future.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden h-[400px] mb-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1655968407548!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}

