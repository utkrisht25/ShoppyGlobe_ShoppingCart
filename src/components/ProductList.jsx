import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProducts } from '../hooks/useProducts';
import ProductItem from './ProductItem';
import { setFilteredProducts } from '../store/searchSlice';
import { selectSearchTerm, selectFilteredProducts } from '../store/searchSlice';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { setSearchTerm } from '../store/searchSlice';

export default function ProductList() {
  const { products, loading, error } = useProducts();
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      dispatch(setFilteredProducts(filtered));
    }
  }, [products, searchTerm, dispatch]);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 mx-auto max-w-7xl">
      <div className="relative mb-8 transform hover:scale-105 transition-transform duration-300">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl 
                     bg-white/80 backdrop-blur-sm shadow-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-300 ease-in-out"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
          <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 
                                        group-hover:text-blue-500 transition-colors duration-300" />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 animate-fade-in-up">
          <div className="text-xl text-gray-600 font-medium mb-4">
            No products found matching your search.
          </div>
          <p className="text-gray-500">Try adjusting your search terms or browse our catalog below.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 