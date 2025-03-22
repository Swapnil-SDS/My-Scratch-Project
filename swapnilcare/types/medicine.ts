export interface Medicine {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  discount: number
  rating: number
  reviews: number
  category: string
  brand: string
  sku: string
  inStock: boolean
  prescriptionRequired: boolean
  expiryDate: string
  images: string[]
  usage: string
  storage: string
  ingredients: string
  warnings: string[]
  reviewsList: {
    name: string
    rating: number
    date: string
    comment: string
  }[]
}

