const OrderDetails = ({ order }) => {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Order Items
          </h3>
        </div>
        
        <ul className="divide-y divide-gray-200">
          {order.OrderItems.map((item) => (
            <li key={item.id} className="px-4 py-5 sm:px-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                  <img
                    src={item.Product.imageUrl || 'https://via.placeholder.com/150'}
                    alt={item.Product.name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                
                <div className="ml-4 flex-1">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {item.Product.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.Product.category}
                    </p>
                    {item.customization && (
                      <div className="mt-2 text-xs text-gray-700">
                        <p>Custom: {item.customization.text}</p>
                        <p>Color: <span style={{ color: item.customization.color }}>■</span></p>
                        <p>Font: {item.customization.font}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2 flex justify-between">
                    <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-900">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default OrderDetails;