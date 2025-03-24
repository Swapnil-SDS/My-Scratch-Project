"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { FileText, PillIcon as Pills, Plus, Search, Upload, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { getMedicines } from "@/lib/firebase"
import type { Medicine } from "@/types/medicine"

// Mock data for user health metrics
const healthMetrics = {
  bloodPressure: [
    { date: "2023-07-01", systolic: 120, diastolic: 80 },
    { date: "2023-07-08", systolic: 118, diastolic: 78 },
    { date: "2023-07-15", systolic: 122, diastolic: 82 },
    { date: "2023-07-22", systolic: 119, diastolic: 79 },
  ],
  bloodSugar: [
    { date: "2023-07-01", value: 95 },
    { date: "2023-07-08", value: 98 },
    { date: "2023-07-15", value: 92 },
    { date: "2023-07-22", value: 94 },
  ],
  weight: [
    { date: "2023-07-01", value: 68 },
    { date: "2023-07-08", value: 67.5 },
    { date: "2023-07-15", value: 67.2 },
    { date: "2023-07-22", value: 67 },
  ],
}

// Mock data for prescriptions
const prescriptions = [
  {
    id: "presc1",
    date: "2023-07-01",
    doctor: "Dr. Sharma",
    medicines: ["Paracetamol 500mg", "Vitamin C 1000mg"],
    notes: "Take Paracetamol for fever. Vitamin C for immunity.",
    status: "active",
  },
  {
    id: "presc2",
    date: "2023-06-15",
    doctor: "Dr. Patel",
    medicines: ["Amoxicillin 500mg", "Ibuprofen 400mg"],
    notes: "Complete the full course of antibiotics.",
    status: "completed",
  },
  {
    id: "presc3",
    date: "2023-05-20",
    doctor: "Dr. Gupta",
    medicines: ["Cetirizine 10mg"],
    notes: "Take at night for allergies.",
    status: "completed",
  },
]

// Mock data for search history
const searchHistory = [
  { id: 1, term: "Paracetamol", date: "2023-07-22" },
  { id: 2, term: "Vitamin D", date: "2023-07-20" },
  { id: 3, term: "Cough syrup", date: "2023-07-18" },
  { id: 4, term: "Allergy medicine", date: "2023-07-15" },
  { id: 5, term: "Blood pressure monitor", date: "2023-07-10" },
]

export default function HealthPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [recommendedMedicines, setRecommendedMedicines] = useState<Medicine[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showUploadModal, setShowUploadModal] = useState(false)

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push("/login?redirect=/health")
      return
    }

    // Fetch recommended medicines based on user's history
    const fetchRecommendedMedicines = async () => {
      try {
        const allMedicines = await getMedicines()
        // Simulate personalized recommendations by selecting random medicines
        const recommended = allMedicines.sort(() => 0.5 - Math.random()).slice(0, 4)
        setRecommendedMedicines(recommended)
      } catch (error) {
        console.error("Error fetching recommended medicines:", error)
      }
    }

    fetchRecommendedMedicines()
  }, [user, router])

  const handleUploadPrescription = () => {
    setShowUploadModal(true)
  }

  const simulateUpload = (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setShowUploadModal(false)
          toast({
            title: "Prescription uploaded successfully",
            description: "Our pharmacist will review it and get back to you soon.",
            duration: 5000,
          })
          return 0
        }
        return prev + 10
      })
    }, 300)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      simulateUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      simulateUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-[#182628]">Personal Health Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Track your health metrics, manage prescriptions, and view personalized recommendations
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - User Profile & Health Metrics */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#650CB5] to-[#57BA98] flex items-center justify-center text-white">
                  <User size={32} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{user.displayName || "User"}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Profile Completion</span>
                    <span>70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <a href="/account">Edit Profile</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Health Metrics</CardTitle>
              <CardDescription>Track your vital statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Blood Pressure</h4>
                    <span className="text-sm text-[#650CB5]">
                      {healthMetrics.bloodPressure[healthMetrics.bloodPressure.length - 1].systolic}/
                      {healthMetrics.bloodPressure[healthMetrics.bloodPressure.length - 1].diastolic} mmHg
                    </span>
                  </div>
                  <div className="bg-muted h-12 rounded-md relative overflow-hidden">
                    {healthMetrics.bloodPressure.map((reading, index) => {
                      const x = (index / (healthMetrics.bloodPressure.length - 1)) * 100
                      const y = 100 - ((reading.systolic - 100) / 50) * 100
                      return (
                        <div
                          key={reading.date}
                          className="absolute w-2 h-2 bg-[#650CB5] rounded-full"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                          }}
                        />
                      )
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Blood Sugar</h4>
                    <span className="text-sm text-[#57BA98]">
                      {healthMetrics.bloodSugar[healthMetrics.bloodSugar.length - 1].value} mg/dL
                    </span>
                  </div>
                  <div className="bg-muted h-12 rounded-md relative overflow-hidden">
                    {healthMetrics.bloodSugar.map((reading, index) => {
                      const x = (index / (healthMetrics.bloodSugar.length - 1)) * 100
                      const y = 100 - ((reading.value - 80) / 40) * 100
                      return (
                        <div
                          key={reading.date}
                          className="absolute w-2 h-2 bg-[#57BA98] rounded-full"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                          }}
                        />
                      )
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Weight</h4>
                    <span className="text-sm text-[#389456]">
                      {healthMetrics.weight[healthMetrics.weight.length - 1].value} kg
                    </span>
                  </div>
                  <div className="bg-muted h-12 rounded-md relative overflow-hidden">
                    {healthMetrics.weight.map((reading, index) => {
                      const x = (index / (healthMetrics.weight.length - 1)) * 100
                      const y = 100 - ((reading.value - 65) / 5) * 100
                      return (
                        <div
                          key={reading.date}
                          className="absolute w-2 h-2 bg-[#389456] rounded-full"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                          }}
                        />
                      )
                    })}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-[#650CB5] to-[#57BA98]">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Reading
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Prescriptions & Recommendations */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="prescriptions">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="history">Search History</TabsTrigger>
            </TabsList>

            <TabsContent value="prescriptions">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Prescriptions</h2>
                <Button onClick={handleUploadPrescription}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Prescription
                </Button>
              </div>

              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <Card
                    key={prescription.id}
                    className={prescription.status === "active" ? "border-[#57BA98] border-2" : ""}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-lg">Prescription from {prescription.doctor}</h3>
                          <p className="text-sm text-muted-foreground">Date: {prescription.date}</p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            prescription.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {prescription.status === "active" ? "Active" : "Completed"}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Prescribed Medicines:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {prescription.medicines.map((medicine, index) => (
                            <li key={index} className="text-sm">
                              {medicine}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium">Doctor's Notes:</h4>
                        <p className="text-sm text-muted-foreground">{prescription.notes}</p>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        {prescription.status === "active" && (
                          <Button size="sm" className="bg-[#650CB5]">
                            <Pills className="mr-2 h-4 w-4" />
                            Order Medicines
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommendations">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Personalized Recommendations</h2>
                <p className="text-muted-foreground">Based on your health profile and purchase history</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedMedicines.map((medicine) => (
                  <Card key={medicine.id}>
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <Image
                            src={medicine.images[0] || "/placeholder.svg"}
                            alt={medicine.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{medicine.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{medicine.brand}</p>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#650CB5]">
                              ₹{medicine.price - (medicine.price * medicine.discount) / 100}
                            </span>
                            {medicine.discount > 0 && (
                              <span className="text-xs text-muted-foreground line-through">₹{medicine.price}</span>
                            )}
                          </div>
                          <Button variant="link" className="text-[#650CB5] p-0 h-auto mt-1" asChild>
                            <a href={`/products/${medicine.id}`}>View Details</a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" asChild>
                  <a href="/products">View All Recommendations</a>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Your Search History</h2>
                <p className="text-muted-foreground">Recent searches and viewed products</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {searchHistory.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex items-center gap-3">
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <span>{item.term}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">{item.date}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 text-center">
                <Button variant="outline">Clear Search History</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Prescription Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Upload Prescription</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowUploadModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div
              className="border-2 border-dashed rounded-lg p-8 text-center mb-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <p className="mb-2">Drag and drop your prescription here</p>
              <p className="text-sm text-muted-foreground mb-4">or</p>
              <label className="cursor-pointer">
                <Button>Browse Files</Button>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
              </label>
              <p className="text-xs text-muted-foreground mt-4">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
              <Button disabled={isUploading}>Upload</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

