import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

const CartItem = ({ item, onRemove, onUpdate }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    const qty = Math.max(1, Math.min(10, newQuantity));
    setQuantity(qty);
    if (onUpdate) onUpdate({ quantity: qty });
  };

  // Handle case when product data isn't loaded
  if (!item?.Product) {
    return (
      <li className="p-4 border border-gray-200 rounded-lg bg-gray-50 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-300 rounded-md"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={item.Product?.imageUrl || '/placeholder-product.jpg'}
            alt={item.Product?.name || 'Product image'}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.src = '/placeholder-product.jpg';
            }}
          />
        </div>
        
        {/* Product Details */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800">
              {item.Product?.name || 'Product Name'}
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              {item.Product?.category || 'Category'}
            </p>
            <p className="text-sm font-medium text-gray-900 mt-1">
              ${item.Product?.price?.toFixed(2) || '0.00'}
            </p>
            
            {/* Customization Details */}
            {item.customization && (
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                {item.customization.text && (
                  <p className="flex items-center">
                    <span className="font-medium mr-1">Text:</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {item.customization.text}
                    </span>
                  </p>
                )}
                {item.customization.color && (
                  <p className="flex items-center">
                    <span className="font-medium mr-1">Color:</span>
                    <span 
                      className="inline-block w-4 h-4 rounded-full border border-gray-300 mr-1"
                      style={{ backgroundColor: item.customization.color }}
                    ></span>
                    <span>{item.customization.color}</span>
                  </p>
                )}
                {item.customization.font && (
                  <p className="flex items-center">
                    <span className="font-medium mr-1">Font:</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {item.customization.font}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Price and Actions */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              {/* Quantity Selector */}
              <div className="relative">
                <select
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Total Price */}
              <p className="text-lg font-bold text-indigo-600">
                ${((item.Product?.price || 0) * quantity).toFixed(2)}
              </p>
            </div>
            
            {/* Remove Button */}
            <button
              onClick={() => {
                setIsRemoving(true);
                if (onRemove) onRemove();
              }}
              disabled={isRemoving}
              className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200 disabled:opacity-50"
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              {isRemoving ? 'Removing...' : 'Remove'}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;