import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  // Get cart state from Redux store
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  // Modal states for checkout flow
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  
  // Handle ESC key press to close modals for better UX
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsCheckoutOpen(false);
        setIsConfirmationOpen(false);
      }
    };
    
    // Add and cleanup event listener
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleCheckoutClick = () => {
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart to see them here.</p>
          <Link to="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold
                     hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200
                     hover:shadow-lg active:scale-[0.98] group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 ">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="card overflow-hidden">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6 overflow-hidden">
              <button 
                onClick={handleCheckoutClick}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                         hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200
                         active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         origin-center cursor-pointer">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Dialog */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.55)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md transform transition-all">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>
            <form onSubmit={handleCheckoutSubmit}>
              <div className="space-y-4">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                   <span>Total</span>
                   <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                  <textarea
                    id="address"
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold
                           hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200"
                >
                  Complete Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {isConfirmationOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.55)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md transform transition-all animate-fade-in-up">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your order. We've sent a confirmation email with your order details.
                You'll receive updates about your shipment soon.
              </p>
              <button
                onClick={handleConfirmationClose}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold
                         hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-300
                         hover:shadow-lg active:scale-[0.98] group flex items-center justify-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" 
                     className="h-5 w-5 transform group-hover:rotate-[-360deg] transition-transform duration-500" 
                     fill="none" 
                     viewBox="0 0 24 24" 
                     stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                <span className="group-hover:tracking-wide transition-all duration-200">Continue Shopping</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 