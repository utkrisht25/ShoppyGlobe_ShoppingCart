import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useProduct } from '../hooks/useProducts';
import { addToCart } from '../store/cartSlice';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

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

  if (!product) {
    return (
      <div className="container py-8">
        <div className="text-center text-gray-500">Product not found.</div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          
          <div className="space-y-2">
            <p className="text-gray-600">Brand: {product.brand}</p>
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-gray-600">Rating: {product.rating}/5</p>
            <p className="text-gray-600">Stock: {product.stock} units</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price}
            </span>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex items-center gap-2 cursor-pointer hover:transition-colors duration-200 rounded-lg px-4 py-2 bg-blue-600 text-white shadow-lg transform hover:scale-105 active:scale-100"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 