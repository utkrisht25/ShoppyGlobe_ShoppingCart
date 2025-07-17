import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cartSlice';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  // State for handling the add-to-cart notification popup
  const [showNotification, setShowNotification] = useState(false);

  // Handler for adding items to cart with notification feedback
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowNotification(true);
    // Auto-hide notification after 2 seconds for better UX
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    // Main product card container with hover effects and fixed height
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl 
                transform hover:scale-[1.02] transition-all duration-300 ease-out
                flex flex-col h-[32rem]">
      {/* Product image container with zoom effect on hover */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden h-56">
        <div className="relative h-full overflow-hidden">
          {/* Product image with smooth zoom transition */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          {/* Overlay effect on hover for better visual hierarchy */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
      </Link>
      {/* Product details section with flex layout for proper spacing */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          {/* Product title with line clamping and hover effect */}
          <Link to={`/product/${product.id}`}>
            <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 line-clamp-2 min-h-[3.5rem]">
              {product.title}
            </h2>
          </Link>
          {/* Description with 3-line limit for consistent card heights */}
          <p className="mt-3 text-gray-600 line-clamp-3 text-sm">{product.description}</p>
        </div>
        <div className="mt-6">
          {/* Floating notification when item is added to cart */}
          {showNotification && (
            <div className="absolute transform -translate-y-12 left-0 right-0 flex justify-center pointer-events-none">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-full text-sm
                          animate-[fadeInOut_2s_ease-in-out] shadow-lg z-10">
                Item added to cart!
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            {/* Price display with animation and monospace numbers */}
            <div className="transform group-hover:scale-110 transition-transform duration-300 min-w-[100px]">
              <span className="text-sm text-gray-500 uppercase block">Price</span>
              <span className="block text-2xl font-bold text-blue-600 tabular-nums">
                ${Math.ceil(product.price)}
              </span>
            </div>
            {/* Add to cart button with hover and click animations */}
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg
                       transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-[0px]
                       transition-all duration-200 whitespace-nowrap"
            >
              {/* Animated cart icon with subtle pulse effect */}
              <ShoppingCartIcon className="h-5 w-5 animate-pulse-soft" />
              {/* Button text hidden on mobile for better responsiveness */}
              <span className="hidden sm:inline cursor-pointer">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 