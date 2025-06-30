// app/page.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  // Sample data
  const heroSlides = [
    {
      title: "Summer Collection 2024",
      description: "Discover our new arrivals with 30% off",
      image: "/hero1.jpg",
      cta: "Shop Now",
    },
    {
      title: "Winter Essentials",
      description: "Stay warm with our premium collection",
      image: "/hero2.jpg",
      cta: "Explore",
    },
  ];

  const categories = [
    { name: "Electronics", count: 56, image: "/electronics.jpg" },
    { name: "Fashion", count: 120, image: "/fashion.jpg" },
    { name: "Home & Garden", count: 89, image: "/home.jpg" },
    { name: "Sports", count: 42, image: "/sports.jpg" },
  ];

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      rating: 4.5,
      image: "/product1.jpg",
      isNew: true,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      rating: 4.2,
      image: "/product2.jpg",
      isNew: false,
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 79.99,
      rating: 4.7,
      image: "/product3.jpg",
      isNew: true,
    },
    {
      id: 4,
      name: "Laptop Backpack",
      price: 49.99,
      rating: 4.3,
      image: "/product4.jpg",
      isNew: false,
    },
  ];

  const blogs = [
    {
      title: "How to Choose the Right Headphones",
      date: "May 15, 2024",
      excerpt: "Learn how to select the perfect headphones for your needs...",
      image: "/blog1.jpg",
    },
    {
      title: "The Future of Wearable Technology",
      date: "June 2, 2024",
      excerpt: "Exploring upcoming trends in wearable devices...",
      image: "/blog2.jpg",
    },
  ];

  const offers = [
    {
      title: "Weekend Special",
      description: "Get 25% off on all electronics",
      code: "WEEKEND25",
    },
    {
      title: "New Customer Offer",
      description: "10% off your first order",
      code: "WELCOME10",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col mx-auto container">
   
      
      <main className="flex-1">
        {/* Hero Carousel Section (60-70% height) */}
        <section className="relative h-[70vh] max-h-[700px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
          <div className="h-full w-full bg-gray-200 flex items-center">
            <img
              src={heroSlides[0].image}
              alt={heroSlides[0].title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex items-center z-20 container">
            <div className="max-w-2xl text-white space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                {heroSlides[0].title}
              </h1>
              <p className="text-lg">{heroSlides[0].description}</p>
              <Button size="lg" className="gap-2 group">
                {heroSlides[0].cta}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${i === 0 ? "bg-white" : "bg-white/50"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 container">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group relative rounded-lg overflow-hidden h-48"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-sm">{category.count} items</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Button variant="link" className="text-primary">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0 relative">
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 z-10">New</Badge>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">
                        ({product.rating})
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <Button size="sm" className="gap-1">
                      <ShoppingCart className="h-4 w-4" />
                      Add
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offer Section */}
        <section className="py-16 container">
          <h2 className="text-3xl font-bold text-center mb-12">Special Offers</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {offers.map((offer, i) => (
              <div
                key={i}
                className={`p-8 rounded-xl ${i % 2 === 0 ? "bg-primary text-white" : "bg-secondary text-white"}`}
              >
                <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                <p className="mb-4">{offer.description}</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-white/20 px-3 py-1 rounded">
                    {offer.code}
                  </span>
                  <Button variant={i % 2 === 0 ? "secondary" : "default"}>
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Latest Blogs</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {blogs.map((blog, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full md:w-48 h-48 object-cover rounded-lg"
                  />
                  <div>
                    <span className="text-sm text-gray-500">{blog.date}</span>
                    <h3 className="text-xl font-bold mt-1">{blog.title}</h3>
                    <p className="text-gray-600 mt-2">{blog.excerpt}</p>
                    <Button variant="link" className="px-0 mt-4">
                      Read More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 container">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <h4 className="font-semibold">Customer {i}</h4>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-8">
              Get the latest updates, offers and news delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </section>

        {/* More sections can be added here */}
      </main>

      
    </div>
  );
}