import { Link } from 'react-router-dom';

const AdminProductCard = ({ product, onDelete }) => {
    return (
      <li className="hover:bg-gray-50 transition-colors duration-150">
        <div className="grid grid-cols-12 items-center px-6 py-4">
          {/* Product Info */}
          <div className="col-span-5 md:col-span-6 flex items-center">
            <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden bg-gray-100">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          </div>
  
          {/* Price */}
          <div className="col-span-3 md:col-span-2 text-center">
            <span className="text-sm font-medium text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
  
          {/* Stock (hidden on mobile) */}
          <div className="col-span-2 text-center hidden md:block">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              product.stock > 5 ? 'bg-green-100 text-green-800' : 
              product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {product.stock} in stock
            </span>
          </div>
  
          {/* Actions */}
          <div className="col-span-4 md:col-span-2 flex justify-end space-x-2">
            <Link
              to={`/admin/products/edit/${product.id}`}
              className="p-2 text-indigo-600 hover:text-indigo-900 rounded-md hover:bg-indigo-50 transition-colors"
              title="Edit"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>
            <button
              onClick={() => onDelete(product.id)}
              className="p-2 text-red-600 hover:text-red-900 rounded-md hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </li>
    );
  };
export default AdminProductCard;