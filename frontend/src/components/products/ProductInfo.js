import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const ProductInfo = ({ product, quantity, onQuantityChange, onAddToCart }) => {
  return (
    <div className="space-y-6">
      {/* Product Title */}
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        {product.name}
      </h1>
      
      {/* Price and Stock */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-semibold text-indigo-600">
            ${product.price.toFixed(2)}
          </p>
          {product.stock > 0 ? (
            <p className="mt-1 text-sm font-medium text-green-600 flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              In stock ({product.stock} available)
            </p>
          ) : (
            <p className="mt-1 text-sm font-medium text-red-600 flex items-center">
              <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
              Out of stock
            </p>
          )}
        </div>
        
        {/* Rating would go here */}
      </div>
      
      {/* Description */}
      <div className="prose prose-indigo max-w-none text-gray-600">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
      
      {/* Quantity Selector */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center space-x-4">
          <label htmlFor="quantity" className="text-base font-medium text-gray-700">
            Quantity
          </label>
          <select
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value))}
            className="rounded-lg border-gray-300 py-2 pl-3 pr-8 text-base focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            {[...Array(Math.min(10, product.stock)).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Add to Cart Button */}
      <button
        type="button"
        onClick={onAddToCart}
        disabled={product.stock <= 0}
        className={`mt-6 w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl text-lg font-semibold text-white shadow-sm transition-all duration-200 ${
          product.stock > 0 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-md'
            : 'bg-gray-400 cursor-not-allowed'
        } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        {product.stock > 0 ? (
          <>
            Add to cart
            <ShoppingCartIcon className="ml-3 h-6 w-6" />
          </>
        ) : (
          'Out of stock'
        )}
      </button>
      
      {/* Additional Info */}
      <div className="mt-6 text-sm text-gray-500">
        <p>Free shipping on orders over $50</p>
        <p className="mt-1">30-day return policy</p>
      </div>
    </div>
  );
};

export default ProductInfo;