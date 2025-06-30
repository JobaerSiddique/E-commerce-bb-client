'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useGetSingleProductQuery } from '@/redux/api/ProductApi';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useAddToCartMutation } from '@/redux/api/cartApi';
import { toast } from 'sonner';


export default function ProductPage({ params }) {
  // All hooks must be called unconditionally at the top level
  const { data: product, isLoading } = useGetSingleProductQuery(params.id);
 
  const [AddToCart] = useAddToCartMutation();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  const handleAddToCart = async () => {
    try {
      const cartData = {
        productId: product.id,
        quantity
      };
      console.log(cartData);
      const res = await AddToCart(cartData).unwrap()
      if(res?._id){
         toast.success('Added to cart successfully');
      }
     
     
    } catch (error) {
      toast.error('Failed to add to cart');
      console.error(error);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const calculateDiscount = () => {
    return ((product.price - product.discount_price) / product.price * 100).toFixed(0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><Link href="/">Home</Link></li> 
          <li><Link href="/products">Products</Link></li>
          <li>{product.title}</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.title}
              fill
              className="object-contain"
              priority
            />
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <button 
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`aspect-square bg-gray-100 rounded-md overflow-hidden border-2 ${currentImageIndex === index ? 'border-primary' : 'border-transparent'}`}
              >
                <Image
                  src={img}
                  alt={`${product.title} thumbnail ${index}`}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  size={18}
                  className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            {product.discount_price ? (
              <div className="space-y-1">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold">${product.discount_price}</span>
                  <span className="text-lg line-through text-gray-500">${product.price}</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm">
                    {calculateDiscount()}% OFF
                  </span>
                </div>
                <p className="text-green-600">You save ${(product.price - product.discount_price).toFixed(2)}</p>
              </div>
            ) : (
              <span className="text-3xl font-bold">${product.price}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-4 mb-6">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1 text-lg"
                >
                  -
                </button>
                <Input 
                  type="number" 
                  min="1" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-0"
                />
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-1 text-lg"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {product.stock} available
              </span>
            </div>

            <Button 
              onClick={handleAddToCart}
              className="w-full py-6 text-lg gap-2"
              disabled={product.stock === 0}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </Button>

            {product.stock === 0 && (
              <p className="text-red-500 mt-2 text-center">Out of stock</p>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Suggested Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* You would map through suggested products here */}
          {/* Example placeholder */}
          <div className="border rounded-lg p-4">
            <div className="aspect-square bg-gray-100 mb-4"></div>
            <h3 className="font-medium">Suggested Product</h3>
            <p className="text-primary font-bold">$999.99</p>
          </div>
        </div>
      </div>
    </div>
  );
}