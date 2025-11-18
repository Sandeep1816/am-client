// "use client";

// import { useQuery } from "@apollo/client";
// import { GET_PRODUCTS } from "@/lib/queries";
// import Image from "next/image";
// import Link from "next/link";
// import ProductCard from "@/components/ProductCard";

// export default function Home() {
//   // Fetch only latest 6 products
//   const { data, loading, error } = useQuery(GET_PRODUCTS, {
//     variables: { limit: 6 },
//   });

//   return (
//     <main className="min-h-screen bg-gray-50 py-10">
      
//       {/* Hero Section */}
//       {/* <section className="container mx-auto px-4 mb-12">
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-10 shadow-lg">
//           <h1 className="text-4xl font-bold mb-4">
//             Welcome to our Product Store
//           </h1>
//           <p className="text-lg text-white/90 mb-6 max-w-xl">
//             Browse high quality products across categories.  
//             Updated daily directly from our backend.
//           </p>

//           <Link
//             href="/products"
//             className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
//           >
//             Browse All Products →
//           </Link>
//         </div>
//       </section> */}

//       {/* Latest Products */}
//       <section className="container mx-auto px-4">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold">Latest Products</h2>
//           <Link
//             href="/products"
//             className="text-blue-600 hover:underline font-medium"
//           >
//             View All
//           </Link>
//         </div>

//         {loading && <p>Loading latest products...</p>}
//         {error && <p>Error: {error.message}</p>}

//         {data?.products && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {data.products.map((product: any) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </section>

//     </main>
//   );
// }


import Header from '@/components/header'
import Categories from '@/components/home/categories'
import FeaturedBanner from '@/components/home/featured-banner'
import CelebrationSection from '@/components/home/celebration-section'
import FeaturedProducts from '@/components/home/featured-products'
import StatsSection from '@/components/home/stats-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Categories />
      <FeaturedBanner />
      <CelebrationSection />
      <FeaturedProducts />
      <StatsSection />
      <Footer />
    </main>
  )
}
