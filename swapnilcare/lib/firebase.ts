import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import type { Medicine } from "@/types/medicine"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb9Vh8kVlSyOte8lhkU1O32EVW89r9yEs",
  authDomain: "evaluation-unit-4-20c8a.firebaseapp.com",
  databaseURL: "https://evaluation-unit-4-20c8a-default-rtdb.firebaseio.com",
  projectId: "evaluation-unit-4-20c8a",
  storageBucket: "evaluation-unit-4-20c8a.firebasestorage.app",
  messagingSenderId: "129332168708",
  appId: "1:129332168708:web:0bfb8bb0e6f7e287198d51",
  measurementId: "G-T444YDPZBW",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Authentication functions
export const loginWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const registerWithEmail = async (email: string, password: string, displayName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(userCredential.user, { displayName })
  return userCredential
}

// Dummy data for medicines
const dummyMedicines: Medicine[] = [
  {
    id: "med1",
    name: "Paracetamol 500mg",
    description: "Fever and pain relief medication",
    longDescription:
      "Paracetamol is a common pain reliever and fever reducer. It's used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.",
    price: 50,
    discount: 10,
    rating: 4.5,
    reviews: 120,
    category: "Pain Relief",
    brand: "SwapnilCare",
    sku: "PC500-001",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "12/2025",
    images: [
      "https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    usage: "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
    storage: "Store at room temperature away from moisture and heat.",
    ingredients: "Each tablet contains Paracetamol 500mg as the active ingredient.",
    warnings: [
      "Do not use with other products containing paracetamol.",
      "Consult a doctor if symptoms persist for more than 3 days.",
      "Keep out of reach of children.",
    ],
    reviewsList: [
      {
        name: "John D.",
        rating: 5,
        date: "15 May 2023",
        comment: "Works quickly for headaches. My go-to pain reliever.",
      },
      {
        name: "Priya S.",
        rating: 4,
        date: "3 April 2023",
        comment: "Effective for fever, but takes a bit longer for severe pain.",
      },
    ],
  },
  {
    id: "med2",
    name: "Vitamin C 1000mg",
    description: "Immunity booster supplement",
    longDescription:
      "Vitamin C is an essential nutrient that plays a role in supporting the immune system, promoting skin health, and acting as an antioxidant to protect cells from damage caused by free radicals.",
    price: 350,
    discount: 15,
    rating: 4.2,
    reviews: 85,
    category: "Vitamins",
    brand: "HealthPlus",
    sku: "VC1000-002",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "06/2025",
    images: [
      "https://images.pexels.com/photos/51929/medications-cure-tablets-pharmacy-51929.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/208518/pexels-photo-208518.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    usage: "Take 1 tablet daily with food or as directed by your healthcare professional.",
    storage: "Store in a cool, dry place away from direct sunlight.",
    ingredients: "Each tablet contains Vitamin C (as Ascorbic Acid) 1000mg, Citrus Bioflavonoids 25mg.",
    warnings: [
      "Consult a doctor before use if you are pregnant or nursing.",
      "Discontinue use if any adverse reactions occur.",
      "Not intended to diagnose, treat, cure, or prevent any disease.",
    ],
    reviewsList: [
      {
        name: "Md Noori.",
        rating: 5,
        date: "20 June 2023",
        comment: "I've been taking this daily and haven't caught a cold all season!",
      },
      {
        name: "Anita Bipasana.",
        rating: 3,
        date: "12 May 2023",
        comment: "The tablets are a bit large and hard to swallow, but seem effective.",
      },
    ],
  },
  {
    id: "med3",
    name: "Blood Glucose Monitor",
    description: "Digital diabetes management device",
    longDescription:
      "This advanced blood glucose monitoring system provides accurate results in just 5 seconds with a tiny blood sample. Designed for easy use with a large, backlit display and memory for 500 test results.",
    price: 1999,
    discount: 20,
    rating: 4.8,
    reviews: 210,
    category: "Diabetes",
    brand: "MediLife",
    sku: "BGM-003",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "N/A",
    images: [
      "https://images.pexels.com/photos/208541/pexels-photo-208541.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/208541/pexels-photo-208541.jpeg?cs=srgb",
      "https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?cs=srgb",
    ],
    usage:
      "Follow the user manual for proper testing procedure. Clean the device regularly with a slightly damp cloth.",
    storage: "Store in a cool, dry place. Keep test strips in their original vial with the cap tightly closed.",
    ingredients: "Digital device with LCD display, includes lancing device and 10 test strips.",
    warnings: [
      "For external use only. Do not ingest any components.",
      "Results should be reviewed with your healthcare provider.",
      "Dispose of used test strips and lancets properly.",
    ],
    reviewsList: [
      {
        name: "Suresh P.",
        rating: 5,
        date: "2 July 2023",
        comment: "Very accurate when compared with my lab results. Easy to use and compact.",
      },
      {
        name: "Meera J.",
        rating: 4,
        date: "15 June 2023",
        comment: "Good device, but test strips are a bit expensive.",
      },
    ],
  },
  {
    id: "med4",
    name: "Aloe Vera Gel",
    description: "Soothing skin care gel",
    longDescription:
      "Pure Aloe Vera gel extracted from freshly harvested Aloe leaves. This multipurpose gel soothes sunburns, minor cuts, dry skin, and can be used as a daily moisturizer for all skin types.",
    price: 199,
    discount: 0,
    rating: 4.6,
    reviews: 150,
    category: "Skin Care",
    brand: "NatureCure",
    sku: "AVG-004",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "08/2024",
    images: [
      "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://as2.ftcdn.net/v2/jpg/01/99/92/03/1000_F_199920371_Mn8GflkS2N3u95j8FAXhP3vP15vHjFuv.jpg",
    ],
    usage: "Apply a thin layer to affected areas as needed. For external use only.",
    storage: "Store in a cool place. Refrigeration enhances the soothing effect.",
    ingredients: "99% Pure Aloe Vera Gel, Vitamin E, Glycerin, Natural Preservatives.",
    warnings: [
      "Avoid contact with eyes.",
      "Discontinue use if irritation occurs.",
      "Not for use on deep wounds or severe burns.",
    ],
    reviewsList: [
      {
        name: "Deepak S.",
        rating: 5,
        date: "10 May 2023",
        comment: "Amazing for sunburns! Provides instant relief and helps skin heal faster.",
      },
      {
        name: "Lakshmi R.",
        rating: 4,
        date: "28 April 2023",
        comment: "I use it daily as a moisturizer. Absorbs quickly and doesn't feel sticky.",
      },
    ],
  },
  {
    id: "med5",
    name: "Cough Syrup",
    description: "Relief from dry and productive cough",
    longDescription:
      "This dual-action cough syrup provides relief from both dry and productive coughs. It helps suppress cough reflex and loosens mucus to make coughing more productive when needed.",
    price: 120,
    discount: 5,
    rating: 4.3,
    reviews: 95,
    category: "Cold & Cough",
    brand: "SwapnilCare",
    sku: "CS-005",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "04/2025",
    images: [
      "https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://as2.ftcdn.net/v2/jpg/00/85/20/55/1000_F_85205520_S7xub8AfZp30R2uJtFqPXMt5xQkLJ0Kb.jpg",
    ],
    usage:
      "Adults and children over 12: Take 10ml (2 teaspoons) every 4-6 hours. Children 6-12 years: Take 5ml (1 teaspoon) every 4-6 hours.",
    storage: "Store at room temperature away from direct sunlight.",
    ingredients: "Dextromethorphan HBr, Guaifenesin, Menthol, Purified Water, Glycerin, Natural Flavors.",
    warnings: [
      "Do not exceed recommended dosage.",
      "Consult a doctor if symptoms persist for more than 5 days.",
      "Do not use if you have certain medical conditions or are taking MAOIs.",
    ],
    reviewsList: [
      {
        name: "Vikram T.",
        rating: 5,
        date: "3 June 2023",
        comment: "Works great for nighttime coughs. Helps me sleep without constant coughing.",
      },
      {
        name: "Neha G.",
        rating: 4,
        date: "15 May 2023",
        comment: "Effective but has a strong taste. Mix with a little honey to make it more palatable.",
      },
    ],
  },
  {
    id: "med6",
    name: "Digital Thermometer",
    description: "Fast and accurate temperature measurement",
    longDescription:
      "This digital thermometer provides fast and accurate temperature readings in just 10 seconds. Features a flexible tip for comfort, large digital display, and memory function to recall the last reading.",
    price: 299,
    discount: 10,
    rating: 4.7,
    reviews: 180,
    category: "Fever",
    brand: "MediLife",
    sku: "DT-006",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "N/A",
    images: [
      "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://as2.ftcdn.net/v2/jpg/06/57/23/59/1000_F_657235995_I9LkuJG1uwSywNYTz48pdW7y9iX2c8lV.jpg",
    ],
    usage:
      "Place under the tongue, in the armpit, or rectally as directed. Wait for the beep to indicate reading is complete.",
    storage: "Clean with alcohol before and after each use. Store in the protective case provided.",
    ingredients: "Digital device with LCD display, includes battery and storage case.",
    warnings: [
      "Clean thoroughly before first use and between users.",
      "Replace battery when display becomes faint.",
      "Not a toy. Keep away from children when not in use.",
    ],
    reviewsList: [
      {
        name: "Arjun K.",
        rating: 5,
        date: "22 June 2023",
        comment: "Very accurate and easy to use. The beep is loud enough to hear clearly.",
      },
      {
        name: "Sonia M.",
        rating: 4,
        date: "5 May 2023",
        comment: "Good product but the battery compartment is a bit difficult to open.",
      },
    ],
  },
  {
    id: "med7",
    name: "Calcium + Vitamin D3 Tablets",
    description: "Bone health supplement",
    longDescription:
      "This supplement combines calcium and vitamin D3 to support bone health and muscle function. Regular use helps maintain bone density and strength, especially important for women and older adults.",
    price: 450,
    discount: 12,
    rating: 4.4,
    reviews: 75,
    category: "Vitamins",
    brand: "HealthPlus",
    sku: "CVD-007",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "09/2025",
    images: [
      "https://images.pexels.com/photos/161688/medical-tablets-pills-drug-161688.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://as1.ftcdn.net/v2/jpg/01/11/44/39/1000_F_111443921_f96avY30b2t0ZJPIGrmC3bMTmwi85Mfa.jpg",
    ],
    usage: "Take 1 tablet twice daily with meals or as directed by your healthcare professional.",
    storage: "Store in a cool, dry place away from direct sunlight.",
    ingredients: "Each tablet contains Calcium Carbonate 500mg, Vitamin D3 400 IU, Magnesium 50mg, Zinc 5mg.",
    warnings: [
      "Consult a doctor before use if you have kidney disease or are taking other medications.",
      "Take at least 2 hours apart from certain antibiotics.",
      "Not suitable for those with hypercalcemia.",
    ],
    reviewsList: [
      {
        name: "Ritu P.",
        rating: 5,
        date: "12 July 2023",
        comment: "My doctor recommended this after my bone density scan. Easy to take and no digestive issues.",
      },
      {
        name: "Mohan S.",
        rating: 4,
        date: "30 May 2023",
        comment: "Good supplement but tablets are quite large. I break them in half to take them.",
      },
    ],
  },
  {
    id: "med8",
    name: "Hand Sanitizer",
    description: "Kills 99.9% of germs without water",
    longDescription:
      "This alcohol-based hand sanitizer effectively kills 99.9% of germs and bacteria without the need for water. The gel formula contains moisturizers to prevent drying of hands with regular use.",
    price: 99,
    discount: 0,
    rating: 4.5,
    reviews: 220,
    category: "Personal Care",
    brand: "SwapnilCare",
    sku: "HS-008",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "12/2024",
    images: [
      "https://images.pexels.com/photos/806427/pexels-photo-806427.jpeg?auto=compress&cs=tinysrgb&w=150",
      "https://as2.ftcdn.net/v2/jpg/00/78/07/71/1000_F_78077186_o5IgVOHzvkhm91YcUEhv5nlp5nHnpQUU.jpg",
    ],
    usage: "Apply a coin-sized amount to palms and rub hands together until completely dry.",
    storage: "Store in a cool place away from direct sunlight and heat sources.",
    ingredients: "Ethyl Alcohol 70%, Purified Water, Glycerin, Aloe Vera Extract, Vitamin E, Fragrance.",
    warnings: [
      "For external use only. Keep away from eyes and mouth.",
      "Flammable until dry. Keep away from fire or flame.",
      "Supervise children when using this product.",
    ],
    reviewsList: [
      {
        name: "Anjali T.",
        rating: 5,
        date: "8 June 2023",
        comment: "Not sticky and dries quickly. Pleasant smell that's not overwhelming.",
      },
      {
        name: "Rajesh K.",
        rating: 4,
        date: "22 May 2023",
        comment: "Good sanitizer but the cap tends to leak a bit when carried in a bag.",
      },
    ],
  },
  {
    id: "med9",
    name: "Baby Diaper Rash Cream",
    description: "Soothes and prevents diaper rash",
    longDescription:
      "This gentle cream creates a protective barrier on baby's skin to prevent and treat diaper rash. Contains zinc oxide and natural ingredients to soothe irritated skin and promote healing.",
    price: 180,
    discount: 8,
    rating: 4.9,
    reviews: 150,
    category: "Baby Care",
    brand: "NatureCure",
    sku: "BDR-009",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "07/2025",
    images: [
      "https://as1.ftcdn.net/v2/jpg/00/77/01/58/1000_F_77015870_rjDRxmQHU4SqrHBv89mq81sKSHGnst1Z.jpg",
      "https://as2.ftcdn.net/v2/jpg/02/43/95/23/1000_F_243952374_oPZDslBh62ZWzqBOb2gkhp5dt0nvYgrC.jpg",
    ],
    usage: "Apply a thin layer to clean, dry skin at each diaper change, especially before bedtime.",
    storage: "Store at room temperature. Replace cap tightly after each use.",
    ingredients: "Zinc Oxide 10%, Calendula Extract, Aloe Vera, Shea Butter, Coconut Oil, Vitamin E.",
    warnings: [
      "For external use only.",
      "Discontinue use if irritation worsens or persists.",
      "Keep out of reach of children.",
    ],
    reviewsList: [
      {
        name: "Kovela M.",
        rating: 5,
        date: "15 July 2023",
        comment: "Works like magic! Cleared my baby's rash overnight and prevents new ones.",
      },
      {
        name: "Chandra S.",
        rating: 5,
        date: "2 June 2023",
        comment: "Gentle formula with no strong smell. Easy to apply and wipes off easily too.",
      },
    ],
  },
  {
    id: "med10",
    name: "Protein Powder",
    description: "Whey protein supplement for muscle recovery",
    longDescription:
      "This premium whey protein powder supports muscle recovery and growth after exercise. Each serving provides 24g of high-quality protein with all essential amino acids and minimal carbs and fat.",
    price: 1299,
    discount: 15,
    rating: 4.6,
    reviews: 180,
    category: "Vitamins",
    brand: "HealthPlus",
    sku: "PP-010",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "10/2025",
    images: [
      "https://as2.ftcdn.net/v2/jpg/03/15/26/31/1000_F_315263107_ocnxATMRnCIBlL1FzP9xxUnabgqKTGA7.jpg",
      "https://as1.ftcdn.net/v2/jpg/01/86/91/66/1000_F_186916617_oPPHwxkROZ9jdjXD9QAQcu7ygejiaWhF.jpg",
    ],
    usage: "Mix 1 scoop (30g) with 200-250ml of water or milk. Take 1-2 servings daily, preferably after workout.",
    storage: "Store in a cool, dry place. Keep container tightly closed.",
    ingredients:
      "Whey Protein Isolate, Whey Protein Concentrate, Cocoa Powder (in chocolate flavor), Natural Flavors, Stevia Extract.",
    warnings: [
      "Consult a doctor before use if you have kidney disease or are pregnant/nursing.",
      "Not intended to diagnose, treat, cure, or prevent any disease.",
      "Keep out of reach of children.",
    ],
    reviewsList: [
      {
        name: "Rohit S.",
        rating: 5,
        date: "25 June 2023",
        comment: "Mixes easily with no clumps. Great taste and excellent results after a month of use.",
      },
      {
        name: "Divya P.",
        rating: 4,
        date: "10 May 2023",
        comment: "Good protein content but a bit sweet for my taste. I mix with unsweetened almond milk.",
      },
    ],
  },
  {
    id: "med11",
    name: "Blood Pressure Monitor",
    description: "Digital automatic BP measuring device",
    longDescription:
      "This fully automatic blood pressure monitor provides accurate readings of systolic, diastolic pressure and pulse rate. Features a large display, irregular heartbeat detection, and memory for 120 readings with date and time.",
    price: 1799,
    discount: 20,
    rating: 4.7,
    reviews: 130,
    category: "Diabetes",
    brand: "MediLife",
    sku: "BPM-011",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "N/A",
    images: [
      "https://as1.ftcdn.net/v2/jpg/02/59/79/66/1000_F_259796696_4xTFldfvBwQvsCXgTcGSyxAHmTKmp2mk.jpg",
      "https://as1.ftcdn.net/v2/jpg/04/62/81/94/1000_F_462819498_uenb6HS4yMpIM7A2qWtaL78GJCi5V3vf.jpg",
      "https://as1.ftcdn.net/v2/jpg/02/38/00/96/1000_F_238009674_v3axuMjU3ms8dYRpreuyLZSkWmOeh9yS.jpg",
    ],
    usage:
      "Sit quietly for 5 minutes before measuring. Place cuff on upper arm at heart level. Press start and remain still during measurement.",
    storage: "Store in a clean, dry place. Remove batteries if not used for an extended period.",
    ingredients: "Digital device with LCD display, includes arm cuff and 4 AAA batteries.",
    warnings: [
      "Not a substitute for regular medical check-ups.",
      "Consult your doctor to interpret readings.",
      "Not recommended for severe arrhythmia patients.",
    ],
    reviewsList: [
      {
        name: "Mahesh R.",
        rating: 5,
        date: "18 July 2023",
        comment: "Very accurate when compared with readings at my doctor's office. Easy to use and portable.",
      },
      {
        name: "Sunita K.",
        rating: 4,
        date: "5 June 2023",
        comment: "Good device but the cuff is a bit stiff initially. Gets better with use.",
      },
    ],
  },
  {
    id: "med12",
    name: "Multivitamin Tablets",
    description: "Complete daily nutritional support",
    longDescription:
      "This comprehensive multivitamin formula provides essential vitamins and minerals to support overall health and wellbeing. Helps fill nutritional gaps in your diet and supports immune function, energy levels, and metabolism.",
    price: 599,
    discount: 10,
    rating: 4.5,
    reviews: 200,
    category: "Vitamins",
    brand: "SwapnilCare",
    sku: "MVT-012",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "11/2025",
    images: [
      "https://as2.ftcdn.net/v2/jpg/03/86/99/13/1000_F_386991370_WWjvAEhi6pJsX8l4zFg1Qac8Tv6hfsW1.jpg",
      "https://as2.ftcdn.net/v2/jpg/04/74/00/25/1000_F_474002533_Gyws8giVLlV0wUm3Da7AT9AqYsLJGtZF.jpg",
    ],
    usage: "Take 1 tablet daily with food or as directed by your healthcare professional.",
    storage: "Store in a cool, dry place away from direct sunlight.",
    ingredients:
      "Vitamins A, C, D, E, K, B-complex, Calcium, Magnesium, Zinc, Iron, Selenium, and other essential minerals.",
    warnings: [
      "Keep out of reach of children.",
      "Do not exceed recommended dose.",
      "Consult a doctor before use if pregnant, nursing, or taking medications.",
    ],
    reviewsList: [
      {
        name: "Anil P.",
        rating: 5,
        date: "30 June 2023",
        comment: "Noticed improved energy levels after a few weeks. Good comprehensive formula.",
      },
      {
        name: "Kavita S.",
        rating: 4,
        date: "12 May 2023",
        comment: "Good multivitamin but pills are quite large. Would prefer a smaller size.",
      },
    ],
  },
  {
    id: "med13",
    name: "Ayurvedic Immunity Booster",
    description: "Natural herbal immunity support",
    longDescription:
      "This traditional Ayurvedic formula combines powerful herbs like Ashwagandha, Tulsi, and Giloy to strengthen the immune system naturally. Regular use helps improve resistance to common illnesses and promotes overall wellbeing.",
    price: 450,
    discount: 5,
    rating: 4.6,
    reviews: 112,
    category: "Ayurvedic",
    brand: "NatureCure",
    sku: "AIB-013",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "08/2025",
    images: [
      "https://as2.ftcdn.net/v2/jpg/09/67/79/59/1000_F_967795964_DOGv498N7wwlnGPv2Gqg3s8ggLg5pNjL.jpg",
      "https://as2.ftcdn.net/v2/jpg/01/82/89/65/1000_F_182896569_4hK9DHOEwqUhGfyGRHj44gMUX4jToApi.jpg",
    ],
    usage: "Take 2 capsules twice daily after meals with warm water or as directed by your Ayurvedic practitioner.",
    storage: "Store in a cool, dry place away from direct sunlight.",
    ingredients:
      "Ashwagandha (Withania somnifera), Tulsi (Ocimum sanctum), Giloy (Tinospora cordifolia), Amla (Emblica officinalis), Turmeric (Curcuma longa).",
    warnings: [
      "Consult a healthcare professional before use if pregnant, nursing, or taking medications.",
      "May cause mild digestive discomfort in some individuals initially.",
      "Results may vary from person to person.",
    ],
    reviewsList: [
      {
        name: "Vikram S.",
        rating: 5,
        date: "5 July 2023",
        comment: "Been taking this for 3 months and haven't fallen sick once during the monsoon season!",
      },
      {
        name: "Meena R.",
        rating: 4,
        date: "18 June 2023",
        comment: "Good product but takes time to show results. Stick with it for at least a month.",
      },
    ],
  },
  {
    id: "med14",
    name: "Diabetic Care Sugar-Free Cookies",
    description: "Healthy snack for diabetic patients",
    longDescription:
      "These specially formulated cookies are made without added sugar and have a low glycemic index, making them suitable for people with diabetes. They're sweetened with natural stevia and contain whole grains for added fiber.",
    price: 199,
    discount: 0,
    rating: 4.3,
    reviews: 78,
    category: "Diabetes",
    brand: "HealthPlus",
    sku: "DCB-014",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "05/2024",
    images: [
      "https://as1.ftcdn.net/v2/jpg/02/76/13/08/1000_F_276130886_vOwtSTGpiVKHzGQVWZYdD03L56QQZrqK.jpg",
      "https://as2.ftcdn.net/v2/jpg/02/76/80/31/1000_F_276803150_yUZGcTLjJErZdmLw0GhDzARQY91S6yrv.jpg",
    ],
    usage: "Enjoy as a snack between meals. Recommended serving size is 2-3 cookies per day.",
    storage: "Store in an airtight container in a cool, dry place.",
    ingredients: "Whole wheat flour, Oats, Almond flour, Stevia, Olive oil, Cinnamon, Vanilla extract, Salt.",
    warnings: [
      "While suitable for diabetics, monitor blood glucose levels as individual responses may vary.",
      "Contains nuts (almonds). Not suitable for those with nut allergies.",
      "Not a replacement for prescribed medication or dietary advice from healthcare professionals.",
    ],
    reviewsList: [
      {
        name: "Rajesh M.",
        rating: 5,
        date: "10 June 2023",
        comment: "Finally found a cookie that doesn't spike my blood sugar! Tastes great too.",
      },
      {
        name: "Priya K.",
        rating: 4,
        date: "25 May 2023",
        comment: "Good taste for a sugar-free product. A bit on the dry side but perfect with tea.",
      },
    ],
  },
  {
    id: "med15",
    name: "Organic Coconut Oil",
    description: "Multi-purpose natural oil for skin and hair",
    longDescription:
      "This cold-pressed, unrefined organic coconut oil is versatile for both cosmetic and dietary use. It's excellent for moisturizing skin, conditioning hair, oil pulling, and can be used as a natural cooking oil.",
    price: 350,
    discount: 8,
    rating: 4.8,
    reviews: 245,
    category: "Personal Care",
    brand: "NatureCure",
    sku: "OCO-015",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "12/2025",
    images: [
      "https://as1.ftcdn.net/v2/jpg/00/93/01/00/1000_F_93010064_rhvBWAmpC1oZV2I8tDrtB7pp89TAJ960.jpg",
      "https://as1.ftcdn.net/v2/jpg/09/67/79/56/1000_F_967795613_k2kLj2GMlNEIJjIaU6u0EAykOu2OyZJL.jpg",
    ],
    usage:
      "For skin: Apply directly to skin as moisturizer. For hair: Apply to hair ends as conditioner or use as a hair mask. For cooking: Use as needed in recipes.",
    storage:
      "Store at room temperature. May solidify in cool temperatures - this is normal and doesn't affect quality.",
    ingredients: "100% Organic Cold-Pressed Virgin Coconut Oil.",
    warnings: [
      "For external use, patch test before applying to large areas.",
      "If allergic to coconut, avoid use.",
      "Keep away from eyes.",
    ],
    reviewsList: [
      {
        name: "Anita J.",
        rating: 5,
        date: "20 July 2023",
        comment: "Amazing product! I use it for everything - cooking, skin moisturizer, and hair mask.",
      },
      {
        name: "Kiran P.",
        rating: 5,
        date: "5 June 2023",
        comment: "The quality is excellent. No artificial smell and works wonders for dry skin.",
      },
    ],
  },
  {
    id: "med16",
    name: "Homeopathic Stress Relief Drops",
    description: "Natural remedy for stress and anxiety",
    longDescription:
      "This homeopathic formulation helps alleviate symptoms of stress, anxiety, and nervous tension without causing drowsiness. The gentle formula can be used as needed during stressful situations.",
    price: 275,
    discount: 0,
    rating: 4.2,
    reviews: 89,
    category: "Homeopathy",
    brand: "HomeoHealth",
    sku: "HSR-016",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "09/2025",
    images: [
      "https://as1.ftcdn.net/v2/jpg/02/81/42/82/1000_F_281428209_xi28QvzHAb86SIKHEKkQKmgrU2weSQbG.jpg",
      "https://as2.ftcdn.net/v2/jpg/10/25/93/09/1000_F_1025930905_Gb9Afl9UfpO1VHObOQkDEnWgkBwQKqiN.jpg",
    ],
    usage:
      "Adults and children over 12: Take 10-15 drops in water 3 times daily or as needed during stressful situations.",
    storage: "Store in a cool, dark place. Keep bottle tightly closed.",
    ingredients:
      "Aconitum napellus 6X, Argentum nitricum 6X, Arsenicum album 6X, Gelsemium sempervirens 6X in a base of purified water and organic alcohol.",
    warnings: [
      "If pregnant or nursing, consult a healthcare professional before use.",
      "If symptoms persist for more than 2 weeks, consult a healthcare professional.",
      "Keep out of reach of children.",
    ],
    reviewsList: [
      {
        name: "Sanjay R.",
        rating: 5,
        date: "15 June 2023",
        comment: "Works wonderfully for my anxiety before important meetings. Gentle but effective.",
      },
      {
        name: "Leela M.",
        rating: 3,
        date: "28 May 2023",
        comment: "Subtle effect. Takes time to work but does help with mild stress.",
      },
    ],
  },
  {
    id: "med17",
    name: "Orthopaedic Back Support",
    description: "Posture corrector and back pain relief",
    longDescription:
      "This adjustable back brace provides lumbar support and helps correct posture to alleviate back pain. Ideal for those who sit for long hours, have mild scoliosis, or are recovering from back injuries.",
    price: 899,
    discount: 15,
    rating: 4.5,
    reviews: 132,
    category: "Orthopaedic",
    brand: "MediLife",
    sku: "OBS-017",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "N/A",
    images: [
      "https://as1.ftcdn.net/v2/jpg/06/61/39/18/1000_F_661391804_ggrWYTKEQ069RqCHlME1YTeelhuT3kXp.jpg",
      "https://as2.ftcdn.net/v2/jpg/10/27/83/77/1000_F_1027837793_cN7SDWxnPVVRJRDRkR0yYGcN2ySBok78.jpg",
    ],
    usage:
      "Wear over or under clothing for 1-2 hours initially, gradually increasing to 4-6 hours daily. Adjust straps for comfortable fit.",
    storage: "Clean with mild soap and water. Air dry completely before reuse. Store flat in a dry place.",
    ingredients:
      "Breathable neoprene, adjustable straps, reinforced lumbar support panels, moisture-wicking fabric lining.",
    warnings: [
      "Consult a doctor before use if you have existing medical conditions or recent injuries.",
      "Discontinue use if discomfort, numbness, or skin irritation occurs.",
      "Not a substitute for professional medical treatment.",
    ],
    reviewsList: [
      {
        name: "Ramesh S.",
        rating: 5,
        date: "10 July 2023",
        comment: "Great support for my lower back pain. I can now work longer hours without discomfort.",
      },
      {
        name: "Nisha T.",
        rating: 4,
        date: "22 June 2023",
        comment: "Good quality and adjustable. Takes some getting used to but definitely helps with posture.",
      },
    ],
  },
  {
    id: "med18",
    name: "Herbal Sleep Aid",
    description: "Natural solution for better sleep",
    longDescription:
      "This gentle herbal formula promotes relaxation and helps you fall asleep naturally without morning grogginess. Contains a blend of valerian root, chamomile, and passionflower to support healthy sleep cycles.",
    price: 320,
    discount: 10,
    rating: 4.4,
    reviews: 156,
    category: "Ayurvedic",
    brand: "NatureCure",
    sku: "HSA-018",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "07/2025",
    images: [
      "https://as1.ftcdn.net/v2/jpg/09/58/53/40/1000_F_958534042_yuUMj1w00kePinmRcfpte1eG39aFFm5H.jpg",
      "https://as1.ftcdn.net/v2/jpg/09/96/95/68/1000_F_996956847_KkkpirZzvY7qpDsoOJDHKaGGfarAQWMo.jpg",
    ],
    usage:
      "Take 1-2 capsules 30-60 minutes before bedtime with water. For best results, establish a regular sleep schedule.",
    storage: "Store in a cool, dry place away from direct sunlight.",
    ingredients:
      "Valerian Root Extract, Chamomile Flower Extract, Passionflower Extract, Lemon Balm, Magnesium, Vitamin B6.",
    warnings: [
      "Do not take with alcohol or sedative medications.",
      "Not recommended for pregnant or nursing women.",
      "May cause drowsiness. Do not drive or operate machinery after taking.",
    ],
    reviewsList: [
      {
        name: "Deepak M.",
        rating: 5,
        date: "5 July 2023",
        comment: "Finally something that helps me sleep without feeling groggy the next day!",
      },
      {
        name: "Asha K.",
        rating: 4,
        date: "18 June 2023",
        comment: "Takes about a week of regular use to really see the benefits, but works well after that.",
      },
    ],
  },
  {
    id: "med19",
    name: "Pregnancy Calcium Supplement",
    description: "Essential nutrition for expectant mothers",
    longDescription:
      "Specially formulated calcium supplement for pregnant and nursing women. Contains added vitamin D3 for optimal calcium absorption and folic acid to support fetal development.",
    price: 550,
    discount: 5,
    rating: 4.9,
    reviews: 178,
    category: "Vitamins",
    brand: "MediLife",
    sku: "PCS-019",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "10/2025",
    images: [
      "https://as1.ftcdn.net/v2/jpg/03/29/98/92/1000_F_329989201_JBf5xz0JolcTNh5r6OSiwmReWXfo9zNJ.jpg",
      "https://as1.ftcdn.net/v2/jpg/09/67/79/54/1000_F_967795486_6PrnZcmrw7ROoXP6unT9afIWrRqr2wAC.jpg",
    ],
    usage: "Take 1 tablet twice daily with meals or as directed by your healthcare provider.",
    storage: "Store in a cool, dry place away from direct sunlight. Keep bottle tightly closed.",
    ingredients: "Calcium Carbonate, Vitamin D3, Folic Acid, Vitamin B12, Zinc, Magnesium, Iron.",
    warnings: [
      "Use only under medical supervision during pregnancy.",
      "Do not exceed recommended dosage.",
      "This product is a supplement and not a replacement for a balanced diet.",
    ],
    reviewsList: [
      {
        name: "Priya J.",
        rating: 5,
        date: "25 July 2023",
        comment: "My doctor recommended this brand specifically. Easy to digest and no constipation issues.",
      },
      {
        name: "Sneha R.",
        rating: 5,
        date: "10 June 2023",
        comment: "Been taking throughout my pregnancy. My recent bone density test showed excellent results!",
      },
    ],
  },
  {
    id: "med20",
    name: "Kids Immunity Syrup",
    description: "Tasty immune support for children",
    longDescription:
      "This child-friendly syrup boosts immunity with a blend of herbs, vitamins, and minerals. The natural orange flavor makes it easy to administer to children who resist taking supplements.",
    price: 280,
    discount: 0,
    rating: 4.7,
    reviews: 203,
    category: "Children",
    brand: "SwapnilCare",
    sku: "KIS-020",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "06/2025",
    images: [
      "https://as1.ftcdn.net/v2/jpg/03/55/72/68/1000_F_355726831_9N14HKJ9znTY0o2O8ba75qjfbuHtCqEB.jpg",
      "https://t3.ftcdn.net/jpg/07/57/37/42/360_F_757374212_7h1MB5Mf4QJ5Eb7ltkwxB49bo6JOc1CX.webp",
    ],
    usage: "Children 2-5 years: 5ml daily. Children 6-12 years: 10ml daily. Take with or after meals.",
    storage: "Store in a cool, dry place. Refrigerate after opening and use within 30 days.",
    ingredients:
      "Elderberry Extract, Echinacea, Vitamin C, Vitamin D3, Zinc, Honey, Natural Orange Flavor, Purified Water.",
    warnings: [
      "Not suitable for children under 2 years due to honey content.",
      "Consult a pediatrician before use if your child has existing medical conditions.",
      "Keep out of reach of children.",
    ],
    reviewsList: [
      {
        name: "Anand K.",
        rating: 5,
        date: "15 July 2023",
        comment: "My 4-year-old actually asks for this! Has helped reduce his frequent colds significantly.",
      },
      {
        name: "Meera S.",
        rating: 4,
        date: "28 May 2023",
        comment: "Good product but quite sweet. I give a slightly smaller dose than recommended.",
      },
    ],
  },
  {
    id: "med21",
    name: "Arthritis Pain Relief Cream",
    description: "Fast-acting joint pain relief",
    longDescription:
      "This topical cream provides quick relief from arthritis pain, joint stiffness, and inflammation. The non-greasy formula absorbs quickly and creates a warming sensation that soothes aching joints.",
    price: 399,
    discount: 12,
    rating: 4.6,
    reviews: 167,
    category: "Pain Relief",
    brand: "MediLife",
    sku: "APC-021",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "09/2025",
    images: [
      "https://as1.ftcdn.net/v2/jpg/02/44/60/98/1000_F_244609855_yUA8MEZL0iOxqcNg7t4GbPfgOLxYp3Ie.jpg",
      "https://t3.ftcdn.net/jpg/00/92/34/56/360_F_92345619_pUlEznFdreTJy5amSBspNNtQT0sqhTwM.webp",
    ],
    usage:
      "Apply a small amount to affected areas and massage gently until absorbed. Use 3-4 times daily or as needed.",
    storage: "Store at room temperature. Keep tube tightly closed when not in use.",
    ingredients: "Menthol, Camphor, Eucalyptus Oil, Glucosamine, MSM, Arnica Extract, Aloe Vera, Shea Butter.",
    warnings: [
      "For external use only. Avoid contact with eyes, mucous membranes, or broken skin.",
      "Discontinue use if excessive irritation occurs.",
      "Do not use with heating pads or immediately before/after bathing.",
    ],
    reviewsList: [
      {
        name: "Mohan R.",
        rating: 5,
        date: "20 June 2023",
        comment: "Provides almost immediate relief for my knee pain. The warming effect lasts for hours.",
      },
      {
        name: "Lakshmi P.",
        rating: 4,
        date: "5 May 2023",
        comment: "Works well but has a strong menthol smell. Very effective for my arthritic hands.",
      },
    ],
  },
  {
    id: "med22",
    name: "Organic Moringa Powder",
    description: "Nutrient-rich superfood supplement",
    longDescription:
      "This 100% organic moringa leaf powder is packed with vitamins, minerals, and antioxidants. Known as a nutritional powerhouse, moringa supports immune function, energy levels, and overall health.",
    price: 499,
    discount: 8,
    rating: 4.5,
    reviews: 124,
    category: "Ayurvedic",
    brand: "NatureCure",
    sku: "OMP-022",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "11/2025",
    images: [
      "https://t3.ftcdn.net/jpg/02/08/12/48/360_F_208124828_uyDWVaxmehsQ3aIhG327vCs7k3ivNPs7.jpg",
      "https://t4.ftcdn.net/jpg/03/79/28/33/360_F_379283311_jZ5EPa0efXAcbzFwiOeYCvZA2wulZTo8.webp",
    ],
    usage: "Mix 1-2 teaspoons in water, juice, or smoothies daily. Can also be sprinkled on food or used in cooking.",
    storage: "Store in a cool, dry place. Keep container tightly closed to preserve freshness.",
    ingredients: "100% Certified Organic Moringa Leaf Powder (Moringa oleifera).",
    warnings: [
      "Consult a healthcare professional before use if pregnant, nursing, or taking medications.",
      "May have mild laxative effect when first used.",
      "Start with smaller doses and gradually increase to assess tolerance.",
    ],
    reviewsList: [
      {
        name: "Ravi S.",
        rating: 5,
        date: "10 July 2023",
        comment: "Amazing product! I add it to my morning smoothie and have noticed improved energy levels.",
      },
      {
        name: "Anjali T.",
        rating: 4,
        date: "25 May 2023",
        comment: "Good quality powder but has a strong taste. I mix with fruit juice to mask the flavor.",
      },
    ],
  },
  {
    id: "med23",
    name: "Digital Pulse Oximeter",
    description: "Measures blood oxygen levels and pulse rate",
    longDescription:
      "This portable fingertip pulse oximeter provides quick and accurate readings of blood oxygen saturation (SpO2) and pulse rate. Features a bright LED display, automatic power-off, and low battery indicator.",
    price: 1299,
    discount: 15,
    rating: 4.7,
    reviews: 189,
    category: "Devices",
    brand: "MediLife",
    sku: "DPO-023",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "N/A",
    images: [
      "https://sjc.microlink.io/54IVatYR5yyqRMsVRivaWwyR0Zf5tSOPdJ1eXdRGjRrWpBW_3VUKZlqnUC54Wd2AkwgL4Otl26eJpiVeeJxSQA.jpeg",
      "https://as1.ftcdn.net/v2/jpg/09/67/79/54/1000_F_967795486_6PrnZcmrw7ROoXP6unT9afIWrRqr2wAC.jpg",
    ],
    usage:
      "Place on fingertip (preferably index finger) with nail side up. Wait for reading to stabilize. Remove finger after use to power off automatically.",
    storage: "Store in protective case in a clean, dry place. Remove batteries if not used for extended periods.",
    ingredients: "Digital device with LED display, includes 2 AAA batteries and protective case.",
    warnings: [
      "Not a medical diagnostic device. Consult healthcare professional for interpretation of readings.",
      "Readings may be affected by nail polish, poor circulation, or cold fingers.",
      "Not suitable for continuous monitoring.",
    ],
    reviewsList: [
      {
        name: "Sunil M.",
        rating: 5,
        date: "5 July 2023",
        comment: "Very accurate when compared with hospital equipment. Easy to use and compact.",
      },
      {
        name: "Geeta R.",
        rating: 4,
        date: "18 June 2023",
        comment: "Good device for home monitoring. Battery life is excellent.",
      },
    ],
  },
  {
    id: "med24",
    name: "Organic Flaxseed Oil Capsules",
    description: "Plant-based omega-3 supplement",
    longDescription:
      "These organic flaxseed oil capsules provide plant-based omega-3 fatty acids that support heart health, brain function, and reduce inflammation. Each softgel is cold-pressed to preserve nutritional integrity.",
    price: 650,
    discount: 10,
    rating: 4.4,
    reviews: 142,
    category: "Vitamins",
    brand: "HealthPlus",
    sku: "OFO-024",
    inStock: true,
    prescriptionRequired: false,
    expiryDate: "08/2025",
    images: [
      "https://as1.ftcdn.net/v2/jpg/03/55/72/68/1000_F_355726831_9N14HKJ9znTY0o2O8ba75qjfbuHtCqEB.jpg",
      "https://as1.ftcdn.net/v2/jpg/02/44/60/98/1000_F_244609855_yUA8MEZL0iOxqcNg7t4GbPfgOLxYp3Ie.jpg",
    ],
    usage: "Take 1-2 softgels daily with meals or as directed by your healthcare professional.",
    storage: "Store in a cool, dry place away from direct sunlight. Refrigerate after opening for best quality.",
    ingredients: "Organic Cold-Pressed Flaxseed Oil, Vegetarian Softgel Capsule (Vegetable Glycerin, Carrageenan).",
    warnings: [
      "Consult a healthcare professional before use if pregnant, nursing, or taking blood-thinning medications.",
      "May cause mild digestive discomfort in some individuals initially.",
      "Keep out of reach of children.",
    ],
    reviewsList: [
      {
        name: "Vijay K.",
        rating: 5,
        date: "25 June 2023",
        comment: "Great alternative to fish oil. No fishy aftertaste and my cholesterol levels have improved.",
      },
      {
        name: "Sarita N.",
        rating: 4,
        date: "10 May 2023",
        comment: "Good quality product. I've noticed improvement in my dry skin condition after a month of use.",
      },
    ],
  },
]

// Add more medicines to the dummy data
for (let i = 25; i <= 40; i++) {
  const baseProduct = dummyMedicines[Math.floor(Math.random() * dummyMedicines.length)]

  dummyMedicines.push({
    ...baseProduct,
    id: `med${i}`,
    name: `${baseProduct.name} ${Math.floor(Math.random() * 1000)}`,
    sku: `${baseProduct.sku.split("-")[0]}-${i.toString().padStart(3, "0")}`,
    price: Math.floor(baseProduct.price * (0.8 + Math.random() * 0.4)),
    discount: Math.floor(Math.random() * 20),
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(50 + Math.random() * 200),
  })
}

// Firestore functions
export const getMedicines = async (): Promise<Medicine[]> => {
  // In a real app, this would fetch from Firestore
  // For now, return dummy data
  return dummyMedicines
}

export const getMedicineById = async (id: string): Promise<Medicine[]> => {
  // In a real app, this would fetch from Firestore
  // For now, find in dummy data
  const medicine = dummyMedicines.find((med) => med.id === id)
  if (!medicine) {
    throw new Error("Medicine not found")
  }
  return medicine
}

export const getSimilarMedicines = async (category: string): Promise<Medicine[]> => {
  // In a real app, this would query Firestore
  // For now, filter dummy data
  return dummyMedicines.filter((med) => med.category === category)
}

// Pagination function
export const getPaginatedMedicines = async (
  page = 1,
  limit = 12,
): Promise<{
  medicines: Medicine[]
  totalPages: number
  currentPage: number
}> => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const paginatedMedicines = dummyMedicines.slice(startIndex, endIndex)
  const totalPages = Math.ceil(dummyMedicines.length / limit)

  return {
    medicines: paginatedMedicines,
    totalPages,
    currentPage: page,
  }
}

