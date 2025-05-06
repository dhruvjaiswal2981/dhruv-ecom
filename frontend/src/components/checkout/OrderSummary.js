const OrderSummary = ({ cart, cartTotal }) => {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <h2 className="text-lg font-medium text-gray-900 px-6 py-4 border-b border-gray-200">
          Order Summary
        </h2>
        
        <div className="px-6 py-4">
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="py-4 flex">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                  <img
                    src={item.Product.imageUrl || 'https://via.placeholder.com/150'}
                    alt={item.Product.name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                
                <div className="ml-4 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {item.Product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.Product.category}
                    </p>
                  </div>
                  
                  <div className="flex-1 flex items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {item.quantity}</p>
                    <p className="font-medium text-gray-900">
                      ${(item.Product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${cartTotal.toFixed(2)}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default OrderSummary;