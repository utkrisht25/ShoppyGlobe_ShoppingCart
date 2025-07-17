import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { selectCartItems } from '../store/cartSlice';

export default function Header() {
  const cartItems = useSelector(selectCartItems);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gradient-to-r from-pink-100 via-yellow-100 to-green-100 animate-pulse shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ShoppyGlobe
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 hover:underline text-xl">
              Home
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-10 w-9 ml-1 text-gray-600 hover:text-blue-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 