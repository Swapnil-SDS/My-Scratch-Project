# SwapnilCare - Online Pharmacy Platform

SwapnilCare is a modern, interactive online pharmacy platform built with Next.js, Tailwind CSS, and Firebase. The application provides a seamless shopping experience for healthcare products with features like product search, filtering, cart management, and checkout.

## Deployed Application
- **Frontend**: [SwapnilCare UI](https://v0-swapnilcare-ui-design.vercel.app)

## Features Implemented

### Core Functionality

- **Product Catalog**: Browse and search through a wide range of healthcare products
- **Product Details**: View detailed information about each product with image galleries
- **Shopping Cart**: Add products to cart, update quantities, and apply coupon codes
- **Wishlist**: Save products to wishlist for future reference
- **Checkout Process**: Multi-step checkout with shipping, payment, and order confirmation
- **User Authentication**: Login and registration with Firebase authentication
- **Responsive Design**: Mobile-first approach with adaptive layouts for all devices
- **Pagination**: Browse through multiple pages of products

### UI/UX Enhancements

- **Modern Design**: Implemented with the specified color scheme (#182628, #650CB5, #57BA98, #389456, #FEFFFF)
- **Interactive Elements**: Animations using Framer Motion for a dynamic user experience
- **Gradients & Shadows**: Applied throughout the UI for a modern look and feel
- **Dark Mode**: Toggle between light and dark themes
- **Custom Logo**: Created a unique logo for SwapnilCare

### Pages Created

1. **Home**: Featured products, categories, and promotional banners
2. **Products**: Product listing with filters, search functionality, and pagination
3. **Product Detail**: Comprehensive product information with image gallery
4. **Cart**: Shopping cart with quantity management and coupon application
5. **Wishlist**: Saved products for future reference
6. **Checkout**: Multi-step checkout process with order summary
7. **Order Success**: Confirmation page after successful order placement
8. **Login/Register**: User authentication forms
9. **Categories**: Browse products by category
10. **Offers**: Special discounts and promotional offers
11. **About**: Company information and team details
12. **Contact**: Contact form and company information

### Special Features

- **Coupon System**: Apply discount codes (swapnil20, health15, care10, first5)
- **Notifications**: View available coupons and updates in the notification panel
- **Cart Notifications**: Toast notifications when adding/removing items from cart
- **Theme Toggle**: Switch between light and dark modes
- **Real Images**: Integrated real product images from external sources

## Technical Implementation

### Firebase Integration

- Authentication for user login/registration
- Comprehensive product data with images, descriptions, and categories

### Error Fixes

- Fixed React context provider issues
- Resolved "Cannot read properties of undefined (reading 'signal')" error
- Fixed "Unexpected Fiber popped" error
- Ensured proper rendering of components

### Code Structure

- Organized components for reusability
- Context providers for auth, cart, wishlist, and theme management
- Responsive design with Tailwind CSS
- Interactive animations with Framer Motion

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

The application uses Firebase for authentication and data storage. Firebase configuration is included in the code for demonstration purposes.

## Future Enhancements

- Integration with real payment gateways
- Order tracking functionality
- User profile management
- Prescription upload and verification
- Product reviews and ratings

