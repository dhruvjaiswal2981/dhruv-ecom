import { Link } from 'react-router-dom';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart, cart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if product is already in cart
    const isInCart = cart.some(item => item.productId === product.id);
    
    if (isInCart) {
      toast.error('This item is already in your cart!');
      return;
    }

    addToCart(product.id, 1);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      position: 'bottom-right',
      style: {
        background: '#4f46e5',
        color: '#fff',
      }
    });
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-100"
    >
      {/* Product Image */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200"
          aria-label="Add to cart"
        >
          <ShoppingCartIcon className="h-5 w-5 text-indigo-600 group-hover:text-white" />
        </button>
        
        {/* Sale/Ribbon Badge (optional) */}
        {product.onSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            SALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          </div>
          
          {/* Rating (optional) */}
          <div className="flex items-center bg-indigo-50 px-2 py-1 rounded-full">
            <StarIcon className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-medium text-gray-700 ml-1">4.8</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
          
          {/* Stock Status */}
          <div className={`text-xs px-2 py-1 rounded-full ${
            product.stock > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;