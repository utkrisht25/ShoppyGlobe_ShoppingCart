import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to remove "${item.title}" from your cart?`)) {
      dispatch(removeFromCart(item.id));
    }
  };

  return (
    <div className="card flex items-center gap-4">
      <Link to={`/product/${item.id}`} className="flex-shrink-0">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </Link>

      <div className="flex-grow">
        <Link to={`/product/${item.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
            {item.title}
          </h3>
        </Link>
        <p className="text-gray-600">${item.price}</p>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 px-2 py-1 border rounded text-center"
        />
        <button
          onClick={handleRemove}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full
                   transform hover:scale-110 transition-all duration-200 group relative"
          aria-label="Remove item"
          title="Remove from cart"
        >
          <TrashIcon className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
} 