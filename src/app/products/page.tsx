'use client';

import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Star, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetProductQuery } from '@/redux/api/ProductApi';
import { IProduct } from '@/types/Product';
import Link from 'next/link';


const ITEMS_PER_PAGE = 6;

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch products from API
  const { data: apiResponse, isLoading } = useGetProductQuery({
    searchTerm,
    page: currentPage,
    limit: ITEMS_PER_PAGE
  });

  // Extract products and metadata from API response
  const products = apiResponse || [];
  const meta = apiResponse?.meta || {
    page: 1,
    limit: ITEMS_PER_PAGE,
    total: 0,
    totalPage: 1
  };

  // Get unique categories from products
  const categories = [...new Set(products.flatMap(product => product.category))];

  // Filter products client-side for additional filters
  const filteredProducts = products.filter((product: IProduct) => {
    const matchesPrice = product.discount_price 
      ? product.discount_price >= priceRange[0] && product.discount_price <= priceRange[1]
      : product.price >= priceRange[0] && product.price <= priceRange[1];
      
    const matchesCategory = selectedCategories.length === 0 || 
      product.category.some(cat => selectedCategories.includes(cat));
    
    const matchesRating = product.rating >= minRating;
    
    return matchesPrice && matchesCategory && matchesRating;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priceRange, selectedCategories, minRating]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
console.log({products});
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-4">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-4">Price Range</h3>
            <Slider
              min={0}
              max={2000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 text-gray-700">
                    {typeof category === 'string' ? category : 'Uncategorized'}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-4">Rating</h3>
            <Select onValueChange={(value) => setMinRating(Number(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Minimum rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any rating</SelectItem>
                <SelectItem value="4">4+ stars</SelectItem>
                <SelectItem value="3">3+ stars</SelectItem>
                <SelectItem value="2">2+ stars</SelectItem>
                <SelectItem value="1">1+ stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Products</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                Showing {(meta.page - 1) * meta.limit + 1}-{Math.min(meta.page * meta.limit, meta.total)} of {meta.total} products
              </span>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product: IProduct) => (
                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    {product.images?.length > 0 ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300';
                        }}
                      />
                    ) : (
                      <div className="text-gray-400">No image available</div>
                    )}
                  </div>
                  <div className="p-4">
                    <Link href={`/products/${product.id}`} passHref>
        <h3 className="font-semibold text-lg mb-1 hover:text-indigo-600 cursor-pointer">
          {product.title}
        </h3>
      </Link>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">({product.rating?.toFixed(1) || 0})</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.discount_price || product.price}
                      </span>
                      {product.discount_price && product.discount_price < product.price && (
                        <span className="ml-2 text-sm text-gray-500 line-through">${product.price}</span>
                      )}
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Pagination */}
          {meta.totalPage > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border-t border-b border-gray-300 ${currentPage === page ? 'bg-indigo-50 text-indigo-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, meta.totalPage))}
                  disabled={currentPage === meta.totalPage}
                  className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}